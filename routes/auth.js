const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const router = express.Router();

router.get('/', (req, res) => {
  if (req.session.user) return res.redirect('/marketplace');
  res.render('index', { error: null });
});

router.post('/signup', async (req, res) => {
  try {
    const { fullname, email, password } = req.body;
    const existing = await User.findOne({ email });
    if (existing) {
      return res.render('index', { error: 'Email already registered' });
    }
    const hashed = await bcrypt.hash(password, 10);
    await User.create({ fullname, email, password: hashed });
    req.session.user = fullname;
    res.redirect('/marketplace');
  } catch (err) {
    console.error(err);
    res.render('index', { error: 'Something went wrong' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.render('index', { error: 'Invalid email or password' });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.render('index', { error: 'Invalid email or password' });
    }
    req.session.user = user.fullname;
    res.redirect('/marketplace');
  } catch (err) {
    console.error(err);
    res.render('index', { error: 'Something went wrong' });
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

module.exports = router;
