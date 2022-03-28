import express from 'express';
import {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} from '../middleware/varifyToken.js';

import {
  createOrder,
  deleteOrder,
  getAllOrders,
  getIncome,
  getOrdersByUser,
  getSingleOrder,
  updatedOrder,
} from '../controllers/orderController.js';

const router = express.Router();

router.route('/new').post(verifyTokenAndAuthorization, createOrder);
router.route('/income').get(verifyTokenAndAdmin, getIncome);

router.route('/me').get(verifyTokenAndAuthorization, getOrdersByUser);
router.route('/admin').get(verifyTokenAndAdmin, getAllOrders);

router.route('/:id').get(verifyTokenAndAuthorization, getSingleOrder);

router
  .route('/admin/:id')
  .get(verifyTokenAndAuthorization, getSingleOrder)
  .put(verifyTokenAndAdmin, updatedOrder)
  .delete(verifyTokenAndAdmin, deleteOrder);

export default router;
