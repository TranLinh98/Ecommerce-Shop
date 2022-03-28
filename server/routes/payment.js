import express from 'express';
import {
  processPayment,
  sendStripeApiKey,
} from '../controllers/paymentController.js';
import { verifyTokenAndAuthorization } from '../middleware/varifyToken.js';

const router = express.Router();

router
  .route('/payment')
  .post(verifyTokenAndAuthorization, processPayment);

router
  .route('/stripeapikey')
  .get(verifyTokenAndAuthorization, sendStripeApiKey);

export default router;
