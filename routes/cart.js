const express = require('express');
const authGuard = require('../middleware/auth');
const Cart = require('../models/Cart');
const Order = require('../models/Order');
const router = express.Router();

router.get('/', authGuard, async (req, res) => {
  try {
    const items = await Cart.find({ user_name: req.session.user }).lean();
    const totalPrice = items.reduce((sum, i) => sum + i.price, 0);
    res.render('cart', {
      user: req.session.user,
      items,
      totalPrice,
      totalItems: items.length,
      purchaseSuccess: false,
    });
  } catch (err) {
    console.error(err);
    res.redirect('/marketplace');
  }
});

router.post('/remove', authGuard, async (req, res) => {
  try {
    await Cart.deleteOne({
      user_name: req.session.user,
      product_name: req.body.product_name,
    });
    res.redirect('/cart');
  } catch (err) {
    console.error(err);
    res.redirect('/cart');
  }
});

router.post('/checkout', authGuard, async (req, res) => {
  try {
    const items = await Cart.find({ user_name: req.session.user }).lean();
    if (items.length === 0) return res.redirect('/cart');

    const orderDocs = items.map(i => ({
      user_name: req.session.user,
      product_name: i.product_name,
      price: i.price,
    }));
    await Order.insertMany(orderDocs);
    await Cart.deleteMany({ user_name: req.session.user });

    res.render('cart', {
      user: req.session.user,
      items: [],
      totalPrice: 0,
      totalItems: 0,
      purchaseSuccess: true,
    });
  } catch (err) {
    console.error(err);
    res.redirect('/cart');
  }
});

module.exports = router;
