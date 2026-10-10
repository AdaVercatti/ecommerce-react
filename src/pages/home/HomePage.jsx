import "./HomePage.css";

import { useEffect, useState } from "react";

import Header from "../components/Header";
import ProductsGrid from "./ProductsGrid";

import PropTypes from "prop-types";
import { useSearchParams } from "react-router";
import axios from "axios";

const HomePage = ({ cart, loadCart }) => {
  const [products, setProducts] = useState([]);

  const [searchParams] = useSearchParams();

  const search = searchParams.get("search") || "";

  useEffect(() => {
    const getHomeData = async () => {
      const url = search
        ? `/api/products?search=${encodeURIComponent(search)}`
        : "/api/products";

      const response = await axios.get(url);

      setProducts(response.data);
    };

    getHomeData();
  }, [search]);

  return (
    <>
      <header>Ecommerce Project</header>

      <Header cart={cart} />

      <div className="home-page">
        <ProductsGrid
          products={products}
          loadCart={loadCart}
        />
      </div>
    </>
  );
};

HomePage.propTypes = {
  cart: PropTypes.array.isRequired,
  loadCart: PropTypes.func.isRequired,
};

export default HomePage;