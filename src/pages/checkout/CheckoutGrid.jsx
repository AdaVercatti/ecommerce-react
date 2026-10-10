import PropTypes from "prop-types";
import OrderSummary from "./OrderSummary";
import PaymentSummary from "./PaymentSummary";

const CheckoutGrid = ({
  deliveryOptions,
  paymentSummary,
  cart,
  navigate,
  loadCart
}) => {
  return (
    <div className="checkout-grid">
      <OrderSummary
        deliveryOptions={deliveryOptions}
        cart={cart}
        loadCart={loadCart}
      />

      <PaymentSummary
        paymentSummary={paymentSummary}
        navigate={navigate}
        loadCart={loadCart}
      />
    </div>
  );
};

CheckoutGrid.propTypes = {
  deliveryOptions: PropTypes.array.isRequired,
  paymentSummary: PropTypes.object.isRequired,
  cart: PropTypes.array.isRequired,
  navigate: PropTypes.func.isRequired,
  loadCart: PropTypes.func.isRequired
};

export default CheckoutGrid;
