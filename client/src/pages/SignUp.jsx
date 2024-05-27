import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LuEye, LuEyeOff } from "react-icons/lu";
import axios from 'axios';
import { bouncy } from 'ldrs';
import Popup from '../components/Popup';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Img from '../assets/loginsignup/registernow.png'
bouncy.register();

export default function SignUp() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPopup ,  setshowPopup] = useState(false);
  const [serverOTP, setserverOTP] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const { firstName, lastName, phNumber, email, password, confirmPassword } = formData;

    // Add password validation regex
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+}{"':;?/>.<,]).{8,}$/;

    if (!passwordRegex.test(password)) {
      setError('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one special character, and one number.');
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/verify_mail', formData);
      setserverOTP(response.data.otp);
      console.log("Your OTP is:", response.data.otp);
      setshowPopup(true);

    } catch (error) {
      console.error('Error signing up:', error);
      setLoading(false);
      const errorMessage = error.response.data || 'Error signing up. Please try again.';
      console.log(error.response.data);
      setError(errorMessage);
    }
  };

  return (
    <>
    <Navbar />
      
    <div className="min-h-screen flex items-center justify-center bg-neutral-50">

    <div className="white  rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md h-96">
        <img src={Img} alt="Description of the image" className='h-full w-full' />
      </div>
      <div className="  px-8 pt-6 pb-8 mb-4 flex flex-col w-full max-w-md">
        <div className="mb-4">
          <h1 className="text-center text-xl font-bold">Sign Up</h1>
        </div>
        <form onSubmit={handleSubmit}>

                    <div className="mb-4">
            <label
              htmlFor="firstName"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              First Name
            </label>
            <input
              type="name"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        
              autoFocus
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="lastName"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Last Name
            </label>
            <input
              type="name"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              autoFocus
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="phNumber"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Phone Number
            </label>
            <input
              type="name"
              id="phNumber"
              name="phNumber"
              value={formData.phNumber}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              autoFocus
            />
          </div>
         
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              autoComplete="email"
              autoFocus
              required
            />
          </div>
          <div className="mb-4 relative">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Password
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-10"
              autoComplete="new-password"
              required
            />
            <button
              type="button"
              onClick={toggleShowPassword}
              className="absolute  right-0 px-3 py-2 focus:outline-none"
            >
               {showPassword ? <LuEye /> : <LuEyeOff/>}
            </button>
          </div>
          <div className="mb-4 relative">
            <label
              htmlFor="confirmPassword"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Confirm Password
            </label>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-10"
              autoComplete="new-password"
              required
            />
            <button
              type="button"
              onClick={toggleShowConfirmPassword}
              className="absolute  right-0 px-3 py-2 focus:outline-none"
            >
               {showConfirmPassword ? <LuEye /> : <LuEyeOff/>}
            </button>
          </div>
          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox mr-2"
                value="agree"
              />
              <span className="text-sm">I agree to the terms and conditions</span>
            </label>
          </div>
                <div className='mb-5'>
            {loading ? (
              <div className="text-center ">
                {/* // Default values shown  https://uiball.com/ldrs/ */}
                  <l-bouncy
                    size="45"
                    speed="1.75" 
                    color="blue" 
                  ></l-bouncy>

              </div>
            ) : (
              error && <p className="text-sm text-red-500 mb-4">{error}</p>
            )}
          </div>
          
          <button
            type="submit"
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={loading} // Disable button during loading state
          >
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>

        </form>
        <div className="mt-4 flex gap-2">
          <p>Already have an account?</p>
          <Link to="/sign-in" className="text-blue-500 hover:underline">
             Sign In
          </Link>
        </div>
      </div>
    </div>
    {showPopup && <Popup 
          serverOTP={serverOTP}
          setshowPopup={setshowPopup}
          formData={formData}
          setError={setError}
          setFormData={setFormData}
     />}
    <Footer />
    </>
  );
}
