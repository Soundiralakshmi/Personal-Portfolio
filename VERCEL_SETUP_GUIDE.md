# Vercel Deployment Setup Guide

## Step 1: Create a Free Cloud MySQL Database

### Option A: PlanetScale (Recommended - Free tier available)
1. Go to https://planetscale.com/
2. Sign up for free account
3. Create new database named `portfolio_db`
4. Get your connection credentials:
   - Host: `your-db-name.mysql.planetscale.com`
   - Username: `user@your-db-name`
   - Password: (Will be shown during setup)
   - Port: 3306
5. Create a new password and copy all credentials

### Option B: AWS RDS or Azure MySQL
- Similar process, get your connection string from the provider

## Step 2: Configure Environment Variables in Vercel

1. Go to Vercel Dashboard: https://vercel.com/dashboard
2. Select your project "mypersonal-port"
3. Click on **Settings** → **Environment Variables**
4. Add the following variables:

```
DB_HOST = your-database-host
DB_USER = your-username
DB_PASSWORD = your-password (use masking if sensitive)
DB_NAME = portfolio_db
DB_PORT = 3306
NODE_ENV = production
PORT = 3000
```

5. Save and redeploy by pushing to git or clicking "Redeploy"

## Step 3: Initialize Database

After adding environment variables:

### First Time Setup:
1. The database will auto-initialize on first deployment
2. OR manually run the setup by accessing your Vercel URL

### Manual Setup (if needed):
- Run `npm run setup-db` locally before deployment

## Step 4: Test Your Deployment

Visit your deployed app:
- **Public Portfolio**: https://mypersonal-port.vercel.app
- **Admin Panel**: https://mypersonal-port.vercel.app/admin/

### Admin Login Credentials:
- Username: `admin`
- Password: `admin123`

## File Structure After Deployment

```
├── public/              → Served as static files (frontend)
├── admin/               → Admin panel (static)
├── server/              → Node.js backend (API endpoints)
│   └── server.js        → Main server file
├── package.json         → Dependencies
└── vercel.json          → Deployment config
```

## Troubleshooting

### Database Connection Fails
- Check if environment variables are set correctly in Vercel Settings
- Verify database credentials are exact
- Check if database firewall allows Vercel IPs

### Files Not Loading
- Check Vercel logs at: https://vercel.com/soundiras-projects/mypersonal-port/
- Look for deployment errors

### Need to Redeploy
- Push changes to git
- Or use Vercel CLI: `vercel --prod`

## Local Testing (Before Deployment)

1. Install dependencies: `npm install`
2. Create `.env` file with your test database credentials
3. Run local server: `npm run dev`
4. Access at: `http://localhost:3001`

That's it! Your portfolio is now live with database support! 🎉
