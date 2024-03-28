import React from 'react'
import './Navbar.css';
import { CiSearch } from "react-icons/ci";
import { CiShoppingCart } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";

export default function Navbar() {
  return (
    <div className='NavBar'>
      <div className='Logo'>ebart</div>
      <div className='Functions'>
        <a>Departments</a>
        <a>Services </a>
      </div>
        
      <div className='NavIcons'>
        <CiSearch  className='CiSearch'/>
        <input placeholder='Search..'></input>
        <button>Login</button>
        <a><CiShoppingCart /></a>
        <a><CgProfile /></a>
      </div>
      </div>
  );
}
