import express from 'express';
import {
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} from '../middleware/varifyToken.js';
import {
  createProduct,
  createProductReview,
  deleteProduct,
  deleteReview,
  getAdminProducts,
  getAllProducts,
  getProductById,
  getProductReviews,
  updateProduct,
} from '../controllers/productController.js';

const router = express.Router();

router.route('/').get(getAllProducts);
router
  .route('/admin')
  .get(verifyTokenAndAdmin, getAdminProducts)
  .post(verifyTokenAndAdmin, createProduct);

router.route('/review').put(verifyTokenAndAuthorization, createProductReview);

router
  .route('/reviews')
  .get(getProductReviews)
  .delete(verifyTokenAndAuthorization, deleteReview);

router.route('/:id').get(getProductById);

router
  .route('/admin/:id')
  .put(verifyTokenAndAdmin, updateProduct)
  .delete(verifyTokenAndAdmin, deleteProduct);

export default router;
