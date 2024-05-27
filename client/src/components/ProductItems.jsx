import React, { useState, useEffect } from 'react';
import Card from './Cards/Card';
import AdCard from './Cards/AdCard';
import Pot1 from '../assets/CardItems/Pot/Pot-1.jpg'
import Pot2 from '../assets/CardItems/Pot/Pot-2.jpg'
import Pot3 from '../assets/CardItems/Pot/Pot-3.jpg'
import Pot4 from '../assets/CardItems/Pot/Pot-4.jpg'
import Pot5 from '../assets/CardItems/Pot/Pot-5.jpeg'
import Pot6 from '../assets/CardItems/Pot/Pot-6.jpeg'
import Sofa1 from '../assets/CardItems/Sofa/Sofa-1.jpg'
import Sofa2 from '../assets/CardItems/Sofa/Sofa-2.png'
import Sofa3 from '../assets/CardItems/Sofa/Sofa-3.jpeg'
import Sofa4 from '../assets/CardItems/Sofa/Sofa-4.png'
import Sofa5 from '../assets/CardItems/Sofa/Sofa-5.png'
import Sofa6 from '../assets/CardItems/Sofa/Sofa-6.png'
// import cards from './cards'; // Importing the object-based data
// import Carousel from "react-multi-carousel";
// import "react-multi-carousel/lib/styles.css";
import { CollectionsBar } from './Collectionsbar';
import axios from 'axios';
// import ProCarousel from './carosel/ProCarousel';

import Carousel from './carousel/Carousel';

import { useData } from './ProductData';
import { categorizeCards } from '../utils/categorizeCards';





const SofaImages = [Sofa1, Sofa2, Sofa3, Sofa4, Sofa5, Sofa6];
const PotImages = [Pot1, Pot2, Pot3, Pot4, Pot5, Pot6];

export default function ProductItems() {


   

  
  const [cards, setCards] = useState([]);
  
  
  // to fetch from backend
  const { data,error } = useData();
  useEffect(() => {
    if (error){
      console.log(error);
    }
    setCards(data);
    console.log(data);
  }, [data]);

  // console.log(cards);

  
  
  
  // Separate Ad and item cards
const {adCards,itemCards,categories}=categorizeCards(cards)
// console.log(categories);
    


    // Render AdCardss for a specific category
const renderAdCards = (adCards, category) => {
  // console.log(category);
  // console.log(adCards);
  const filteredAdCards = Object.values(adCards).filter(card => card.category === category);
  
  return filteredAdCards.map((card) => {
    const { img, content, From, To } = card;
    return <AdCard key={card.id} bgGradientFrom={From} bgGradientTo={To} imageSrc={img} content={content} category={category} />;
  });
};

    
    // Render ItemCards for a specific category
    const renderItemCards = (itemCards, category) => {
      const filteredItemCards = Object.values(itemCards).filter(card => card.category === category);
      return filteredItemCards.map((card) => {
    const { _id, product_name, details } = card;
    return <Card key={_id} item={{ _id, product_name, details }} />;
  });
};


return (
  <div className='mx-0 md:mx-12'>
      <div className='mx-5 md:mx-0 '> {/* Added margin on mobile */}
        <div className='md:flex w-full'>
          <div className='w-full md:w-[30%] md:mr-4'> {/* Adjusted width and added margin right for spacing */}
            {renderAdCards(adCards,"Electronics")}
          </div>
          <div className=' w-full md:w-[70%] my-auto  '>
            <Carousel>
              {renderItemCards(itemCards,"Electronics")}
            </Carousel>
          </div>

        </div>
        <CollectionsBar Images={SofaImages} Text={"Sofa and Cusions"} root={"SofaBeds"} Offer={"20"} Category = {'furniture'} />
      </div>
      <div className='mx-5 md:mx-0 '> {/* Added margin on mobile */}
        <div className='md:flex w-full'>
          <div className=' w-full md:w-[70%] my-auto  '>
            <Carousel>
              {renderItemCards(itemCards,"Appliance")}
            </Carousel>
          </div>
          <div className='w-full md:w-[30%] md:mr-4'> {/* Adjusted width and added margin right for spacing */}
            {renderAdCards(adCards,"Appliance")}
          </div>

        </div>
        <CollectionsBar Images = {PotImages} root={"FlowerPots"} Text = {"Flower Pots"} Offer = {"40"} Category = {'electronic'}/>
      </div>
      <div className='mx-5 md:mx-0 '> {/* Added margin on mobile */}
        <div className='md:flex w-full'>
          <div className='w-full md:w-[30%] md:mr-4'> {/* Adjusted width and added margin right for spacing */}
            {renderAdCards(adCards,"Clothing")}
          </div>
          <div className=' w-full md:w-[70%] my-auto  '>
            <Carousel>
              {renderItemCards(itemCards,"Clothing")}
            </Carousel>
          </div>

        </div>
      </div>
  

    </div>
  );
}
