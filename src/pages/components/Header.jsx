import "./Header.css";

import { Link, useNavigate } from "react-router";
import PropTypes from "prop-types";
import { useState } from "react";

const Header = ({ cart }) => {
  let totalItem = 0;

  cart.forEach((cartItem) => {
    totalItem += cartItem.quantity;
  });

  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const handleSearch = () => {
    if (search.trim()) {
      navigate(`/?search=${encodeURIComponent(search.trim())}`);
    } else {
      navigate("/");
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <>
      <div className="header">
        <div className="left-section">
          <Link to="/" className="header-link">
            <img
              className="logo"
              src="/images/logo-white.png"
              alt="Logo"
            />

            <img
              className="mobile-logo"
              src="/images/mobile-logo-white.png"
              alt="Mobile Logo"
            />
          </Link>
        </div>

        <div className="middle-section">
          <input
            className="search-bar"
            type="text"
            placeholder="Search"
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
            }}
            onKeyDown={handleKeyDown}
          />

          <button
            className="search-button"
            onClick={handleSearch}
          >
            <img
              className="search-icon"
              src="/images/icons/search-icon.png"
              alt="Search"
            />
          </button>
        </div>

        <div className="right-section">
          <Link
            className="orders-link header-link"
            to="/orders"
          >
            <span className="orders-text">
              Orders
            </span>
          </Link>

          <Link
            className="cart-link header-link"
            to="/checkout"
          >
            <img
              className="cart-icon"
              src="/images/icons/cart-icon.png"
              alt="Cart"
            />

            <div className="cart-quantity">
              {totalItem}
            </div>

            <div className="cart-text">
              Cart
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

Header.propTypes = {
  cart: PropTypes.array.isRequired,
};

export default Header;