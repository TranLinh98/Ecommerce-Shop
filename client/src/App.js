import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import WebFont from 'webfontloader';
import './App.css';
import Footer from './components/layout/footer/Footer';
import Header from './components/layout/header/Header.jsx';
import Search from './components/search/Search';
import Home from './pages/home/Home';
import ProductDetails from './pages/productDetails/ProductDetails';
import ProductList from './pages/productList/ProductList';
import LoginSignup from './pages/LoginSignUp/LoginSignup';
import store from './redux/store';
import { loadUser } from './redux/action/userAction';
import { useSelector } from 'react-redux';
import UserOptions from './components/userOptions/UserOptions';
import ProtectedRoute from './hoc/route/ProtectedRoute';
import Cart from './pages/cart/Cart';
import Shipping from './pages/shipAndPayment/shipping/Shipping';
import Profile from './pages/user/userProfile/Profile';
import UpdateProfile from './pages/user/userUpdateProfile/UpdateProfile';
import UpdatePassword from './pages/user/updatePassword/UpdatePassword';
import ConfirmOrder from './pages/shipAndPayment/confirmOrder/ConfirmOrder';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Payment from './pages/shipAndPayment/payment/Payment';
import OrderSuccess from './pages/shipAndPayment/orderSuccess/OrderSuccess';
import MyOrders from './pages/order/myOrders/MyOrders';
import OrderDetails from './pages/order/orderDetails/OrderDetails';
import Dashboard from './pages/admin/dashboard/Dashboard';
import ProductListAd from './pages/admin/productListAd/ProductListAd';
import NewProduct from './pages/admin/newProduct/NewProduct';
import UpdateProduct from './pages/admin/updateProduct/UpdateProduct';
import OrderList from './pages/admin/orderList/OrderList';
import ProcessOrder from './pages/admin/processOrder/ProcessOrder';
import UsersList from './pages/admin/usersList/UsersList';
import UpdateUser from './pages/admin/updateUser/UpdateUser';
import ProductReviews from './pages/admin/productReviews/ProductReviews';
import NotFound from './components/layout/notFound/NotFound';
import paymentApi from './api/paymentApi';

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [stripeApiKey, setStripeApiKey] = useState('');

  async function getStripeApiKey() {
    const data = await paymentApi.getStripeApiKey();

    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Roboto', 'Droid Sans', 'Chilanka'],
      },
    });

    store.dispatch(loadUser());

    getStripeApiKey();
  }, []);

  return (
    <div className="App">
      <Router>
        <Header />

        {isAuthenticated && <UserOptions user={user} />}

        {stripeApiKey && (
          <Elements stripe={loadStripe(stripeApiKey)}>
            <ProtectedRoute exact path="/process/payment" component={Payment} />
          </Elements>
        )}

        <Switch>
          <Route exact path={'/'} component={Home} />

          <Route exact path={'/product/:id'} component={ProductDetails} />

          <Route exact path={'/products'} component={ProductList} />

          <Route path={'/products/:keyword'} component={ProductList} />

          <Route exact path={'/search'} component={Search} />

          <ProtectedRoute exact path="/account" component={Profile} />

          <ProtectedRoute exact path="/me/update" component={UpdateProfile} />

          <ProtectedRoute
            exact
            path="/password/update"
            component={UpdatePassword}
          />

          <Route exact path={'/login'} component={LoginSignup} />

          <Route exact path={'/cart'} component={Cart} />

          <ProtectedRoute exact path="/shipping" component={Shipping} />

          <ProtectedRoute
            exact
            path="/order/confirm"
            component={ConfirmOrder}
          />

          <ProtectedRoute exact path="/success" component={OrderSuccess} />

          <ProtectedRoute exact path="/orders" component={MyOrders} />

          <ProtectedRoute exact path="/order/:id" component={OrderDetails} />

          <ProtectedRoute
            isAdmin={true}
            exact
            path="/admin/dashboard"
            component={Dashboard}
          />

          <ProtectedRoute
            exact
            path="/admin/products"
            isAdmin={true}
            component={ProductListAd}
          />

          <ProtectedRoute
            exact
            path="/admin/product"
            isAdmin={true}
            component={NewProduct}
          />

          <ProtectedRoute
            exact
            path="/admin/product/:id"
            isAdmin={true}
            component={UpdateProduct}
          />

          <ProtectedRoute
            exact
            path="/admin/orders"
            isAdmin={true}
            component={OrderList}
          />

          <ProtectedRoute
            exact
            path="/admin/order/:id"
            isAdmin={true}
            component={ProcessOrder}
          />

          <ProtectedRoute
            exact
            path="/admin/users"
            isAdmin={true}
            component={UsersList}
          />

          {/* Update role for user */}
          <ProtectedRoute
            exact
            path="/admin/user/:id"
            isAdmin={true}
            component={UpdateUser}
          />

          <ProtectedRoute
            exact
            path="/admin/reviews"
            isAdmin={true}
            component={ProductReviews}
          />

          <Route
            component={
              window.location.pathname === '/process/payment' ? null : NotFound
            }
          />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
