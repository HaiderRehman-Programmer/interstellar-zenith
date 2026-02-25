const express = require('express');
const session = require('express-session');
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');
const helmet = require('helmet');
const cors = require('cors');
const flash = require('connect-flash');
const { body, validationResult } = require('express-validator');
const db = require('./database');

const app = express();
const PORT = process.env.PORT || 3000;

// Security & Static Files
app.use(helmet({
    contentSecurityPolicy: false, // Disable CSP for easier development with local EJS/CSS
}));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.set('view engine', 'ejs');

// Session Configuration
app.use(session({
    secret: 'interstellar-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));

// Flash Messages
app.use(flash());

// Global Middleware to set variables for EJS
app.use((req, res, next) => {
    // Ensure these are always defined as arrays/objects/null
    res.locals.success_msg = req.flash('success_msg') || [];
    res.locals.error_msg = req.flash('error_msg') || [];
    res.locals.errors = []; // Default for validation errors
    res.locals.user = req.session.user || null;
    next();
});

// Multer Storage for File Uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// Auth Middleware
const isAuthenticated = (req, res, next) => {
    if (req.session.userId) {
        return next();
    }
    res.redirect('/login');
};

// --- Web Routes ---

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/signup', (req, res) => {
    res.render('signup');
});

app.post('/signup', [
    body('username').trim().isLength({ min: 3 }).escape(),
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 6 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render('signup', { errors: errors.array() });
    }

    const { username, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        db.run(`INSERT INTO users (username, email, password) VALUES (?, ?, ?)`,
            [username, email, hashedPassword],
            function (err) {
                if (err) {
                    req.flash('error_msg', 'Username or Email already exists');
                    return res.redirect('/signup');
                }
                req.flash('success_msg', 'Registration successful! You can now login.');
                res.redirect('/login');
            }
        );
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    db.get(`SELECT * FROM users WHERE username = ?`, [username], async (err, user) => {
        if (err || !user) {
            req.flash('error_msg', 'Invalid username or password');
            return res.redirect('/login');
        }
        const match = await bcrypt.compare(password, user.password);
        if (match) {
            req.session.userId = user.id;
            req.session.user = user;
            req.flash('success_msg', 'Welcome back!');
            res.redirect('/dashboard');
        } else {
            req.flash('error_msg', 'Invalid username or password');
            res.redirect('/login');
        }
    });
});

app.get('/dashboard', isAuthenticated, (req, res) => {
    res.render('dashboard');
});

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

// File Upload
app.post('/upload', isAuthenticated, upload.single('profilePic'), (req, res) => {
    if (!req.file) {
        req.flash('error_msg', 'Please select a file to upload');
        return res.redirect('/dashboard');
    }
    const profilePicPath = `/uploads/${req.file.filename}`;
    db.run(`UPDATE users SET profile_pic = ? WHERE id = ?`, [profilePicPath, req.session.userId], (err) => {
        if (err) return res.status(500).send('Database Error');
        req.session.user.profile_pic = profilePicPath;
        req.flash('success_msg', 'Profile picture updated!');
        res.redirect('/dashboard');
    });
});

// --- API Routes ---

app.get('/api/user/profile', isAuthenticated, (req, res) => {
    res.json({
        id: req.session.user.id,
        username: req.session.user.username,
        email: req.session.user.email,
        profile_pic: req.session.user.profile_pic
    });
});

app.get('/api/public-data', (req, res) => {
    res.json({
        message: 'API is operational',
        timestamp: new Date(),
        status: 'success'
    });
});

// Server Start
app.listen(PORT, () => {
    console.log(`\n=========================================`);
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📡 Database connected and ready.`);
    console.log(`=========================================\n`);
});
