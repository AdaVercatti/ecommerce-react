import Header from "../components/Header";
import "./OrdersPage.css";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useState, useEffect, Fragment } from "react";
import axios from "axios";
import dayjs from "dayjs";
import moneyFormat from "../../utils/money";

const OrdersPage = ({ cart, loadCart }) => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrdersData = async () => {
      try {
        const response = await axios.get("/api/orders?expand=products");
        setOrders(response.data);
      } catch (error) {
        console.error("Failed to get orders:", error);
      }
    };

    getOrdersData();
  }, []);

  const handleAddToCart = async (productId) => {
    try {
      await axios.post("/api/cart-items", {
        productId: productId,
        quantity: 1,
      });

      await loadCart();
    } catch (error) {
      console.error("Failed to add product to cart:", error);
    }
  };

  return (
    <>
      <Header cart={cart} />

      <header>Orders</header>

      <div className="orders-page">
        <div className="page-title">Your Orders</div>

        <div className="orders-grid">
          {orders.map((order) => (
            <div key={order.id} className="order-container">
              <div className="order-header">
                <div className="order-header-left-section">
                  <div className="order-date">
                    <div className="order-header-label">
                      Order Placed:
                    </div>

                    <div>
                      {dayjs(order.orderTimeMs).format("MMMM D")}
                    </div>
                  </div>

                  <div className="order-total">
                    <div className="order-header-label">
                      Total:
                    </div>

                    <div>
                      ${moneyFormat(order.totalCostCents)}
                    </div>
                  </div>
                </div>

                <div className="order-header-right-section">
                  <div className="order-header-label">
                    Order ID:
                  </div>

                  <div>{order.id}</div>
                </div>
              </div>

              <div className="order-details-grid">
                {order.products.map((orderProduct) => (
                  <Fragment
                    key={`${order.id}-${orderProduct.productId}`}
                  >
                    <div className="product-image-container">
                      <img
                        src={orderProduct.product.image}
                        alt={orderProduct.product.name}
                      />
                    </div>

                    <div className="product-details">
                      <div className="product-name">
                        {orderProduct.product.name}
                      </div>

                      <div className="product-delivery-date">
                        Arriving on:{" "}
                        {dayjs(
                          orderProduct.estimatedDeliveryTimeMs
                        ).format("MMMM D")}
                      </div>

                      <div className="product-quantity">
                        Quantity: {orderProduct.quantity}
                      </div>

                      <button
                        className="buy-again-button button-primary"
                        onClick={() =>
                          handleAddToCart(orderProduct.productId)
                        }
                      >
                        <img
                          className="buy-again-icon"
                          src="images/icons/buy-again.png"
                          alt=""
                        />

                        <span className="buy-again-message">
                          Add to Cart
                        </span>
                      </button>
                    </div>

                    <div className="product-actions">
                      <button
                        type="button"
                        className="track-package-button button-secondary"
                        onClick={() =>
                          navigate(
                            `/tracking/${order.id}/${orderProduct.productId}`
                          )
                        }
                      >
                        Track package
                      </button>
                    </div>
                  </Fragment>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

OrdersPage.propTypes = {
  cart: PropTypes.array.isRequired,
  loadCart: PropTypes.func.isRequired,
};

export default OrdersPage;