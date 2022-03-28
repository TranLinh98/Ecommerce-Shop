import userRoute from './user.js';
import authRoute from './auth.js';
import productRoute from './product.js';
import orderRoute from './order.js';
import paymentRoute from './payment.js';

function route(app) {
  app.use('/api/auth', authRoute);
  app.use('/api/users', userRoute);
  app.use('/api/products', productRoute);
  app.use('/api/orders', orderRoute);
  app.use('/api/checkout', paymentRoute);
}

export default route;
