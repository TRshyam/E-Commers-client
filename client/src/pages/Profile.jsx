import React ,  { useState }  from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { updateUserStart, updateUserSuccess, updateUserFailure } from '../redux/user/userSlice';
import { signOutUserSuccess } from '../redux/user/userSlice';
import { BiSolidPackage } from "react-icons/bi";
import { FaRegHeart } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { VscAccount } from "react-icons/vsc";
import {useNavigate} from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';


function Profile() {

    const { currentUser, isLoading } = useSelector((state) => state.user);
    const navigate = useNavigate();

    // Hey I companted here

    // useEffect(() => {
    //     if (!currentUser && !isLoading) { // Check if currentUser is null and loading has finished
    //         return  navigate('/sign-in');
    //     }
    // } ,[currentUser] );

    // console.log(currentUser.user.email)
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({});
    const [mess, setMess] = useState(''); // State for success message content
    const [updateSuccess, setUpdateSuccess] = useState(false); // State for success message




    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
      };
      console.log(formData)


const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    dispatch(updateUserStart());
    const res = await fetch(`http://127.0.0.1:5000/api/update-user/${currentUser.user._id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    console.log(res);
    console.log(res.status);
    console.log(res.status);
    console.log(res.status);
    console.log(res.status);
    
    if (!res.ok) {
      // Handle non-successful responses
      if (res.status === 404) {
        // Handle 404 Not Found
        dispatch(updateUserFailure('User not found'));
      } else {
        // Handle other errors
        dispatch(updateUserFailure('An error occurred while updating the user'));
      }
      return;
    }

    const data = await res.json();

    // Check the success field in the response data
    if (data.success === "False") {
      dispatch(updateUserFailure(data.message));
      return;
    }


    
    // Dispatch success action and update state
    dispatch(updateUserSuccess(data));
    setUpdateSuccess(true);
    setMess('Updated Successfully'); // Set the success message
  } catch (error) {
    // Handle network errors or exceptions
    dispatch(updateUserFailure('An error occurred while updating the user'));
  }

};
  
    const handleLogout = () => {
      dispatch(signOutUserSuccess());
      navigate('/');
    };

console.log(currentUser.user.address);

    return (
      <div>
        {/* <Header/> */}
        <Navbar/>
        <div className="h-screen w-full ">
            <div className='bg-zinc-50'>
                <div className='w-full h-full flex justify-center p-10 my-5 '>

                    <div className='w-[20rem] bg-gray-100'>
                        {/* avatar */}
                        <div className='my-5'>
                            <div className='bg-gray-200 py-2  flex justify-around items-center'>
                                <img src="https://avatars.githubusercontent.com/u/93422564?v=4" alt="" className='w-[5rem] rounded-full ' />
                                <div>
                                    <h1>Hello,</h1>
                                    <span className='font capitalize'>{currentUser.user.firstName.substring(0, 10)}</span>
                                </div>
                            </div>


                        </div>
                        {/* avatar */}

                        <div className='bg-slate-100 flex-col p-2 my-5 h-sc'>
                            <div className='flex justify-around items-center'>
                            <div className='bg-gray-200 w-full h-16 my-2 '> 
                                <Link to='/orders'>
                                    <div className='flex justify-between items-center m-3'>
                                            <div className='flex items-center space-x-4'>
                                                <BiSolidPackage className='w-8 h-8' />
                                                <h1>My Orders</h1>
                                            </div>
                                            <div>
                                                <IoIosArrowForward/>
                                            </div>
                                    </div>

                                </Link>

                            </div>
                            </div>
                            <div className='flex justify-around items-center'>
                                <div className='bg-gray-200 w-full h-16 '> 
                                    <Link to='/wishlist'>
                                        <div className='flex justify-between items-center m-3'>
                                                <div className='flex items-center space-x-4'>
                                                    <FaRegHeart className='w-7 h-7' />
                                                    <h1>Wishlist</h1>
                                                </div>
                                                <div>
                                                    <IoIosArrowForward/>
                                                </div>
                                        </div>
                                    </Link>

                                </div>
                            </div>
                            {/* <div className=' bg-gray-200 my-1 flex-col items-center '>
                                    <div>
                                        <div className='flex items-center space-x-3 p-4 '>
                                            <VscAccount className='w-7 h-7' />
                                            <h1 className='text-sm'>ACCOUNT SETTINGS</h1>
                                        </div>
                                        <ul className='mx-16 text-xs pb-4  space-y-4 list-disc'>
                                            <li>Profile Information</li>
                                            <li>Manage Address</li>
                                        </ul>
                                    </div>
            

                            </div> */}


                    </div>
                    
                    </div>


                    <div className='bg-gray-100   mx-5 w-[70rem]'>
                        <div className=" flex-col items-center    p-8 rounded-lg shadow-md ">
                    <h1 className="text-2xl font-semibold mb-4">My Profile</h1>
                    {updateSuccess && (
            <div className="text-green-500 mb-4">{mess}</div> // Display the success message
            )}
                    <form onSubmit={handleSubmit} className='w-[90%] ' >
                        <div className='flex w-full justify-between'>

                            <div className="mb-4 w-[45%]  ">
                                <label htmlFor="firstName"   className="text-gray-600 block">First Name:</label>
                                <input type="text"  id="firstName" name="firstName" className="w-full border rounded-md px-3 py-2" placeholder="Your username" defaultValue={currentUser.user.firstName} onChange={handleChange} />
                            </div>
                            <div className="mb-4 w-[45%]">
                                <label htmlFor="lastName"   className="text-gray-600 block">LastName:</label>
                                <input type="text"  id="lastName" name="lastName" className="w-full border rounded-md px-3 py-2" placeholder="Your username" defaultValue={currentUser.user.lastName} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="text-gray-600 block">Email:</label>
                            <input type="email" onChange={handleChange} id="email" name="email" className="w-full border rounded-md px-3 py-2" placeholder="youremail@example.com" defaultValue={currentUser.user.email} />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="phoneNumber" className="text-gray-600 block">Phone Number:</label>
                            <input type="tel" onChange={handleChange} id="phoneNumber" name="phoneNumber" className="w-full border rounded-md px-3 py-2" placeholder="Phone number" defaultValue={currentUser.user.phnumber} />
                        </div>
    
                        <div className="mb-4">
                            <label htmlFor="address" className="text-gray-600 block">Address:</label>
                            <textarea id="address" onChange={handleChange} name="address" className="w-full border rounded-md px-3 py-2" placeholder="Your address" rows="3" defaultValue={currentUser.user.address[0]} ></textarea>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="zipcode" className="text-gray-600 block">Zip code:</label>
                            <input type="tel" onChange={handleChange} id="zipcode" name="zipcode" className="w-full border rounded-md px-3 py-2" placeholder="Zip code" defaultValue={currentUser.user.address[1]}  />

                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="text-gray-600 block">Update Password:</label>
                            <input type="password" id="password" name="password" className="w-full border rounded-md px-3 py-2" placeholder="********" />
                        </div>
                        <div className='space-x-4'>
                        <button type="submit"   className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Update Profile</button>
                        <button onClick={handleLogout} className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Logout</button>
                        
                        </div>
                    </form>
    
    
                {/* <Link to={"/"}>
                <span className='text-cyan-500'>Home Page</span>
                </Link> */}
                </div>
                    </div>
                </div>

            </div>

           
             
         </div>
      </div>


    );
}
export default Profile;     