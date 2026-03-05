// Cleanup script to remove unused files
const fs = require('fs');
const path = require('path');

const filesToRemove = [
    'portfolio.db',
    'test-db.js',
    'data.json'
];

console.log('Cleaning up unused files...');

filesToRemove.forEach(file => {
    const filePath = path.join(__dirname, file);
    try {
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            console.log(`Removed: ${file}`);
        } else {
            console.log(`File not found: ${file}`);
        }
    } catch (error) {
        console.error(`Error removing ${file}:`, error.message);
    }
});

console.log('Cleanup complete!');