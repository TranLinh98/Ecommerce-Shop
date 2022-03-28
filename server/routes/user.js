import express from 'express';
import {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} from '../middleware/varifyToken.js';
import {
  getAllUsers,
  getUserStats,
  getUserById,
  deleteUserById,
  getUserDetails,
  updateUser,
  updateUserRole,
  updatePassword,
} from '../controllers/userController.js';

const router = express.Router();

router.route('/admin').get(verifyTokenAndAdmin, getAllUsers);
router.route('/me').get(verifyTokenAndAuthorization, getUserDetails);

router.route('/me/update').put(verifyTokenAndAuthorization, updateUser);
router
  .route('/password/update')
  .put(verifyTokenAndAuthorization, updatePassword);

router.route('/stats').get(verifyTokenAndAdmin, getUserStats);

router
  .route('/admin/:id')
  .get(verifyTokenAndAdmin, getUserById)
  .put(verifyTokenAndAdmin, updateUserRole)
  .delete(verifyTokenAndAdmin, deleteUserById);

export default router;
