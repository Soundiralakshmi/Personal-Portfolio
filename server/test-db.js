// Quick test to verify SQLite database is working
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'portfolio.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
        return;
    }
    console.log('Database opened successfully');
});

// Test query
db.get("SELECT COUNT(*) as count FROM portfolio", [], (err, row) => {
    if (err) {
        console.error('Error querying database:', err.message);
    } else {
        console.log('Database has', row.count, 'records');
    }
    db.close();
});