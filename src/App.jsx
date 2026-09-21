import HomePage from './pages/HomePage'
import CheckoutPage from './pages/CheckoutPage'
import './App.css'
import {Routes,Route} from 'react-router'
import OrdersPage from './pages/OrdersPage'
import TrackingPage from './pages/TrackingPage'
import { useState, useEffect } from 'react'
import axios from 'axios'
function App() {
  const [cart,setCart] = useState([])
  useEffect(()=>{
    axios.get('api/cart-items?expand=product').then((response)=>{
      setCart(response.data)
    })
  },[])
  return (
    <>
    <Routes>
      <Route path='/' element={<HomePage cart={cart}></HomePage>}></Route>
      <Route path='/checkout' element={<CheckoutPage cart={cart}></CheckoutPage>}></Route>
      <Route path='/orders' element={<OrdersPage></OrdersPage>}></Route>
      <Route path='/tracking' element={<TrackingPage></TrackingPage>}></Route>
      <Route path='*' element='404 page not found'></Route>
    </Routes>
    </>
  )
}

export default App
