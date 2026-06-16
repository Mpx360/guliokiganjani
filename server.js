require('dotenv').config();
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const path = require('path');
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SESSION_SECRET || 'gulio-secret-key',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    collectionName: 'sessions',
  }),
}));

app.use('/', require('./routes/auth'));
app.use('/marketplace', require('./routes/marketplace'));
app.use('/cart', require('./routes/cart'));
app.use('/activities', require('./routes/activities'));

app.listen(PORT, () => {
  console.log(`Gulio server running on http://localhost:${PORT}`);
});
