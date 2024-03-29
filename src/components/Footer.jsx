import React from 'react';
import { Link } from 'react-router-dom';

import { FaInstagram,FaYoutube} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { PiSuitcaseSimpleFill } from "react-icons/pi";



const Footer = () => {
  return (
    <footer className="bg-black px-4 py-8 sm:px-12 sm:py-16">
      <div className="flex flex-col md:flex-row justify-between max-w-7xl mx-auto">
        {/* About Section */}
        <div className="footer-section">
          <h2 className="text-lg font-semibold  text-neutral-700 mb-2">ABOUT</h2>
          <ul className="text-sm leading-5 text-zinc-300">
            <li>Contact Us</li>
            <li>About Us</li>
            <li>Careers</li>
            <li>Our Stories</li>
            <li>Press</li>
          </ul>
        </div>
        {/* Help Section */}
        <div className="footer-section pt-8 md:pt-0">
          <h2 className="text-lg font-semibold text-neutral-700 mb-2">HELP</h2>
          <ul className="text-sm leading-5 text-zinc-300">
            <li>Payments</li>
            <li>Shipping</li>
            <li>Cancellation & Returns</li>
            <li>FAQ</li>
            <li>Report Infringement</li>
          </ul>
        </div>
        {/* Mail Us Section */}
        <div className="footer-section pt-8 md:pt-0">
          <h2 className="text-lg font-semibold text-neutral-700 mb-2">MAIL US</h2>
          <ul className="text-sm leading-5 text-zinc-300">
            <li>EBART Private Limited,</li>
            <li>Buildings & Cave Tech Village,</li>
            <li>Outer Ring Road, Devarabeesanahalli Village,</li>
            <li>Bengaluru, 560103,</li>
            <li>Karnataka, India.</li>
            </ul>
        </div>
        {/* Consumer Policy Section */}
        <div className="footer-section pt-8 md:pt-0">
          <h2 className="text-lg font-semibold text-neutral-700 mb-2">CONSUMER POLICY</h2>
          <ul className="text-sm leading-5 text-zinc-300">
            <li>Cancellation & Returns</li>
            <li>Terms Of Use</li>
            <li>Security</li>
            <li>Privacy</li>
            <li>Sitemap</li>
            <li>Grievance Redressal</li>
            <li>EPR Compliance</li>
          </ul>
        </div>
      </div>
      <div className='flex mt-8 flex-wrap justify-between max-w-7xl mx-auto pt-2 md:pt-0'>
          {/* Social Section */}
          <div className="flex items-center text-stone-200 gap-4 mt-4 sm:mt-0">
            <span className="mr-4 text-sm">SOCIAL</span>
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer"><FaInstagram size={20}/></a>
            <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer"><FaXTwitter size={20}/></a>
            <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer"><FaYoutube size={20}/></a>
          </div>
        {/* Become a Seller Section */}
        <div className="flex gap-2 items-center text-zinc-300">
            <PiSuitcaseSimpleFill />
            {/* <link to={"/src/index.html"}  className="ml-2 text-sm active">Become a Seller</link> */}
            <Link to="/Seller">Become a Seller</Link>
          </div>
        </div>
      <div className="text-center text-zinc-400 mt-20">
        © 2024 eBART. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
