import React, { useState, useEffect } from 'react';
import { Heading } from "./Heading";
import { Img } from './Img';
import { Text } from './Text';
import { Button } from './Button';
import DesktopButton from './DesktopButton';
import { BannerImg1 } from '../cards'; // adjust the path accordingly

export default function Banner() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % BannerImg1.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const currentBanner = BannerImg1[currentImageIndex];

  return (
    <div className="flex flex-col mt-[5px] sm:mx-2 mx-0 rounded-xl">
      <div className="flex items-center w-full gap-[5px]">
        <div
          className="flex flex-col items-start md:self-stretch h-[611px] md:h- gap-[136px] p-[34px] md:gap-[102px] sm:gap-[68px] sm:p-5 flex-1 rounded-[15px]"
          style={{
            backgroundImage: `url(${currentBanner[0]})`,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
          }}
        >
          <div className="flex flex-col items-start mt-[175px] max-sm:text-2xl max-sm:mx-auto max-sm:text-center md:ml-[104px] pb-[9px] gap-4">
            <div className="flex flex-col md:items-start justify-center space-y-8 md:ml-24">
              <div className="space-y-4">
                <Heading size="xs" as="h2" className="!text-gray-300">
                  {currentBanner[1]}
                </Heading>
                <Text size="4xl" as="p" className="!text-gray-300">
                  {currentBanner[2]}
                </Text>
              </div>
              <Button className="flex items-center justify-center h-[48px] px-[22px] sm:px-5 text-gray-300 text-center text-lg font-medium border-gray-300 border-2 border-solid min-w-[149px] rounded-lg hover:bg-black hover:text-gray-300">
                {currentBanner[3]}
              </Button>
            </div>
          </div>
          <div className="flex self-end items-end h-full mr-3 md:mr-0">
            <Text size="md" as="p" className="!text-gray-300 text-right">
              BRAVIA
            </Text>
            <Img src="images/img.svg" alt="videocamera_one" className="h-[26px]" />
            <DesktopButton className="flex flex-col items-start flex-1" />
          </div>
        </div>
        <div className="flex flex-col self-end my-auto gap-5 px-7 max-md:hidden">
          {BannerImg1.map((imgData, index) => (
            <Img
              key={index}
              src={imgData[0]}
              alt={`image_${index}`}
              className="w-14 h-14 object-cover rounded-[5px]"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
