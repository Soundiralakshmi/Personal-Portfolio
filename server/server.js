const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));
app.use('/admin', express.static(path.join(__dirname, '../admin')));

// Data file path
const dataFilePath = path.join(__dirname, 'data.json');

// Initialize data file if it doesn't exist
if (!fs.existsSync(dataFilePath)) {
    const initialData = {
        personalInfo: {
            name: "G. Soundiralakshmi",
            title: "Information Technology Student",
            summary: "As a passionate learner in the field of IT, I'm always curious to explore new technologies and improve my skills. I enjoy working on creative interfaces and real-time applications. I look forward to opportunities where I can apply my knowledge, grow professionally, and make a valuable impact in a team or organization.",
            details: "Currently pursuing my B-Tech in Information Technology at Dr. MGR Educational and Research Institute, I have developed a strong foundation in programming, web development, and data science.",
            profileImage: "https://z-cdn-media.chatglm.cn/files/f3188da8-9be4-42c0-81c6-d8bbc0a8148e_G.Soundiralakshmi.jpg?auth_key=1789497993-a3cbf374b08c4589bdd8dce9616e44c1-0-100c392e8206f91b4b8c14fde1edaf7a",
            email: "slsoundira21@gmai.com",
            phone: "+91-7904322845",
            location: "Thiruvallur",
            linkedin: "linkedin.com/in/soundiralakshmi"
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
                degree: "Intermediate (12th Grade)",
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
            technical: ["Python", "UI using Figma", "Java", "C, C++", "HTML, CSS", "Flutter using Dart Language", "Data Science using R"],
            soft: ["Public Relations", "Teamwork", "Time Management", "Leadership", "Effective Communication", "Creative Thinking"]
        },
        languages: ["Tamil", "English"],
        projects: [
            {
                title: "Expenses Tracker using Flutter",
                description: "Mini project",
                technologies: ["Flutter", "Dart"]
            },
            {
                title: "Harbour Management System Using Python",
                description: "Mini project",
                technologies: ["Python"]
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
        hobbies: ["Listening music"]
    };
    
    fs.writeFileSync(dataFilePath, JSON.stringify(initialData, null, 2));
}

// API Routes

// Get portfolio data
app.get('/api/portfolio', (req, res) => {
    try {
        const data = fs.readFileSync(dataFilePath, 'utf8');
        res.json(JSON.parse(data));
    } catch (error) {
        console.error('Error reading portfolio data:', error);
        res.status(500).json({ error: 'Failed to read portfolio data' });
    }
});

// Update portfolio data
app.put('/api/portfolio', (req, res) => {
    try {
        const { section, data } = req.body;
        
        // Read current data
        const currentData = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));
        
        // Update data based on section
        if (section === 'all') {
            // Update entire portfolio
            fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
        } else {
            // Update specific section
            currentData[section] = data[section];
            fs.writeFileSync(dataFilePath, JSON.stringify(currentData, null, 2));
        }
        
        res.json({ success: true, message: 'Portfolio data updated successfully' });
    } catch (error) {
        console.error('Error updating portfolio data:', error);
        res.status(500).json({ error: 'Failed to update portfolio data' });
    }
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
app.get('/admin/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../admin/index.html'));
});

// Admin dashboard (protected in a real app)
app.get('/admin/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, '../admin/dashboard.html'));
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});