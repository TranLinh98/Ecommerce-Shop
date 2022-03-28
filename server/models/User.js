import mongoose from 'mongoose';
import validator from 'validator';

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please Enter UserName '],
    },
    email: {
      type: String,
      required: [true, 'Please Enter Your Email'],
      unique: true,
      validate: [validator.isEmail, 'Please Enter a valid Email'],
    },
    password: { type: String, required: [true, 'Please Enter Your Password'] },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    avatar: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

export default mongoose.model('User', UserSchema);
