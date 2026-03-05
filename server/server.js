const express = require('express');
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 3000;

// Determine whether to use MySQL or fall back to JSON file
const useFileDb = !process.env.DB_HOST;
let db;
if (!useFileDb) {
    // MySQL database connection pool
    db = mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT || 3306,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    });
}

// Test database connection (or initialize file data)
if (useFileDb) {
    console.log('No DB host provided; using local JSON file for data');
    // ensure data file exists
    initializeFileData();
} else {
    db.getConnection((err, connection) => {
        if (err) {
            console.error('Database connection failed:', err.message);
            console.log('Make sure your cloud MySQL is accessible');
            return;
        }
        console.log('Connected to MySQL database');
        connection.release();

        // Initialize data if not exists
        initializeDatabase();
    });
}

// Initialize database with default data (MySQL only)
function initializeDatabase() {
    if (useFileDb) {
        // file-based initialization handled elsewhere
        return;
    }
    const checkQuery = 'SELECT COUNT(*) as count FROM portfolio';

    db.query(checkQuery, (err, results) => {
        if (err) {
            console.error('Error checking database:', err.message);
            return;
        }

        if (results[0].count === 0) {
            insertInitialData();
        }
    });
}

// Insert initial portfolio data
function insertInitialData() {
    const initialData = {
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

    const insertQuery = 'INSERT INTO portfolio (data) VALUES (?)';
    if (useFileDb) {
        // write to file instead
        saveFileData(initialData);
        console.log('Initial data saved to local JSON file');
        return;
    }
    db.query(insertQuery, [JSON.stringify(initialData)], (err, result) => {
        if (err) {
            console.error('Error inserting initial data:', err.message);
        } else {
            console.log('Initial data inserted into database');
        }
    });
}



// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Helper for file-based storage
const dataFilePath = path.join(__dirname, 'data.json');
function loadFileData() {
    try {
        const raw = fs.readFileSync(dataFilePath, 'utf-8');
        return JSON.parse(raw);
    } catch (e) {
        return null;
    }
}
function saveFileData(obj) {
    try {
        fs.writeFileSync(dataFilePath, JSON.stringify(obj, null, 2), 'utf-8');
    } catch (e) {
        console.error('Error writing data file:', e.message);
    }
}
function initializeFileData() {
    if (!fs.existsSync(dataFilePath)) {
        console.log('Data file not found; creating with default data');
        // copy initialData from earlier in file or call insertInitialData
        insertInitialData();
    }
}

// Serve static files from public folder (frontend)
app.use(express.static(path.join(__dirname, '../public'), {
    maxAge: '1h',
    etag: false
}));

// Serve admin panel static files
app.use('/admin', express.static(path.join(__dirname, '../admin'), {
    maxAge: '1h',
    etag: false
}));

// API Routes

// Get portfolio data
app.get('/api/portfolio', (req, res) => {
    if (useFileDb) {
        const data = loadFileData();
        if (!data) {
            return res.status(404).json({ error: 'Portfolio data not found' });
        }
        return res.json(data);
    }

    const query = 'SELECT data FROM portfolio LIMIT 1';

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching portfolio data:', err.message);
            return res.status(500).json({ error: 'Failed to fetch portfolio data' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'Portfolio data not found' });
        }

        try {
            const portfolioData = JSON.parse(results[0].data);
            res.json(portfolioData);
        } catch (parseError) {
            console.error('Error parsing portfolio data:', parseError);
            res.status(500).json({ error: 'Failed to parse portfolio data' });
        }
    });
});

// Update portfolio data
app.put('/api/portfolio', (req, res) => {
    const { section, data } = req.body;

    if (useFileDb) {
        let currentData = loadFileData() || {};
        let updatedData;
        if (section === 'all') {
            updatedData = data;
        } else {
            updatedData = { ...currentData };
            updatedData[section] = data[section];
        }
        saveFileData(updatedData);
        return res.json({ success: true, message: 'Portfolio data updated successfully' });
    }

    // First get the current data
    const selectQuery = 'SELECT data FROM portfolio LIMIT 1';

    db.query(selectQuery, (err, results) => {
        if (err) {
            console.error('Error fetching current portfolio data:', err.message);
            return res.status(500).json({ error: 'Failed to fetch current portfolio data' });
        }

        let currentData;
        if (results.length > 0) {
            try {
                currentData = JSON.parse(results[0].data);
            } catch (parseError) {
                console.error('Error parsing current portfolio data:', parseError);
                return res.status(500).json({ error: 'Failed to parse current portfolio data' });
            }
        } else {
            currentData = {};
        }

        let updatedData;
        if (section === 'all') {
            // Update entire portfolio
            updatedData = data;
        } else {
            // Update specific section
            updatedData = { ...currentData };
            updatedData[section] = data[section];
        }

        // Update the database
        let query;
        let params;

        if (results.length > 0) {
            // Update existing record
            query = 'UPDATE portfolio SET data = ? WHERE id = ?';
            params = [JSON.stringify(updatedData), results[0].id];
        } else {
            // Insert new record
            query = 'INSERT INTO portfolio (data) VALUES (?)';
            params = [JSON.stringify(updatedData)];
        }

        db.query(query, params, (err, result) => {
            if (err) {
                console.error('Error updating portfolio data:', err.message);
                return res.status(500).json({ error: 'Failed to update portfolio data' });
            }
            res.json({ success: true, message: 'Portfolio data updated successfully' });
        });
    });
});

// Admin login route (simplified for demo)
app.post('/api/admin/login', (req, res) => {
    const { username, password } = req.body;
    
    // In a real application, you would verify against a database
    // For this demo, we'll use hardcoded credentials
    if (username === 'admin' && password === 'password123') {
        res.json({ success: true, message: 'Login successful' });
    } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
});

// Serve admin login page
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, '../admin/login.html'));
});

// Admin dashboard (protected in a real app)
app.get('/admin/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, '../admin/index.html'));
});

// Start server (only for local development)
if (require.main === module) {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}

// Export for Vercel serverless functions
module.exports = app;