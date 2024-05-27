import { useState } from 'react';
import { FaRegHeart } from 'react-icons/fa';
import LikeButton from '../LikeButton';
import { useNavigate } from "react-router-dom"; // Import useNavigate


const ProductDetailComponent = ({ selectedImage, setSelectedImage, mainImgs, currentUser, productId }) => {
  const [startTouchX, setStartTouchX] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(mainImgs.indexOf(selectedImage));
    const navigate = useNavigate(); // Initialize useNavigate

  const handleTouchStart = (e) => {
    setStartTouchX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    const endTouchX = e.changedTouches[0].clientX;
    const swipeDistance = endTouchX - startTouchX;

    // Adjust the threshold value as needed for sensitivity
    const threshold = 50;

    if (swipeDistance > threshold) {
      // Swipe right, navigate to previous image
      if (selectedIndex > 0) {
        const newIndex = selectedIndex - 1;
        setSelectedIndex(newIndex);
        setSelectedImage(mainImgs[newIndex]);
      }
    } else if (swipeDistance < -threshold) {
      // Swipe left, navigate to next image
      if (selectedIndex < mainImgs.length - 1) {
        const newIndex = selectedIndex + 1;
        setSelectedIndex(newIndex);
        setSelectedImage(mainImgs[newIndex]);
      }
    }
  };

  return (
    <div className='bg-white md:p-4 md:m-2 w-full  md:h-[40rem] md:flex md:flex-col md:justify-center items-center'>
      <div className='relative z-20 md:left-[40%] left-[80%] '>
        {currentUser && currentUser.user && currentUser.user._id ? (
          <LikeButton productId={productId} />
        ) : (
          <button onClick={() => navigate('/sign-in')}>
            <FaRegHeart />
          </button>
        )}
      </div>
      <div
        className='md:w-[30rem] md:h-[35rem] items-center '
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <img
          src={`http://127.0.0.1:5000/static/imgs/${selectedImage}`}
          alt={`Selected Image`}
          className='md:w-full md:h-full w-1/2    object-contain hover:scale-105 transition-transform duration-500'
        />
      </div>
    </div>
  );
};

export default ProductDetailComponent;
