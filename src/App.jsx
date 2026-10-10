import HomePage from "./pages/home/HomePage";
import CheckoutPage from "./pages/checkout/CheckoutPage";
import "./App.css";
import { Routes, Route } from "react-router";
import OrdersPage from "./pages/Orders/OrdersPage";
import TrackingPage from "./pages/Tracking/TrackingPage";
import { useState, useEffect } from "react";
import axios from "axios";
function App() {
  window.axios = axios
  const [cart, setCart] = useState([]);
  const loadCart = async () => {
    const response = await axios.get("/api/cart-items?expand=product");
    setCart(response.data);
  };
  useEffect(() => {
    loadCart();
  }, []);
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<HomePage cart={cart} loadCart={loadCart}></HomePage>}
        ></Route>
        <Route
          path="/checkout"
          element={<CheckoutPage cart={cart} loadCart={loadCart}></CheckoutPage>}
        ></Route>
        <Route
          path="/orders"
          element={<OrdersPage cart={cart} loadCart={loadCart}></OrdersPage>}
        ></Route>
        <Route
          path="/tracking/:orderId/:productId"
          element={<TrackingPage cart={cart}></TrackingPage>}
        ></Route>
        <Route path="*" element="404 page not found"></Route>
      </Routes>
    </>
  );
}

export default App;
