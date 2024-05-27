import React from 'react'
import Navbar from '../components/Navbar'
import Banner from '../components/Banner/Banner'
import ProductItems from '../components/ProductItems'
import Footer from '../components/Footer'
import OfferBar from '../components/Offerbar'
import Collection from '../components/Collection'



export default function LandingPage() {
  return (
    <> 
    <div className='bg-gray-50'>

        <OfferBar/>
        <Navbar/>
        <Banner/>
        <ProductItems/>
        {/* <Collection/> */}
        <Footer/>
    </div>
    </>
  )
}
