const express = require('express');
const router = express.Router();
const {
  getOrders,
  getCreateOrderForm,
  createOrder,
  getUpdateOrderForm,
  updateOrder,
  deleteOrder,
} = require('../controllers/orderController');
const { requireAuth } = require('../middleware/authMiddleware');

router.use(requireAuth);

router.get('/', getOrders);
router.get('/create', getCreateOrderForm);
router.post('/create', createOrder);
router.get('/update/:orderId', getUpdateOrderForm);
router.post('/update/:orderId', updateOrder);
router.post('/delete/:orderId', deleteOrder);

module.exports = router;
