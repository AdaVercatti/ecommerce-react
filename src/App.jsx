import HomePage from './pages/HomePage'
import CheckoutPage from './pages/CheckoutPage'
import './App.css'
import {Routes,Route} from 'react-router'
import OrdersPage from './pages/OrdersPage'
function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<HomePage></HomePage>}></Route>
      <Route path='/checkout' element={<CheckoutPage></CheckoutPage>}></Route>
      <Route path='/orders' element={<OrdersPage></OrdersPage>}></Route>
    </Routes>
    </>
  )
}

export default App
