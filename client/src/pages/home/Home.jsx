import React, { useEffect } from 'react';
import MouseOutlinedIcon from '@mui/icons-material/MouseOutlined';
import ProductCard from '../../components/productCard/ProductCard';
import MetaData from '../../components/layout/metaData/MetaData';
import Loader from '../../components/layout/loader/Loader';
import { clearErrors, getProduct } from '../../redux/action/productAction';
import { useSelector, useDispatch } from 'react-redux';
import { useAlert } from 'react-alert';
import './Home.css';

const Home = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, error, products } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, error, alert]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="ECOMMERCE" />
          <div className="banner">
            <p>Welcome to Ecommerce</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>

            <a href="#container">
              <button>
                Scroll <MouseOutlinedIcon />
              </button>
            </a>
          </div>

          <h2 className="homeHeading">Featured Products</h2>

          <div className="container" id="container">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>
        </>
      )}
    </>
  );
};

export default Home;
