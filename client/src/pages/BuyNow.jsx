import React from 'react'
import { useSelector,useDispatch} from 'react-redux';


export default function BuyNow() {
    const { currentUser, isLoading } = useSelector((state) => state.user);
    console.log(currentUser.address);
    console.log(currentUser.address);
    console.log(currentUser.address);
    console.log(currentUser.address);

  return (
    <>
        <div>
            <h1>Logo</h1>
            <h1>Checkout</h1>
        </div>
        <div>
            <h1>Choose your Delivery address</h1>
            <form onSubmit={handleSubmit}>    
                <div className="mb-4">
                    <label htmlFor="address" className="text-gray-600 block">Address:</label>
                    <textarea id="address" onChange={handleChange} name="address" className="w-full border rounded-md px-3 py-2" placeholder="Your address" rows="3" defaultValue={currentUser.address} ></textarea>
                </div>
                <div className="mb-4">
                    <label htmlFor="zipcode" className="text-gray-600 block">Zip code:</label>
                    <input type="tel" onChange={handleChange} id="zipcode" name="zipcode" className="w-full border rounded-md px-3 py-2" placeholder="Zip code"  />
                </div>
            </form>

        </div>

        {/* <form onSubmit={handleSubmit} className='w-[90%] ' >
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
                            <textarea id="address" onChange={handleChange} name="address" className="w-full border rounded-md px-3 py-2" placeholder="Your address" rows="3" defaultValue={currentUser.address} ></textarea>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="zipcode" className="text-gray-600 block">Zip code:</label>
                            <input type="tel" onChange={handleChange} id="zipcode" name="zipcode" className="w-full border rounded-md px-3 py-2" placeholder="Zip code"  />

                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="text-gray-600 block">Update Password:</label>
                            <input type="password" id="password" name="password" className="w-full border rounded-md px-3 py-2" placeholder="********" />
                        </div>
                        <div className='space-x-4'>
                        <button type="submit"   className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Update Profile</button>
                        <button onClick={handleLogout} className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Logout</button>
                        
                        </div>
        </form> */}
    </>
  )
}
