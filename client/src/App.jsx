import React from 'react'
import { useState } from 'react'
import {BrowserRouter,Routes, Route} from 'react-router-dom'

import LandingPage from "./pages/LandingPage"
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import ProductPage from './pages/ProductPage'



import Category from './pages/Category'
import Cart from './pages/Cart'
import Profile from './pages/Profile'
import OrdersPage from './pages/OrdersPage'
import AddProductForm from './pages/AddProductForm'
import Wishlist from './pages/Wishlist'
import ProductData from './components/ProductData'
import BuyNow from './pages/BuyNow'


const App = () => {
  return (
    <BrowserRouter>
      <ProductData>
        <Routes>
          <Route path='/sign-in' element={<SignIn/>}/>
          <Route path='/sign-up' element={<SignUp/>}/>
          <Route path='/' element={<LandingPage/>}/>
          <Route path="/product/:id" element={<ProductPage/>} />
          <Route path="/profile" element={<Profile/>} />

          <Route path="/admin/addProducts" element={<AddProductForm/>} />

          <Route path="/Cart" element={<Cart userId="nakul" productId="book" quantity={1} />} />

          <Route path="/Category/:category" element={<Category />} />
          <Route path="/Category/:category/:type" element={<Category />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist/>} />
          <Route path="/orders" element={<OrdersPage/>} />
          <Route path="/buynow" element={<BuyNow/>} />
        </Routes>
      </ProductData>
    </BrowserRouter>
  )
}

export default App;




