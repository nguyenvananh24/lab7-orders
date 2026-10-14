const Order = require('../models/orderModel');
const Product = require('../models/productModel');

const getOrders = async (req, res) => {
  const orders = await Order.find().sort({ orderDate: -1 });
  res.render('order', { orders });
};

const getCreateOrderForm = async (req, res) => {
  const products = await Product.find({ stockStatus: 'in_stock' });
  res.render('createOrder', { products });
};

const createOrder = async (req, res) => {
  const { customerName, productName, quantity, orderDate } = req.body;
  const product = await Product.findOne({
    productName,
    stockStatus: 'in_stock',
  });
  if (!product) {
    const products = await Product.find({ stockStatus: 'in_stock' });
    return res.render('createOrder', {
      products,
      error: 'Product not found in the system.',
    });
  }
  const totalPrice = product.unitPrice * Number(quantity);
  await Order.create({ customerName, productName, quantity, orderDate, totalPrice });
  res.redirect('/orders');
};

const getUpdateOrderForm = async (req, res) => {
  const order = await Order.findById(req.params.orderId);
  if (!order) {
    return res.redirect('/orders');
  }
  res.render('updateOrder', { order });
};

const updateOrder = async (req, res) => {
  const { customerName, productName, quantity, orderDate } = req.body;
  const product = await Product.findOne({ productName });
  let totalPrice;
  if (product) {
    totalPrice = product.unitPrice * Number(quantity);
  } else {
    const existingOrder = await Order.findById(req.params.orderId);
    if (!existingOrder) return res.redirect('/orders');
    totalPrice = existingOrder.totalPrice;
  }
  await Order.findByIdAndUpdate(req.params.orderId, {
    customerName,
    productName,
    quantity,
    orderDate,
    totalPrice,
  });
  res.redirect('/orders');
};

const deleteOrder = async (req, res) => {
  await Order.findByIdAndDelete(req.params.orderId);
  res.redirect('/orders');
};

module.exports = { getOrders, getCreateOrderForm, createOrder, getUpdateOrderForm, updateOrder, deleteOrder };
