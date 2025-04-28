const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// Get all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.render('index', { 
      orders,
      title: 'All Orders'
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Show create order form
router.get('/create', (req, res) => {
  res.render('create-order', {
    title: 'Create New Order'
  });
});

// Create new order
router.post('/create', async (req, res) => {
  try {
    const { itemName, itemPrice, unitsBought } = req.body;
    
    // Calculate payable amount
    const payableAmount = parseFloat(itemPrice) * parseInt(unitsBought);
    
    await Order.create({
      itemName,
      itemPrice,
      unitsBought,
      payableAmount
    });
    
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Show edit order form
router.get('/edit/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    
    if (!order) {
      return res.status(404).send('Order not found');
    }
    
    res.render('edit-order', {
      order,
      title: 'Edit Order'
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Update order
router.post('/edit/:id', async (req, res) => {
  try {
    const { itemName, itemPrice, unitsBought } = req.body;
    
    // Calculate payable amount
    const payableAmount = parseFloat(itemPrice) * parseInt(unitsBought);
    
    await Order.findByIdAndUpdate(req.params.id, {
      itemName,
      itemPrice,
      unitsBought,
      payableAmount
    });
    
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Delete order
router.get('/delete/:id', async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;