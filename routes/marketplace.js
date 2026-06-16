const express = require('express');
const authGuard = require('../middleware/auth');
const Product = require('../models/Product');
const Cart = require('../models/Cart');
const router = express.Router();

router.get('/', authGuard, async (req, res) => {
  try {
    const filter = req.query.category ? { category: req.query.category } : {};
    const products = await Product.find(filter).lean();
    res.render('marketplace', {
      user: req.session.user,
      products,
      activeCategory: req.query.category || 'All',
      cart_success: req.session.cart_success || null,
    });
    req.session.cart_success = null;
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
});

router.post('/cart', authGuard, async (req, res) => {
  try {
    const { product_name, price } = req.body;
    await Cart.create({
      user_name: req.session.user,
      product_name,
      price: Number(price),
    });
    req.session.cart_success = `${product_name} has been added to your cart!`;
    res.redirect('/marketplace');
  } catch (err) {
    console.error(err);
    res.redirect('/marketplace');
  }
});

module.exports = router;
