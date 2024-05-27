import React, { useState,useEffect } from 'react';
import { IoIosArrowForward,IoIosArrowBack  } from "react-icons/io";
import { Link } from 'react-router-dom';


const Carousel = ({ children }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const childrenArray = React.Children.toArray(children);

  useEffect(() => {
    // Reset currentIndex to 0 when children change to ensure it starts from the beginning
    setCurrentIndex(0);
  }, [children]);

const prevItemIndex = (prevIndex) => (prevIndex === 0 ? 0 : prevIndex - 1);
const nextItemIndex = (prevIndex) => Math.min(prevIndex + 1, childrenArray.length - 1);


  const goToPrev = () => {
    setCurrentIndex(prevItemIndex);
    console.log(prevItemIndex);
  };

  const goToNext = () => {
    setCurrentIndex(nextItemIndex);
    console.log(nextItemIndex);
  };

  return (
  <div>

    <div className="overflow-hidden relative">
     
    <div className="overflow-hidden">
       <ul className="flex transition-transform duration-300 ease-in-out" style={{
    transform: `translateX(-${currentIndex * 50}%)`, // Default translation for md and below
    '@screen lg': {
      transform: `translateX(-${currentIndex * 100}%)`, // Translation for lg and above
    }
    }}>

        {childrenArray.map((child, index) => (
          <li
            key={index}
            className="flex-shrink-0 relative" // Use Tailwind CSS classes for width
          >
            {child}
          </li>
        ))}
      </ul>


      {currentIndex !== 0 && (
          <div className="absolute top-1/2 left-0 transform -translate-y-1/2">
    <button
      onClick={goToPrev}
      className="bg-gray-800 text-white rounded-full p-2 z-50 hover:bg-gray-400 hover:text-black"
    >
      <IoIosArrowBack/>
    </button>
  </div>
      )}
      {currentIndex !== childrenArray.length - 1 && (
       <div className="absolute top-1/2 right-0 transform -translate-y-1/2"> 
    <button
      onClick={goToNext}
      className="bg-gray-800 text-white rounded-full p-2 hover:bg-gray-400 hover:text-black"
    >
      <IoIosArrowForward/>
    </button>
  </div>
      )}
</div>
</div>
</div>
  );
};

export default Carousel;
