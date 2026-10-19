import axios from "axios";
import moneyFormat from "../../utils/money";
import PropTypes from "prop-types";

const PaymentSummary = ({ paymentSummary, navigate ,loadCart}) => {
  return (
    <div className="payment-summary">
      <div className="payment-summary-title">
        Payment Summary
      </div>

      <div className="payment-summary-row">
        <div>Items ({paymentSummary.totalItems}):</div>

        <div className="payment-summary-money">
          ${moneyFormat(paymentSummary.productCostCents)}
        </div>
      </div>

      <div className="payment-summary-row">
        <div>Shipping &amp; handling:</div>

        <div className="payment-summary-money">
          ${moneyFormat(paymentSummary.shippingCostCents)}
        </div>
      </div>

      <div className="payment-summary-row subtotal-row">
        <div>Total before tax:</div>

        <div className="payment-summary-money">
          ${moneyFormat(paymentSummary.totalCostBeforeTaxCents)}
        </div>
      </div>

      <div className="payment-summary-row">
        <div>Estimated tax (10%):</div>

        <div className="payment-summary-money">
          ${moneyFormat(paymentSummary.taxCents)}
        </div>
      </div>

      <div className="payment-summary-row total-row">
        <div>Order total:</div>

        <div className="payment-summary-money">
          ${moneyFormat(paymentSummary.totalCostCents)}
        </div>
      </div>

      <button
        data-testid="place-your-order-button"
        onClick={async() =>{
          await axios.post('/api/orders')
          await loadCart()
          navigate("/orders")
        }
           }
        className="place-order-button button-primary"
      >
        Place your order
      </button>
    </div>
  );
};

PaymentSummary.propTypes = {
  paymentSummary: PropTypes.object.isRequired,
  navigate: PropTypes.func.isRequired,
  loadCart: PropTypes.func.isRequired
};

export default PaymentSummary;