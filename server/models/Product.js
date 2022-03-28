import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please Enter product Name'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please Enter product Description'],
    },
    images: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    category: {
      type: String,
      required: [true, 'Please Enter produc category'],
    },
    ratings: {
      type: Number,
      default: 0,
    },
    price: { type: Number, required: [true, 'Please Enter product price'] },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    stock: {
      type: Number,
      required: [true, 'Please Enter product Stock'],
      default: 1,
    },
    reviews: [
      {
        user: {
          type: mongoose.Schema.ObjectId,
          ref: 'User',
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        rating: {
          type: Number,
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model('Product', ProductSchema);
