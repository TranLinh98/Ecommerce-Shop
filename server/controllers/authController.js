import User from '../models/User.js';
import CryptoJS from 'crypto-js';
import jwt from 'jsonwebtoken';
import catchAsyncErrors from '../middleware/catchAsyncErrors.js';
import ErrorHander from '../utils/errorHander.js';
import cloudinary from 'cloudinary';

//REGISTER
const registerUser = catchAsyncErrors(async (req, res) => {
  const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: 'avatars',
    width: 150,
    crop: 'scale',
  });

  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SECRET_KEY
    ).toString(),
    avatar: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });

  const user = await newUser.save();

  const accessToken = jwt.sign(
    {
      id: user._id,
      name: user.name,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET,
    { expiresIn: '3d' }
  );
  res.status(200).json({ user, accessToken });
});

//LOGIN
const loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  //check if user password
  if (!email || !password) {
    return next(new ErrorHander('Please Enter Email & Password', 400));
  }

  const user = await User.findOne({ email });

  if (!user) {
    return next(new ErrorHander('Invalid email or password', 401));
  }

  const hashedPassword = CryptoJS.AES.decrypt(
    user.password,
    process.env.SECRET_KEY
  );

  const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

  if (OriginalPassword !== password) {
    return next(new ErrorHander('Wrong credentials!', 401));
  }

  const accessToken = jwt.sign(
    {
      id: user._id,
      name: user.name,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET,
    { expiresIn: '3d' }
  );
  res.status(200).json({ user, accessToken });
});

export { loginUser, registerUser };
