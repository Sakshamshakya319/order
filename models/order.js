const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  itemName: {
    type: String,
    required: true
  },
  itemPrice: {
    type: Number,
    required: true
  },
  unitsBought: {
    type: Number,
    required: true
  },
  payableAmount: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Order', OrderSchema);