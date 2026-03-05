// Database setup script for XAMPP MySQL
// Run this with: node setup_database.js

const mysql = require('mysql2');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Database configuration
const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    port: process.env.DB_PORT || 3306
};

console.log('Setting up MySQL database for portfolio...');

// Create connection without database
const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.message);
        console.log('Make sure XAMPP MySQL is running');
        process.exit(1);
    }

    console.log('Connected to MySQL server');

    // Create database
    connection.query('CREATE DATABASE IF NOT EXISTS portfolio_db', (err) => {
        if (err) {
            console.error('Error creating database:', err.message);
            connection.end();
            return;
        }

        console.log('Database "portfolio_db" created or already exists');

        // Switch to the database
        connection.changeUser({ database: 'portfolio_db' }, (err) => {
            if (err) {
                console.error('Error switching to database:', err.message);
                connection.end();
                return;
            }

            // Create table
            const createTableQuery = `
                CREATE TABLE IF NOT EXISTS portfolio (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    data JSON NOT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
                )
            `;

            connection.query(createTableQuery, (err) => {
                if (err) {
                    console.error('Error creating table:', err.message);
                    connection.end();
                    return;
                }

                console.log('Table "portfolio" created or already exists');

                // Check if data exists
                connection.query('SELECT COUNT(*) as count FROM portfolio', (err, results) => {
                    if (err) {
                        console.error('Error checking data:', err.message);
                        connection.end();
                        return;
                    }

                    if (results[0].count === 0) {
                        // Insert initial data
                        const initialData = {
                            personalInfo: {
                                name: "G. Soundiralakshmi",
                                title: "Student",
                                summary: "As a passionate learner in the field of IT, I'm always curious to explore new technologies and improve my skills. I enjoy working on creative interfaces and real-time applications. I look forward to opportunities where I can apply my knowledge, grow professionally, and make a valuable impact in a team or organization.",
                                details: "Currently pursuing my B-Tech in Information Technology at Dr. MGR Educational and Research Institute, I have developed a strong foundation in programming, web development, and data science.",
                                profileImage: "https://z-cdn-media.chatglm.cn/files/f3188da8-9be4-42c0-81c6-d8bbc0a8148e_G.Soundiralakshmi.jpg?auth_key=1789497993-a3cbf374b08c4589bdd8dce9616e44c1-0-100c392e8206f91b4b8c14fde1edaf7a",
                                email: "soundiralakshmi21it@gmail.com",
                                phone: "+91-7904322845",
                                location: "Thiruvallur",
                                linkedin: "https://www.linkedin.com/in/soundiralakshmi/",
                                resumeLink: "https://drive.google.com/file/d/1h1i9kwSzYzE8ElADbWXrif_z0EY0qDWE/view?usp=drive_link"
                            },
                            education: [
                                {
                                    degree: "B-Tech (Information Technology)",
                                    institution: "Dr. MGR EDUCATIONAL AND RESEARCH INSTITUTE",
                                    location: "Maduravoyal, Chennai",
                                    period: "2022 - 2026",
                                    result: "CGPA - 7.52%"
                                },
                                {
                                    degree: "Intermediate",
                                    institution: "Christ King Matriculation Higher Secondary School",
                                    location: "Thiruvallur",
                                    period: "2021 - 2022",
                                    result: "Percentage: 64.67%"
                                },
                                {
                                    degree: "Secondary School (10th Grade)",
                                    institution: "Christ King Matriculation Higher Secondary School",
                                    location: "Thiruvallur",
                                    period: "2019 - 2020",
                                    result: "Percentage: 70.4%"
                                }
                            ],
                            skills: {
                                technical: [
                                    "Python",
                                    "UI using Figma",
                                    "Java",
                                    "C, C++",
                                    "HTML, CSS",
                                    "Flutter using Dart Language",
                                    "Data Science using R"
                                ],
                                soft: [
                                    "Public Relations",
                                    "Teamwork",
                                    "Time Management",
                                    "Leadership",
                                    "Effective Communication",
                                    "Creative Thinking"
                                ]
                            },
                            languages: [
                                "Tamil",
                                "English"
                            ],
                            projects: [
                                {
                                    title: "Expenses Tracker using Flutter",
                                    description: "Mini project",
                                    technologies: [
                                        "Flutter",
                                        "Dart"
                                    ],
                                    images: [],
                                    demoLink: ""
                                },
                                {
                                    title: "Harbour Management System Using Python",
                                    description: "Mini project",
                                    technologies: [
                                        "Python"
                                    ],
                                    images: [],
                                    demoLink: ""
                                }
                            ],
                            certifications: [
                                {
                                    name: "Google Cloud Computing Foundations",
                                    issuer: "NPTEL"
                                },
                                {
                                    name: "Introduction to Modern AI",
                                    issuer: "Cisco"
                                },
                                {
                                    name: "AWS - Data Science",
                                    issuer: "Conducted for 60 hours"
                                },
                                {
                                    name: "Android App Development",
                                    issuer: "Corizo"
                                },
                                {
                                    name: "Typewriting English",
                                    issuer: "Junior & Senior"
                                },
                                {
                                    name: "AWS- Technical Skill",
                                    issuer: "Data Science using R - Enlight Wisdom"
                                }
                            ],
                            workshops: [
                                {
                                    name: "A Day with MERN, Figma, Augmented Reality & Virtual Reality",
                                    issuer: "SIMATS Engineering"
                                },
                                {
                                    name: "A 5-day PDP on 360° Development through Motivation, Research & Innovation",
                                    issuer: "SRM University"
                                }
                            ],
                            extracurricular: [
                                "SDG Goal Club Member",
                                "Grow Green Club Member"
                            ],
                            hobbies: [
                                "Listening music"
                            ]
                        };

                        connection.query('INSERT INTO portfolio (data) VALUES (?)', [JSON.stringify(initialData)], (err) => {
                            if (err) {
                                console.error('Error inserting initial data:', err.message);
                            } else {
                                console.log('Initial portfolio data inserted successfully');
                            }

                            connection.end();
                            console.log('\nDatabase setup complete!');
                            console.log('You can now run: npm start');
                        });
                    } else {
                        console.log('Portfolio data already exists');
                        connection.end();
                        console.log('\nDatabase setup complete!');
                        console.log('You can now run: npm start');
                    }
                });
            });
        });
    });
});