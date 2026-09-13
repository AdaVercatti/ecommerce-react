import HomePage from './pages/HomePage'
import CheckoutPage from './pages/CheckoutPage'
import './App.css'
import {Routes,Route} from 'react-router'
function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<HomePage></HomePage>}></Route>
      <Route path='/checkout.html' element={<CheckoutPage></CheckoutPage>}></Route>
    </Routes>
    </>
  )
}

export default App
