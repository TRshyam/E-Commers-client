import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function Wishlist() {
    const [wishlistProducts, setWishlistProducts] = useState([]);
    const currentUser = useSelector(state => state.user.currentUser);

    useEffect(() => {
        const fetchWishlistData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/wishlist/${currentUser.user._id}`);
                const wishlist = response.data;

                const productsResponse = await axios.get("http://localhost:5000/api/data");
                const productsData = productsResponse.data.product_data;

                const wishlistProductsArray = wishlist.map(productId => productsData[productId]);
                setWishlistProducts(wishlistProductsArray);
            } catch (error) {
                console.error('Error fetching wishlist:', error);
            }
        };

        fetchWishlistData();
    }, [currentUser]);

    const handleDeleteProduct = async (productId) => {
        try {
            await axios.delete(`http://localhost:5000/api/wishlist/${currentUser.user._id}/${productId}`);
            // Update local state to remove the deleted product
            setWishlistProducts(prevProducts => prevProducts.filter(product => product._id !== productId));
        } catch (error) {
            console.error('Error deleting product from wishlist:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900 py-6">Your Wishlist</h1>
                <div className="flex flex-col gap-6">
                    {wishlistProducts.map(product => (
                        <div key={product._id} className="bg-white rounded-lg shadow-md overflow-hidden flex">
                            <div className="w-48 h-48 relative">
                                <img
                                    src={`http://127.0.0.1:5000/static/imgs/${product.details.images[0]}`}
                                    alt=""
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="p-4 flex-grow">
                                <h2 className="text-lg font-semibold text-gray-900">{product.details.product_FullName}</h2>
                                <div className="flex items-center mt-2">
                                    <p className="text-gray-900 font-bold">{product.details.price}</p>
                                    <span className="ml-2 bg-red-500 text-white px-2 py-1 rounded-full">
                                        {product.details.discount}% off
                                    </span>
                                </div>
                                <div className="mt-4 flex justify-between">
                                    <Link to={{ pathname: "/cart" }} state={{ productId: product._id }}>
                                        <button className="bg-amber-400 hover:bg-amber-500 text-white font-semibold py-2 px-4 rounded">
                                            Add to Cart
                                        </button>
                                    </Link>
                                    <button
                                        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
                                        onClick={() => handleDeleteProduct(product._id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
