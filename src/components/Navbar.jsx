import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { CiSearch } from "react-icons/ci";
import { CiShoppingCart } from "react-icons/ci";
import { CiUser } from "react-icons/ci";

export default function Navbar() {
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`NavBar${isFixed ? ' fixed' : ''}`}>
      <div className='Logo'>ebart</div>
      <div className='Functions'>
        <a>Home</a>
        <a>Updates</a>
        <a>Services</a>
        <a>Features</a>
        <a>About us</a>
      </div>
        
      <div className='NavIcons'>
        <CiSearch className='CiSearch' />
        <input placeholder='Search..'></input>
        <button>LogIn</button>
        <a><CiShoppingCart /></a>
        <a><CiUser /></a>
      </div>
    </div>
  );
}
