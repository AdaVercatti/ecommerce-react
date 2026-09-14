import HomePage from './pages/HomePage'
import CheckoutPage from './pages/CheckoutPage'
import './App.css'
import {Routes,Route} from 'react-router'
import OrdersPage from './pages/OrdersPage'
import TrackingPage from './pages/TrackingPage'
function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<HomePage></HomePage>}></Route>
      <Route path='/checkout' element={<CheckoutPage></CheckoutPage>}></Route>
      <Route path='/orders' element={<OrdersPage></OrdersPage>}></Route>
      <Route path='/tracking' element={<TrackingPage></TrackingPage>}></Route>
      <Route path='*' element='404 page not found'></Route>
    </Routes>
    </>
  )
}

export default App
