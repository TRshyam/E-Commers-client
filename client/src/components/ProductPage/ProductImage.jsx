import React, { useState } from 'react';
import CartButton from '../CartButton';
import { MdKeyboardArrowDown, MdOutlineKeyboardArrowUp } from "react-icons/md";

export default function ProductImages({ mainImgs }) {
  const [selectedImage, setSelectedImage] = useState(mainImgs[0]); // Set initial selected image to the first image in the array

  const [startIndex, setStartIndex] = useState(0);

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

  return (
    <div className='w-full my-5 py-20 bg-gray-50 h-full flex flex-col space-y-20'>
      <div>
        <div className='p-3 flex'>
          <div className='bg-gray-100 w-20 grid gap-1'>
            {mainImgs
              .slice(startIndex, startIndex + 5)
              .map((imageUrls, index) => (
                <div
                  key={index}
                  className='bg-white flex justify-center items-center h-20 w-20'
                  onClick={() => setSelectedImage(imageUrls)}
                >
                  <img
                    src={imageUrls} // Access the image URL directly from the array
                    alt={`Image ${index}`}
                    className='h-[60%] hover:scale-105 transition-transform duration-500'
                  />
                </div>
              ))}
              
              <div className='relative'>
                  {startIndex > 0 && (
                    <button className='h-6 w-20 bg-gray-300 flex justify-center items-center absolute bottom-[28rem]' onClick={handlePreviousClick}>
                      <MdOutlineKeyboardArrowUp />
                    </button>
                  )}

                  {startIndex + 5 < mainImgs.length && (
                    <button className='h-6 w-20 bg-gray-300 flex justify-center items-center absolute bottom-0' onClick={handleNextClick}>
                      <MdKeyboardArrowDown />
                    </button>
                  )}
              </div>
          </div>
          <div className='bg-white p-4 m-2 w-full flex justify-center flex-grow'>
            <div>
              {selectedImage && (
                <img src={selectedImage} alt={`Selected Image`} className='w-full h-full bg-slate-400 hover:scale-105 transition-transform duration-500' />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className='my-6 p-4 flex justify-center'>
        <CartButton />
      </div>
    </div>
  );
}
