import React, { useState, useEffect} from 'react';
import CartButton from '../CartButton';
import { MdKeyboardArrowDown, MdOutlineKeyboardArrowUp } from "react-icons/md";
import { useSelector } from 'react-redux';
import { FaRegHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import LikeButton from '../LikeButton';
import ProductDetailComponent from './ProductDetailComponent';


export default function ProductImages({ mainImgs,productId,price,discount }) {
  const [selectedImage, setSelectedImage] = useState(mainImgs[0]);
  const { currentUser } = useSelector((state) => state.user);
  const [startIndex, setStartIndex] = useState(0);
  const navigate = useNavigate(); // Initialize useNavigate
  var discountFraction = discount / 100;
  var discountPrice =Math.floor(price - (discountFraction * price));
  
    useEffect(() => {
    // Reset selected image and start index when mainImgs changes
    setSelectedImage(mainImgs[0]);
    setStartIndex(0);
  }, [mainImgs]);

  const handlePreviousClick = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 5);
    }
  };

  const handleNextClick = () => {
    if (startIndex + 5 < mainImgs.length) {
      setStartIndex(startIndex + 5);
    }
  };

  const handleCartButtonClick = () => {
    if (currentUser && currentUser.user && currentUser.user._id) {
      // If user is logged in
      // Perform the cart action
    } else {
      // If user is not logged in, redirect to sign-in page
      navigate('/sign-in'); // Redirect to sign-in page
    }
  };


  return (
    <div className='2xl:w-[80rem] md:h-full my-5 py-20 bg-gray-50 flex flex-col space-y-20'>
      <div>
        <div className='p-3 md:flex justify-center items-center'>
          <div className='bg-gray-200  md:block flex justify-center md:w-22 h-full bg-opacity-85  '>
            {mainImgs
              .slice(startIndex, startIndex + 5)
              .map((imageUrls, index) => (
                <div
                  key={index}
                  className='bg-white md:my-4 md:mx-0 mx-4 flex justify-center items-center  h-20 w-20 cursor-pointer'
                  onClick={() => setSelectedImage(imageUrls)}
                >
                  <img
                    src={`http://127.0.0.1:5000/static/imgs/${imageUrls}`}
                    alt={`Image ${index}`}
                    className='w-20 h-20 object-contain hover:scale-105 transition-transform duration-500'
                  />
                </div>
              ))}

            <div className='relative'>
              {startIndex > 0 && (
                <button className='h-6 w-20 bg-gray-300 flex justify-center items-center absolute bottom-[12rem]' onClick={handlePreviousClick}>
                  <MdOutlineKeyboardArrowUp />
                </button>
              )}

              {startIndex + 5 < mainImgs.length && (
                <button className='h-6 w-20 bg-gray-300 flex justify-center items-center absolute bottom-0 top-1' onClick={handleNextClick}>
                  <MdKeyboardArrowDown />
                </button>
              )}
            </div>
          </div>

          <div className='w-full'>
            <ProductDetailComponent  
              selectedImage={selectedImage} 
              setSelectedImage={setSelectedImage} 
              currentUser={currentUser} 
              mainImgs={mainImgs} 
              productId={productId}
              price={discountPrice}
              />

            <div className='my-6 p-4 flex justify-center'>
                {currentUser && currentUser.user && currentUser.user._id ? (
                  <CartButton 
                    productId={productId} 
                    userId={currentUser.user._id} 
                    price={discountPrice}
                    onClick={handleCartButtonClick}

                    
                    />
                ) : (
                  <button onClick={() => navigate('/sign-in')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Sign In to Add to Cart
                  </button>
                )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
