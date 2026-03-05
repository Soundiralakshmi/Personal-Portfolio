# Architecture Diagram - How Your Portfolio Works

## 🌐 User Access Flow

```
Users visit: https://mypersonal-port.vercel.app
                         ↓
                    [Vercel CDN]
                    (Hosting)
                         ↓
         ┌────────────────┼────────────────┐
         ↓                ↓                ↓
    index.html       /admin/login.html   /api/*
   (Frontend)        (Admin Panel)       (Backend)
         ↓                ↓                ↓
   Load CSS & JS    Authentication    Get/Update Data
   Display Content         ↓                ↓
                   Dashboard.html    [MySQL Database]
                   (Edit Content)    (Cloud)
```

## 📁 Project File Organization

```
Your Portfolio Project
│
├── 🌐 PUBLIC FOLDER (What users see when visiting portfolio)
│   ├── index.html          ← Main portfolio page
│   ├── styles.css          ← Design/styling
│   ├── script.js           ← Frontend interactions
│   └── images/             ← Portfolio images
│
├── 🔐 ADMIN FOLDER (What you use to edit content)
│   ├── login.html          ← Login page
│   ├── dashboard.html      ← Main editing interface
│   ├── index.html          ← Admin home
│   └── admin.js            ← Admin functionality
│
├── ⚙️ SERVER FOLDER (Backend logic)
│   └── server.js           ← Handles API requests
│
├── 🚀 API FOLDER (Vercel serverless functions)
│   └── index.js            ← API routes (GET, POST, PUT)
│
└── ⚙️ CONFIGURATION FILES
    ├── package.json        ← Project dependencies
    ├── vercel.json         ← How Vercel deploys your site
    ├── .env                ← Database credentials (local)
    └── .env.example        ← Template for .env
```

## 🔄 Data Flow

### When a User Visits Your Portfolio:

```
1. User types: https://mypersonal-port.vercel.app
                         ↓
2. Vercel server responds with public/index.html
                         ↓
3. HTML loads scripts (script.js)
                         ↓
4. Script calls: /api/portfolio
                         ↓
5. API (api/index.js) fetches data from database
                         ↓
6. Database returns portfolio data as JSON
                         ↓
7. Frontend displays data on the page
                         ↓
8. User sees your portfolio! ✅
```

### When Admin Edits Content:

```
1. Admin logs in: https://mypersonal-port.vercel.app/admin/
   (Username: admin, Password: admin123)
                         ↓
2. Admin edits content in dashboard.html
                         ↓
3. Admin clicks "Save"
                         ↓
4. JavaScript calls: PUT /api/portfolio
                         ↓
5. API saves updated data to database
                         ↓
6. Database updated ✅
                         ↓
7. Next user sees updated portfolio!
```

## 🗄️ Database Structure

```
MySQL Database: portfolio_db
    │
    └── Table: portfolio
        ├── ID (auto)
        ├── data (JSON format containing:)
        │   ├── personalInfo
        │   │   ├── name
        │   │   ├── email
        │   │   ├── profileImage
        │   │   └── ...
        │   ├── education
        │   ├── skills
        │   ├── projects
        │   ├── certifications
        │   └── ...
        ├── created_at
        └── updated_at
```

## 🔌 API Endpoints

| Endpoint | Method | What It Does |
|----------|--------|-------------|
| `/api/portfolio` | GET | Fetch all portfolio data |
| `/api/portfolio` | PUT | Update portfolio data (for admin) |
| `/api/admin/login` | POST | Authenticate admin login |
| `/api/health` | GET | Check if server is running |
| `/` | GET | Serve public/index.html |
| `/admin` | GET | Serve admin/login.html |

## 🌍 Where Everything Runs

```
┌─────────────────────────────────────────────────────────────┐
│                    VERCEL (Hosting)                         │
│ ┌──────────────────────────────────────────────────────────┐│
│ │ Frontend (HTML, CSS, JS)                                 ││
│ │ - Runs in user's browser                                 ││
│ │ - Fast loading from CDN                                  ││
│ └──────────────────────────────────────────────────────────┘│
│ ┌──────────────────────────────────────────────────────────┐│
│ │ Backend API (Node.js)                                    ││
│ │ - Runs on Vercel's servers                               ││
│ │ - Serverless (auto-scales)                               ││
│ │ - Handles database requests                              ││
│ └──────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
                           ↓
                    [Network Connection]
                           ↓
    ┌──────────────────────────────────────────────────────┐
    │          Cloud MySQL Database                        │
    │ (PlanetScale, AWS RDS, or Azure MySQL)             │
    │                                                      │
    │ Stores all your portfolio data                       │
    └──────────────────────────────────────────────────────┘
```

## 📊 Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | HTML, CSS, JavaScript | What users see |
| **Backend** | Node.js + Express | API server |
| **Hosting** | Vercel | Cloud deployment |
| **Database** | MySQL | Data storage |
| **Package Manager** | npm | Dependency management |

## 🎯 Summary

Your portfolio now has:

✅ **Public Landing Page** - Visitors see your portfolio  
✅ **Admin Panel** - You can edit content  
✅ **Live Database** - Data persists  
✅ **API Backend** - Handles requests  
✅ **Cloud Hosting** - Always available  
✅ **Auto-scaling** - Handles traffic  

All files are synced and running on Vercel! 🚀
