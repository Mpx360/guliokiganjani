require('dotenv').config();
const express = require('express');
const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const connectDB = require('./config/db.js');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to Database
connectDB();

// View Engine Setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// Session Configuration
app.use(session({
    secret: process.env.SESSION_SECRET || 'gulio-secret-key',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI,
        collectionName: 'sessions',
    }),
}));

// Routes
app.use('/', require('./routes/auth'));
app.use('/marketplace', require('./routes/marketplace'));
app.use('/cart', require('./routes/cart'));
app.use('/activities', require('./routes/activities'));

// Ad/Promo landing page
app.get('/ad', (req, res) => {
    res.render('ad');
});

// Server Listener
app.listen(PORT, () => {
    console.log(`Gulio server running on port ${PORT}`);
});