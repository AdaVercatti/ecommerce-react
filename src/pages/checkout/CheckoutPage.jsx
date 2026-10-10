import "./CheckoutPage.css";
import "./checkout-header.css";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import axios from "axios";
import CheckoutGrid from "./CheckoutGrid";

const CheckoutPage = ({ cart , loadCart}) => {
  const [deliveryOptoins, setDeliveryOptions] = useState([]);
  const [paymentSummary,setPaymentSummary] = useState({})

  useEffect(() => {
    const getCeckoutData = async () =>{
      let response = await axios.get("/api/delivery-options?expand=estimatedDeliveryTime")
      setDeliveryOptions(response.data);
    }
    getCeckoutData()
  }, [cart]);

  useEffect(()=>{
    const  loadPaymentSum = async()=>{
      const response = await axios.get("/api/payment-summary")
       setPaymentSummary(response.data)
    }

    loadPaymentSum()
  },[cart])

  const navigate = useNavigate();
  return (
    <>
      <header>Checkout</header>
      <Header cart={cart}></Header>
      <div className="checkout-page">
        <div className="page-title">Review your order</div>
        <CheckoutGrid deliveryOptions={deliveryOptoins} paymentSummary={paymentSummary} cart={cart} navigate={navigate} loadCart={loadCart}></CheckoutGrid>
      </div>
    </>
  );
};

CheckoutPage.propTypes = {
  cart: PropTypes.array.isRequired,
  loadCart: PropTypes.func.isRequired
};

export default CheckoutPage;
