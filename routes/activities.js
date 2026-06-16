const express = require('express');
const authGuard = require('../middleware/auth');
const User = require('../models/User');
const Order = require('../models/Order');
const router = express.Router();

router.get('/', authGuard, async (req, res) => {
  try {
    const user = await User.findOne({ fullname: req.session.user }).lean();
    const orders = await Order.find({ user_name: req.session.user }).lean();
    const totalSpent = orders.reduce((sum, o) => sum + o.price, 0);

    res.render('activities', {
      user: req.session.user,
      email: user ? user.email : 'user@guliomtandaoni.com',
      orders,
      totalSpent,
    });
  } catch (err) {
    console.error(err);
    res.redirect('/marketplace');
  }
});

module.exports = router;
