import User from '../models/User.js';
import catchAsyncErrors from '../middleware/catchAsyncErrors.js';
import ErrorHander from '../utils/errorHander.js';
import cloudinary from 'cloudinary';
import CryptoJS from 'crypto-js';

//UPDATE
const updateUser = catchAsyncErrors(async (req, res) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };

  if (req.body.password) {
    newUserData.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SECRET_KEY
    ).toString();
  }

  //add image for user and upload image to cloud
  if (req.body.avatar !== '') {
    const user = await User.findById(req.user.id);

    const imageId = user.avatar.public_id;

    await cloudinary.v2.uploader.destroy(imageId);

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: 'avatars',
      width: 150,
      crop: 'scale',
    });

    newUserData.avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    user,
  });
});

// update User password
const updatePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('+password');

  const hashedPassword = CryptoJS.AES.decrypt(
    user.password,
    process.env.SECRET_KEY
  );

  const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

  if (OriginalPassword !== req.body.oldPassword) {
    return next(new ErrorHander('Old password is incorrect', 400));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHander('password does not match', 400));
  }

  user.password = CryptoJS.AES.encrypt(
    req.body.newPassword,
    process.env.SECRET_KEY
  ).toString();

  await user.save();

  res.status(200).json({ success: true, user });
});

//DELETE
const deleteUserById = catchAsyncErrors(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHander(`User does not exist with Id: ${req.params.id}`, 400)
    );
  }

  const imageId = user.avatar.public_id;

  await cloudinary.v2.uploader.destroy(imageId);

  await user.remove();

  res.status(200).json({
    success: true,
    message: 'User Deleted Successfully',
  });
});

//GET profile
const getUserDetails = catchAsyncErrors(async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');

  if (!user) {
    return next(
      new ErrorHander(`User does not exist with Id: ${req.params.id}`)
    );
  }

  res.status(200).json({
    success: true,
    user,
  });
});

//GET ALL USER ADMIN
const getAllUsers = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
});

// GET ONE USER BY ID ADMIN
const getUserById = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHander(`User does not exist with Id: ${req.params.id}`)
    );
  }

  res.status(200).json({
    success: true,
    user,
  });
});

//GET USER STATS
//Thong ke so luong user dang ky moi theo tung thang
const getUserStats = catchAsyncErrors(async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  const data = await User.aggregate([
    { $match: { createdAt: { $gte: lastYear } } },
    {
      $project: {
        month: { $month: '$createdAt' },
      },
    },
    {
      $group: {
        _id: '$month',
        total: { $sum: 1 },
      },
    },
  ]);
  res.status(200).json({
    success: true,
    data,
  });
});

// update User Role -- Admin
const updateUserRole = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    isAdmin: req.body.isAdmin,
  };

  await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

export {
  getAllUsers,
  deleteUserById,
  getUserStats,
  getUserById,
  updateUser,
  getUserDetails,
  updateUserRole,
  updatePassword,
};
