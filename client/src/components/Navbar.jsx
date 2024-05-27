import React, { useState, useEffect, useRef, useCallback } from 'react';
import { CiSearch } from "react-icons/ci";
import { Link } from 'react-router-dom';
import { BsBoxSeam } from "react-icons/bs";
import { useSelector } from 'react-redux';
import { FaRegHeart, FaRegUser, FaRegUserCircle } from "react-icons/fa";
import { LuShoppingCart } from "react-icons/lu";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useData } from '../components/ProductData';
import { categorizeCards } from '../utils/categorizeCards';
import ebart_logo from '../assets/ebart_logo.png'
import './CSS/Navbar.css';

export default function Navbar() {
  const [isFixed, setIsFixed] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [search, setSearch] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  const currentUser = useSelector((state) => state.user.currentUser);
  const { data } = useData();
  const { itemCards } = categorizeCards(data);

  const itemCardsArray = Object.values(itemCards);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsFixed(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Throttle search input
  const handleSearchChange = useCallback((e) => {
    setSearch(e.target.value);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (search) {
        const results = itemCardsArray.filter(item =>
          item.product_name.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredItems(results);
      } else {
        setFilteredItems([]);
      }
    }, 300); // Delay to throttle search input

    return () => clearTimeout(timer);
  }, [search, itemCardsArray]);

  const toggleDropdown = () => {
    setIsOpen(prevState => !prevState);
  };

  return (
    <div className={`bg-[#341466] z-50 text-white py-4 ${isFixed ? 'fixed top-0 left-0 w-full shadow-lg' : ''} transition-all duration-300`}>
      <div className='container mx-auto flex justify-between items-center px-4 md:px-8'>
        <div className='flex items-center'>
        <Link to='/' className='text-3xl font-extrabold text-white hover:text-white transition duration-300 ease-in-out transform hover:scale-110' style={{ fontFamily: 'Montserrat, sans-serif' }}>
            ebart
          </Link>
        </div>

        <div className='flex items-center space-x-4'>
          <div className='relative'>
            <div className='flex items-center'>
              
              <input
                id='ProductSearch'
                className='ml-2 px-3 py-1 rounded-md bg-gray-100 text-black focus:outline-none focus:ring-2 focus:ring-blue-500'
                placeholder='Search..'
                value={search}
                onChange={handleSearchChange}
                
              /><CiSearch className='absolute left-[85%] text-2xl text-black' />
            </div>
            {search && (
              <div className='absolute top-full left-0 mt-1 w-full bg-black rounded-md shadow-lg z-10'>
                {filteredItems.length > 0 ? (
                  filteredItems.map((item) => (
                    <Link key={item._id} to={`/product/${item._id}`} className='block px-6 py-2 bg-gray-50 text-black hover:bg-gray-200'>
                      {item.product_name}
                    </Link>
                  ))
                ) : (
                  <div className='px-4 py-2'>No results found</div>
                )}
              </div>
            )}
          </div>

          <Link to='/cart' className='flex gap-2 px-4 py-2 hover: hover:text-blue-500 transition-colors rounded-md'>
            <LuShoppingCart className='text-2xl' />
            <span>Cart</span>
          </Link>

          {!currentUser ? (
            <Link to='/sign-in' className='Linkk flex gap-2 bg-gray-800 rounded-md py-2 px-4 items-center hover:text-blue-500 transition-colors'>
              <FaRegUser className='text-2xl' />
              <span>Login</span>
            </Link>
          ) : (
            <div
              className='relative'
              ref={dropdownRef}
            >
              <div
                className='Linkk flex gap-2 bg-white text-black hover:bg-slate-200 rounded-md py-2 px-4 items-center hover:text-blue-500 transition-colors cursor-pointer'
                onClick={toggleDropdown}
              >
                <FaRegUser className='text-xl ' />
                <span>{currentUser.user.firstName}</span>
                <MdKeyboardArrowDown className={`arr  text-xl transform transition duration-200 ease-in-out ${isOpen ? 'rotate-180' : 'rotate-0'}`} />
              </div>
              {isOpen && (
                <div className='absolute left-1/2 transform -translate-x-1/2 mt-2 w-48 bg-gray-500 rounded-md shadow-lg z-20'>
                  <Link to='/profile' className='flex gap-4 px-4 py-2 hover:bg-gray-900 hover:text-blue-500 transition-color rounded-md'>
                    <FaRegUserCircle className='text-2xl' />
                    <span>Account</span>
                  </Link>
                  <Link to='/orders' className='flex gap-4 px-4 py-2 hover:bg-gray-900 hover:text-blue-500 transition-color rounded-md'>
                    <BsBoxSeam className='text-2xl' />
                    <span>Orders</span>
                  </Link>
                  <Link to='/wishlist' className='flex gap-4 px-4 py-2 hover:bg-gray-900 hover:text-blue-500 transition-colors rounded-md'>
                    <FaRegHeart className='text-2xl' />
                    <span>Wishlist</span>
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
