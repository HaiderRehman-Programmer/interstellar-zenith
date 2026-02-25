# interstellar-zenith
Learning Project

<img width="1920" height="826" alt="screencapture-localhost-3000-2026-02-23-15_23_58" src="https://github.com/user-attachments/assets/86a45a9d-fff5-42a5-8486-e509e8368b29" />

<img width="1920" height="1453" alt="screencapture-localhost-3000-dashboard-2026-02-23-15_26_34" src="https://github.com/user-attachments/assets/0b8c82f2-2889-4a2b-884b-384e87e8951f" />

<img width="1920" height="826" alt="screencapture-localhost-3000-login-2026-02-23-15_22_47" src="https://github.com/user-attachments/assets/014ec29d-59ed-4e28-b5e3-b48855686e32" />

<img width="1920" height="826" alt="screencapture-localhost-3000-signup-2026-02-23-15_23_02" src="https://github.com/user-attachments/assets/186c0064-8f76-4b28-9e4c-1345b261e87f" />

___________________________________________________________________________________________________________________________________________________________________________________

# Interstellar Zenith 🚀

A complete **Node.js application** featuring user authentication, database integration, file management, and a polished user experience.

---

## ✨ Features

### 🔐 Authentication
- **Signup**: User registration with input validation (min length, email format) using `express-validator`.
- **Login**: Secure login with password hashing via `bcrypt`.
- **Logout**: Session destruction and redirection.

### 🗄️ Database Integration
- **SQLite**: Local database (`database.sqlite`) stores user data.
- **Persistence**: Data remains available after server restarts.

### 📁 File Management
- **Profile Pictures**: Upload via Dashboard using `multer`.
- **Static Serving**: Files stored in `/uploads` and served statically.

### 🌐 API Endpoints
- **Public API**: `GET /api/public-data` → JSON data accessible to anyone.
- **Private API**: `GET /api/user/profile` → Authenticated user’s profile data.

### 🛡️ Security & Server Logic
- **Helmet**: Secured HTTP headers.
- **CORS**: Configured for cross-origin requests.
- **Middleware**: Custom `isAuthenticated` middleware protects sensitive routes (`/dashboard`, `/upload`).

### ✨ Polished UX
- **Flash Messages**: Clear success/error notifications with `connect-flash`.
- **Animations**: CSS micro-animations (fade-ins, hover effects).
- **Form Validation**: Client-side (JavaScript) + server-side (`express-validator`).
- **SEO**: Meta descriptions + semantic HTML.

---

## 📂 Project Structure

___________________________________________________________________________________________________________________________________________________________________________________

text/
├── public/           # Static assets (CSS, JS)
├── uploads/          # User uploaded profile pictures
├── views/            # EJS templates (Home, Login, Signup, Dashboard)
├── database.js       # SQLite connection and schema setup
├── server.js         # Core Express app logic
└── database.sqlite   # SQLite database file



---

## 🚀 Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/HaiderRehman-Programmer/interstellar-zenith.git
   cd interstellar-zenith

    Install dependencies:

    npm install

    Run the server:

    node server.js

    Open in browser:
    Code

    http://localhost:3000

💡 Demo Tip

Check the "API Data Consumption Demo" section on the Dashboard to see how the frontend interacts with backend JSON APIs.

📌 Next Steps (Ideas for Expansion)

    Switch to PostgreSQL/MongoDB for production.

    Add JWT authentication & OAuth (Google/GitHub).

    Store uploads in cloud storage (AWS S3, Cloudinary).

    Replace EJS with React/Vue for a dynamic frontend.

    Add unit tests with Jest/Mocha.

    Containerize with Docker & deploy to Heroku/Vercel/Azure.

🛠️ Tech Stack

    Node.js + Express

    SQLite

    EJS Templates

    Multer (file uploads)

    bcrypt (password hashing)

    Helmet, CORS

    connect-flash

📜 License

This project is licensed under the MIT License.

# Node.js Authentication & Database Project 🔐🗄️

A complete Node.js application featuring **user authentication**, **SQLite database integration**, **file management**, and a polished frontend experience.

---

## 📦 Project Setup

1. **Initialize Node.js project**
   ```bash
   npm init -y

Install dependencies

npm install express sqlite3 bcrypt express-session ejs multer helmet cors express-validator connect-flash

Create project structure

text/
├── public/           # Static assets (CSS, JS)
├── uploads/          # User uploaded profile pictures
├── views/            # EJS templates (Home, Login, Signup, Dashboard)
├── database.js       # SQLite connection and schema setup
├── server.js         # Core Express app logic
└── database.sqlite   # SQLite database file


🗄️ Database Implementation

    Initialize SQLite database connection (sqlite3).

    Create Users table schema.

    Implement data access layer (User model).

⚙️ Backend Implementation

    Setup Express server with security middleware (helmet, cors).

    Implement Authentication routes:

        Signup

        Login

        Logout

    Implement API routes:

        /api/users

        /api/data

    Implement File Upload logic with multer.

    Add Middleware for protected routes & input validation.

🎨 Frontend Implementation

    Create EJS views: Home, Login, Signup, Dashboard.

    Implement AJAX/Fetch for API data consumption.

    Add basic CSS styling with animations and transitions.

✅ Verification

    Test User Registration.

    Test User Login and session persistence.

    Test Database persistence across server restarts.

✨ Polish & Enhancements

    Client-side form validation.

    Flash messages for feedback (connect-flash).

    Enhanced UI with CSS animations and transitions.

    Meta descriptions for SEO.

🚀 How to Run

    Start the server:
    node server.js
    
Open in browser:

http://localhost:3000

💡 Tip: Check the "API Data Consumption Demo" section on the Dashboard to see how the frontend interacts with backend JSON APIs.
📤 GitHub Upload

    Create .gitignore (ignore node_modules, uploads, etc.).

    Initialize Git:
    git init
    
git add .
git commit -m "Initial commit"

Link to GitHub and push:

git remote add origin https://github.com/HaiderRehman-Programmer/interstellar-zenith.git
git push -u origin main

🛠️ Tech Stack

    Node.js + Express

    SQLite

    EJS Templates

    Multer (file uploads)

    bcrypt (password hashing)

    Helmet, CORS

    connect-flash

# Node.js Authentication & Database Project

A self-contained Node.js application demonstrating **user authentication** and **database operations** using SQLite.  
This project uses **EJS** for server-side rendering to keep everything within the Node.js ecosystem.

---

## 📂 Project Structure

```
text/
├── public/             # Static files (CSS)
├── views/              # EJS Templates
│   ├── login.ejs
│   ├── signup.ejs
│   └── dashboard.ejs
├── database.js         # SQLite connection and schema setup
├── server.js           # Main Express application
└── package.json
```

---

## 📦 Dependencies

- **express** – Web framework  
- **sqlite3** – SQLite database driver  
- **bcrypt** – Password hashing  
- **express-session** – Session management  
- **ejs** – Templating engine  
- **multer** – File upload handling  
- **helmet** – Secure HTTP headers  
- **express-validator** – Input validation  
- **cors** – Cross-Origin Resource Sharing  

---

## 🗄️ Database Schema

### Users Table
- `id`: Integer, Primary Key, Auto-increment  
- `username`: Text, Unique  
- `password`: Text (Hashed)  
- `email`: Text, Unique  

---

## 🌐 Routes

### Web Routes (SSR)
- `GET /` → Home page  
- `GET /login` / `POST /login` → Login page & processing  
- `GET /signup` / `POST /signup` → Signup page & processing  
- `GET /dashboard` → Protected route (requires login)  
- `GET /logout` → Ends session  
- `POST /upload` → Upload user profile picture  

### API Routes (JSON)
- `GET /api/user/profile` → Returns current user data  
- `GET /api/public-data` → Example public API endpoint  

---

## ✅ Verification Plan

### Manual Verification
1. Start server with:
   ```bash
   node server.js
   ```
2. Open browser at [http://localhost:3000](http://localhost:3000)  
3. Register a new user → Verify redirection to login/dashboard  
4. Login with credentials → Verify access to dashboard  
5. Logout → Verify redirection to home/login  
6. Restart server → Verify user data persists in SQLite file  

---

## ⚙️ Notes
- SQLite is chosen for simplicity (serverless, no external installation).  
- If preferred, the project can be adapted to **MongoDB** or **PostgreSQL**.  
- Entire project is implemented in **Node.js** with **EJS** templates.  
