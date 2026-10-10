import PropTypes from "prop-types";
import CartItemDetails from "./CartItemDetails";

const OrderSummary = ({ deliveryOptions, cart, loadCart }) => {
  return (
    <div className="order-summary">
      {deliveryOptions.length > 0 &&
        cart.map((cartItem) => (
          <CartItemDetails
            key={cartItem.id}
            cartItem={cartItem}
            deliveryOptions={deliveryOptions}
            loadCart={loadCart}
          />
        ))}
    </div>
  );
};

OrderSummary.propTypes = {
  deliveryOptions: PropTypes.array.isRequired,
  cart: PropTypes.array.isRequired,
  loadCart: PropTypes.func.isRequired,
};

export default OrderSummary;