import dayjs from "dayjs";
import PropTypes from "prop-types";
import axios from "axios";
import { useState } from "react";

import moneyFormat from "../../utils/money";
import DeliveryOptions from "./DeliveryOptions";

const CartItemDetails = ({
  cartItem,
  deliveryOptions,
  loadCart,
}) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const [quantity, setQuantity] = useState(cartItem.quantity);

  const selectedDeliveryOption = deliveryOptions.find(
    (deliveryOption) =>
      deliveryOption.id === cartItem.deliveryOptionId
  );

  const handleUpdate = async () => {
    const newQuantity = Number(quantity);

    if (newQuantity < 1) {
      return;
    }

    await axios.put(
      `/api/cart-items/${cartItem.productId}`,
      {
        quantity: newQuantity,
      }
    );

    await loadCart();

    setIsUpdating(false);
  };

  const handleDelete = async () => {
    await axios.delete(
      `/api/cart-items/${cartItem.productId}`
    );

    await loadCart();
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleUpdate();
    }

    if (event.key === "Escape") {
      setQuantity(cartItem.quantity);
      setIsUpdating(false);
    }
  };

  return (
    <div className="cart-item-container">
      <div className="delivery-date">
        Delivery date:{" "}
        {selectedDeliveryOption &&
          dayjs(
            selectedDeliveryOption.estimatedDeliveryTimeMs
          ).format("dddd, MMMM D")}
      </div>

      <div className="cart-item-details-grid">
        <img
          className="product-image"
          src={cartItem.product.image}
          alt={cartItem.product.name}
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

              {isUpdating ? (
                <input
                  className="update-input"
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(event) =>
                    setQuantity(event.target.value)
                  }
                  onKeyDown={handleKeyDown}
                  style={{ width: "50px" }}
                  autoFocus
                />
              ) : (
                <span className="quantity-label">
                  {cartItem.quantity}
                </span>
              )}
            </span>

            <span
              className="update-quantity-link link-primary"
              onClick={() => {
                if (isUpdating) {
                  handleUpdate();
                } else {
                  setQuantity(cartItem.quantity);
                  setIsUpdating(true);
                }
              }}
            >
              {isUpdating ? "Save" : "Update"}
            </span>

            <span
              className="delete-quantity-link link-primary"
              onClick={handleDelete}
            >
              Delete
            </span>
          </div>
        </div>

        <DeliveryOptions
          deliveryOptions={deliveryOptions}
          cartItem={cartItem}
          loadCart={loadCart}
        />
      </div>
    </div>
  );
};

CartItemDetails.propTypes = {
  cartItem: PropTypes.object.isRequired,
  deliveryOptions: PropTypes.array.isRequired,
  loadCart: PropTypes.func.isRequired,
};

export default CartItemDetails;