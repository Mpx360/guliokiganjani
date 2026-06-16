const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user_name:    { type: String, required: true },
  product_name: { type: String, required: true },
  price:        { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
