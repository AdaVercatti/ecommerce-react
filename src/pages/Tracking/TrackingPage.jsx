import Header from "../components/Header";
import "./TrackingPage.css";
import PropTypes from "prop-types";
import { useParams } from "react-router";
import axios from "axios";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

const TrackingPage = ({ cart }) => {
  const { orderId, productId } = useParams();

  const [order, setOrder] = useState(null);

  useEffect(() => {
    const getTrackingData = async () => {
      const response = await axios.get(
        `/api/orders/${orderId}?expand=products`
      );

      setOrder(response.data);
    };

    getTrackingData();
  }, [orderId]);

  if (!order) {
    return <div>Loading...</div>;
  }

  const orderProduct = order.products.find((product) => {
    return product.productId === productId;
  });

  if (!orderProduct) {
    return <div>Product not found</div>;
  }

  // Total delivery time
  const totalDeliveryTimeMs =
    orderProduct.estimatedDeliveryTimeMs - order.orderTimeMs;

  // Time passed since order was placed
  const timePassedMs = dayjs().valueOf() - order.orderTimeMs;

  // Delivery progress percentage
  const deliveryPercent = Math.min(
    100,
    Math.max(0, (timePassedMs / totalDeliveryTimeMs) * 100)
  );

  // Current delivery status
  const isPreparing = deliveryPercent < 33;

  const isShipped =
    deliveryPercent >= 33 && deliveryPercent < 100;

  const isDelivered = deliveryPercent >= 100;

  return (
    <>
      <Header cart={cart} />

      <div className="tracking-page">
        <div className="order-tracking">

          <a
            className="back-to-orders-link link-primary"
            href="/orders"
          >
            View all orders
          </a>

          <div className="delivery-date">
            {isDelivered ? "Delivered on " : "Arriving on "}
            {dayjs(orderProduct.estimatedDeliveryTimeMs).format(
              "dddd, MMMM D"
            )}
          </div>

          <div className="product-info">
            {orderProduct.product.name}
          </div>

          <div className="product-info">
            Quantity: {orderProduct.quantity}
          </div>

          <img
            className="product-image"
            src={`/${orderProduct.product.image}`}
            alt={orderProduct.product.name}
          />

          <div className="progress-labels-container">

            <div
              className={`progress-label ${
                isPreparing ? "current-status" : ""
              }`}
            >
              Preparing
            </div>

            <div
              className={`progress-label ${
                isShipped ? "current-status" : ""
              }`}
            >
              Shipped
            </div>

            <div
              className={`progress-label ${
                isDelivered ? "current-status" : ""
              }`}
            >
              Delivered
            </div>

          </div>

          <div className="progress-bar-container">
            <div
              className="progress-bar"
              style={{
                width: `${deliveryPercent}%`,
              }}
            />
          </div>

        </div>
      </div>
    </>
  );
};

TrackingPage.propTypes = {
  cart: PropTypes.array.isRequired,
};

export default TrackingPage;