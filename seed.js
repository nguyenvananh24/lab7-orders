const mongoose = require('mongoose');
const Product = require('./models/productModel');
const Order = require('./models/orderModel');
const User = require('./models/userModel');
require('dotenv').config();

const users = [
  {
    username: 'admin',
    password: '123456',
    fullName: 'System Administrator',
    role: 'admin',
  },
  {
    username: 'staff',
    password: '123456',
    fullName: 'Store Staff',
    role: 'staff',
  },
];

const products = [
  {
    productName: 'Wireless Mouse',
    category: 'Electronics',
    stockStatus: 'in_stock',
    unitPrice: 250000,
    tags: ['bestseller', 'wireless', 'accessory'],
  },
  {
    productName: 'Mechanical Keyboard',
    category: 'Electronics',
    stockStatus: 'in_stock',
    unitPrice: 850000,
    tags: ['gaming', 'mechanical', 'accessory'],
  },
  {
    productName: 'USB-C Hub',
    category: 'Electronics',
    stockStatus: 'in_stock',
    unitPrice: 350000,
    tags: ['hub', 'usb', 'accessory'],
  },
  {
    productName: 'Laptop Stand',
    category: 'Accessories',
    stockStatus: 'in_stock',
    unitPrice: 200000,
    tags: ['stand', 'ergonomic'],
  },
  {
    productName: 'Webcam HD',
    category: 'Electronics',
    stockStatus: 'out_of_stock',
    unitPrice: 650000,
    tags: ['webcam', 'hd', 'video'],
  },
  {
    productName: 'May anh 2',
    category: 'Electronics',
    stockStatus: 'out_of_stock',
    unitPrice: 800000,
    tags: ['webcam', 'hd', 'video'],
  },
];

const orders = [
  {
    customerName: 'Nguyen Thi Lan',
    productName: 'Wireless Mouse',
    quantity: 2,
    orderDate: new Date('2024-10-17T00:00:00Z'),
    totalPrice: 500000,
  },
  {
    customerName: 'Pham Van Duc',
    productName: 'Mechanical Keyboard',
    quantity: 1,
    orderDate: new Date('2024-10-18T00:00:00Z'),
    totalPrice: 850000,
  },
];

async function seed() {
  if (!process.env.MONGODB_URI) {
    console.error('MONGODB_URI is missing in .env');
    process.exit(1);
  }

  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected to MongoDB for seeding');

  await Product.deleteMany({});
  await Order.deleteMany({});
  await User.deleteMany({});

  await Product.insertMany(products);
  await Order.insertMany(orders);

  for (const u of users) {
    await User.create(u);
  }

  console.log(' Seed data inserted successfully!');
  console.log('--- Test Accounts ---');
  console.log(' Admin: admin / 123456');
  console.log(' Staff: staff / 123456');

  process.exit(0);
}

seed().catch(err => {
  console.error('Seed error:', err);
  process.exit(1);
});
