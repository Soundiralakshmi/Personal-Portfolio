// Vercel Serverless Function Handler
// This file handles all API calls in the Vercel serverless environment

const express = require('express');
const mysql = require('mysql2');
require('dotenv').config();

const app = express();

// Database connection
const db = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'portfolio_db',
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS support
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

// Initialize database with default data
function initializeDatabase() {
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
        }
    };

    const insertQuery = 'INSERT INTO portfolio (data) VALUES (?)';
    db.query(insertQuery, [JSON.stringify(initialData)], (err) => {
        if (err) {
            console.error('Error inserting initial data:', err.message);
        } else {
            console.log('Initial data inserted into database');
        }
    });
}

// Initialize on first call
let initialized = false;
if (!initialized) {
    try {
        db.getConnection((err, connection) => {
            initialized = true;
            if (err) {
                console.error('Database connection failed:', err.message);
                return;
            }
            console.log('Connected to MySQL database');
            connection.release();
            initializeDatabase();
        });
    } catch (e) {
        console.error('Error connecting to database:', e.message);
    }
}

// ==================== API ROUTES ====================

// Get portfolio data
app.get('/api/portfolio', (req, res) => {
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

    const selectQuery = 'SELECT data, id FROM portfolio LIMIT 1';

    db.query(selectQuery, (err, results) => {
        if (err) {
            console.error('Error fetching current portfolio data:', err.message);
            return res.status(500).json({ error: 'Failed to fetch current portfolio data' });
        }

        let currentData;
        let portfolioId;
        
        if (results.length > 0) {
            try {
                currentData = JSON.parse(results[0].data);
                portfolioId = results[0].id;
            } catch (parseError) {
                console.error('Error parsing current portfolio data:', parseError);
                return res.status(500).json({ error: 'Failed to parse current portfolio data' });
            }
        } else {
            currentData = {};
        }

        let updatedData;
        if (section === 'all') {
            updatedData = data;
        } else {
            updatedData = { ...currentData };
            updatedData[section] = data[section];
        }

        let query;
        let params;

        if (results.length > 0) {
            query = 'UPDATE portfolio SET data = ? WHERE id = ?';
            params = [JSON.stringify(updatedData), portfolioId];
        } else {
            query = 'INSERT INTO portfolio (data) VALUES (?)';
            params = [JSON.stringify(updatedData)];
        }

        db.query(query, params, (err) => {
            if (err) {
                console.error('Error updating portfolio data:', err.message);
                return res.status(500).json({ error: 'Failed to update portfolio data' });
            }
            res.json({ success: true, message: 'Portfolio data updated successfully' });
        });
    });
});

// Admin login route
app.post('/api/admin/login', (req, res) => {
    const { username, password } = req.body;
    
    // Hardcoded credentials for demo (change in production)
    if (username === 'admin' && password === 'admin123') {
        res.json({ success: true, message: 'Login successful', token: 'demo-token' });
    } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Server is running' });
});

// Health check endpoint (root)
app.get('/health', (req, res) => {
    res.json({ status: 'ok', message: 'Server is running' });
});

module.exports = app;
