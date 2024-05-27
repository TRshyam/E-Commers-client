import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { MdErrorOutline } from "react-icons/md";
import OrderItem from "../components/OrderItem";
import './CSS/OrdersPage.css';
import { grid } from 'ldrs';

grid.register();

const OrdersPage = () => {
    const { currentUser, isLoading } = useSelector((state) => state.user);
    const navigate = useNavigate();

    const [orders, setOrders] = useState([]);
    const [AmountsAndTimes, setAmountsAndTimes] = useState([]);
    const [isFetching, setIsFetching] = useState(true);

    const fetchOrders = useCallback(async (userId) => {
        try {
            const response = await axios.post('http://localhost:5000/api/orders/retrieve', { userId });
            const { orders: fetchedOrders, AmountsAndTimes: fetchedAmounts } = response.data;
            setOrders(fetchedOrders || []);
            setAmountsAndTimes(fetchedAmounts || []);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsFetching(false);
        }
    }, []);

    useEffect(() => {
        if (!isLoading && !currentUser) {
            navigate('/sign-in');
        } else if (currentUser) {
            fetchOrders(currentUser.user._id);
        }
    }, [currentUser, isLoading, navigate, fetchOrders]);

    if (isLoading || isFetching) return <div>
         <p className='absolute top-1/2 bottom-1/2 left-1/2 right-1/2'>
            <l-grid size="60" speed="1.5" color="blue"></l-grid>
    </p>
    </div>;

    return (
        <>
            <Navbar />
            {orders.length > 0 ? (
                <div className="OrdersPage">
                    {orders.slice().reverse().map((order, orderIndex) => (
                        <div className="OrderedCart" key={orderIndex}>
                            <div className="OrderedCart-details">
                                <h1>Amount: Rs. {AmountsAndTimes[orderIndex][0]}</h1>
                                <h2>Date of Order: {AmountsAndTimes[orderIndex][1] && new Date(AmountsAndTimes[orderIndex][1]).toLocaleDateString()}</h2>
                                <h2>Total number of Items: {order.length}</h2>
                                <h2>Time of Order: {AmountsAndTimes[orderIndex][1] && new Date(AmountsAndTimes[orderIndex][1]).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</h2>
                            </div>
                            {order.map((product, productIndex) => (
                                <OrderItem key={productIndex} productId={product.productId} quantity={product.quantity} />
                            ))}
                        </div>
                    ))}
                </div>
            ) : (
                <div className="CartError">
                    <MdErrorOutline className="MdErrorOutline" />
                    <h1>Not yet ordered!</h1>
                </div>
            )}
            <Footer />
        </>
    );
};

export default OrdersPage;
