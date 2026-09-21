import "./CheckoutPage.css";
import "./checkout-header.css";
import Header from "./components/Header";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import moneyFormat from "../utils/money";
import { useState, useEffect } from "react";
import axios from "axios";
import dayjs from 'dayjs'

const CheckoutPage = ({ cart }) => {
  const [deliveryOptoins, setDeliveryOptions] = useState([]);

  useEffect(() => {
    axios.get("api/delivery-options").then((response) => {
      setDeliveryOptions(response.data);
    });
  }, []);
  const navigate = useNavigate();
  console.log(cart);
  return (
    <>
      <header>Checkout</header>
      <Header cart={cart}></Header>
      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <div className="order-summary">
            {cart.map((cartItem) => {
              return (
                <div key={cartItem.id} className="cart-item-container">
                  <div className="delivery-date">
                    Delivery date: Tuesday, June 21
                  </div>

                  <div className="cart-item-details-grid">
                    <img
                      className="product-image"
                      src={cartItem.product.image}
                    />

                    <div className="cart-item-details">
                      <div className="product-name">
                        {cartItem.product.name}
                      </div>
                      <div className="product-price">
                        ${moneyFormat(cartItem.product.priceCents)}
                      </div>
                      <div className="product-quantity">
                        <span>
                          Quantity:{" "}
                          <span className="quantity-label">
                            {cartItem.quantity}
                          </span>
                        </span>
                        <span className="update-quantity-link link-primary">
                          Update
                        </span>
                        <span className="delete-quantity-link link-primary">
                          Delete
                        </span>
                      </div>
                    </div>

                    <div className="delivery-options">
                      <div className="delivery-options-title">
                        Choose a delivery option:
                      </div>
                      {deliveryOptoins.map((deliveryOptoin) => {
                        let price = 'FREE'
                        const today = dayjs();

                        const date = today.add(deliveryOptoin.deliveryDays, 'day');
                        
                        if(deliveryOptoin.priceCents > 0){
                          price = '$' + moneyFormat(deliveryOptoin.priceCents) + ' -'
                        }
                        return (
                          <div className="delivery-option" key={deliveryOptoin.id}>
                            <input
                              type="radio"
                              checked = {cartItem.deliveryOptionId === deliveryOptoin.id}
                              className="delivery-option-input"
                              name={`delivery-option-${cartItem.productId}`}
                            />
                            <div>
                              <div className="delivery-option-date">
                                {date.format('dddd, MMMM D')}
                              </div>
                              <div className="delivery-option-price">
                                 {price} Shipping
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="payment-summary">
            <div className="payment-summary-title">Payment Summary</div>

            <div className="payment-summary-row">
              <div>Items (3):</div>
              <div className="payment-summary-money">$42.75</div>
            </div>

            <div className="payment-summary-row">
              <div>Shipping &amp; handling:</div>
              <div className="payment-summary-money">$4.99</div>
            </div>

            <div className="payment-summary-row subtotal-row">
              <div>Total before tax:</div>
              <div className="payment-summary-money">$47.74</div>
            </div>

            <div className="payment-summary-row">
              <div>Estimated tax (10%):</div>
              <div className="payment-summary-money">$4.77</div>
            </div>

            <div className="payment-summary-row total-row">
              <div>Order total:</div>
              <div className="payment-summary-money">$52.51</div>
            </div>

            <button
              onClick={() => navigate("/orders")}
              className="place-order-button button-primary"
            >
              Place your order
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

CheckoutPage.propTypes = {
  cart: PropTypes.array.isRequired,
};

export default CheckoutPage;
