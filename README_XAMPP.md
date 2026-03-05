# Portfolio Website with XAMPP MySQL Database

This portfolio website uses XAMPP MySQL database for data persistence.

## Prerequisites

1. **Install XAMPP**
   - Download XAMPP from: https://www.apachefriends.org/download.html
   - Install XAMPP on your system (typically in `C:\xampp` or `D:\xampp`)

2. **Start XAMPP Services**
   - Open XAMPP Control Panel
   - Start Apache and MySQL services

## Database Setup

1. **Open phpMyAdmin**
   - Click "Admin" button next to MySQL in XAMPP Control Panel
   - Or visit: http://localhost/phpmyadmin

2. **Create Database**
   - Click "New" in the left sidebar
   - Database name: `portfolio_db`
   - Click "Create"

3. **Import Schema**
   - Select `portfolio_db` from the left sidebar
   - Click "Import" tab
   - Choose file: `database_schema.sql` from your project root
   - Click "Go"

## Environment Configuration

The `.env` file is already configured for XAMPP MySQL:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=portfolio_db
DB_PORT=3306
PORT=3000
```

## Installation & Running

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start the Server**
   ```bash
   npm start
   ```

3. **Access the Application**
   - Public site: http://localhost:3000
   - Admin panel: http://localhost:3000/admin

## Database Configuration

- **Host**: localhost (XAMPP MySQL)
- **Port**: 3306 (default MySQL port)
- **Username**: root (XAMPP default)
- **Password**: (empty by default)
- **Database**: portfolio_db

## Troubleshooting

1. **MySQL Connection Error**
   - Ensure XAMPP MySQL service is running
   - Check if database `portfolio_db` exists in phpMyAdmin
   - Verify `.env` configuration matches your XAMPP setup

2. **Port Already in Use**
   - Change PORT in `.env` if 3000 is occupied
   - Or stop other applications using port 3000

3. **Database Not Found**
   - Run the `database_schema.sql` script in phpMyAdmin
   - Ensure the database name matches in `.env`

## Features

- Dynamic portfolio content management
- Admin panel with authentication
- MySQL database persistence
- Responsive design
- Contact form integration

## Admin Access

- **Username**: admin
- **Password**: password123

*Note: Change these credentials in production for security.*