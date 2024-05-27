import React from 'react';
import {useState} from 'react'
import {Link,useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart,signInSuccess,signInFailure } from '../redux/user/userSlice';
import { LuEye, LuEyeOff } from "react-icons/lu";
import { bouncy } from 'ldrs'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Img from '../assets/loginsignup/welcomeback.png'
bouncy.register()

export default function Signin() {
  const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);
  const {loding,error}=useSelector((state)=>state.user);
  const navigate = useNavigate();
  const dispatch =useDispatch()
  const [showPassword, setShowPassword] = useState(false);
  

  const [state, setstate] = useState({});
  const Session= (e) => {
    // console.log("this is not good dude")

    setstate({
        ...state,
        [e.target.id]:e.target.value,
      });
  };

  console.log(state)

const submit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    dispatch(signInStart());
    const res = await fetch('http://localhost:5000/api/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(state),
    });

    if (!res.ok) {
      const error = await res.json();
      if (res.status === 404) {
        // Handle "User not found" error
        dispatch(signInFailure(error.message));
      } else {
        // Handle other errors
        throw new Error(error.message);
      }
      setLoading(false); // Set loading to false in case of error
      return;
    }

    const data = await res.json();
    dispatch(signInSuccess(data));
    navigate('/');
  } catch (error) {
    setLoading(false);
    dispatch(signInFailure(error.message));
  }
};


  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
    <Navbar />
    
    <div className="min-h-screen flex items-center justify-center bg-neutral-50">

    <div className="white  rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md h-96">
    <img src={Img} alt="Description of the image" className='h-full w-full' />
    </div>

      <div className="white  rounded px-8 pt-6 pb-8 mb-4 flex flex-col w-full max-w-md">
        <div className="mb-4">
          <h1 className="text-center text-xl font-bold">Sign in</h1>
        </div>
        <form onSubmit={submit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={Session}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              autoComplete="email"
              autoFocus
              required
            />
          </div>
          <div className="mb-4 relative">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              onChange={Session}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-10"
              autoComplete="current-password"
              required
            />
            <button
              type="button"
              onClick={toggleShowPassword}
              className="absolute right-0 px-3 py-2 focus:outline-none"
            >
              {showPassword ? <LuEye /> : <LuEyeOff />}
            </button>
          </div>
          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox mr-2"
                value="remember"
              />
              <span className="text-sm">Remember me</span>
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
              error && <p className="text-sm text-red-500">{error}</p>
            )}
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={loading} // Disable the button when loading
          >
            Sign In
          </button>
        </form>
        <div className="mt-4">
          <a href="#" className="text-xs text-blue-500 hover:underline">
            Forgot password?
          </a>
        </div>
        <div className=" mt-4 flex gap-2">
          <p>Don't have an account?</p>
          <Link to="/sign-up" className=" text-blue-500 hover:underline">
             Sign Up
          </Link>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}
