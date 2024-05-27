import React from 'react';
import { Link } from 'react-router-dom';
// import Adbanner from '../../assets/AdBannerImg/banner1.png';

export default function YourComponent({ bgGradientFrom, bgGradientTo, imageSrc, content,category }) {
  // console.log(bgGradientFrom);
  // console.log(category);
  
  // Define inline styles for the background gradient
  const gradientStyle = `bg-gradient-to-r from-${bgGradientFrom} to-${bgGradientTo}`;
  // console.log(gradientStyle);

  return (
    <div className="bg-gradient-to-r from-regal-blue-ad to-light-blue-ad relative my-6">
      {/* <div className={`${gradientStyle} 2xl:h-[355px] h-[300px] rounded-md`}> */}
      <div className={`${gradientStyle}`}>
        <div className=" 2xl:h-[355px] h-[300px] rounded-md">
        <div className="absolute top-0 h-full left-0 flex items-center justify-center">
          <div className="space-y-4 p-8 z-10 text-sandel">
            {/* Content */}
            {/* <div className={`${gradientStyle}`}>
              <h1>HEkosdepfjpscfjopsd</h1>
            </div> */}
            {content && (
              <>

                <p className='text-lg'>{content.subtitle}</p>
                <h1 className="w-2/3 text-xl font-bold">{content.title}</h1>

                <Link to={`/Category/${category}`} >

                  <button className="text-black bg-light font-semibold p-1 px-5  my-7 rounded">View All</button>
                </Link>
              </>
            )}
          </div>
        </div>
        {/* Image */}
        {imageSrc && <img src={`http://127.0.0.1:5000/static/${imageSrc}`} className="absolute 2xl:top-14 top-1/4 right-1 w-auto 2xl:h-2/3 h-3/5 max-h-1/2 object-cover" alt="Ad banner" />}
        </div>
      </div>
</div>
  );
}