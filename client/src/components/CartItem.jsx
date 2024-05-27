import React, { useState, useEffect } from "react";
import sampleImage from '../assets/CardItems/Pot/Pot-1.jpg';
import './CSS/CartItem.css';
import { FiMinusCircle, FiPlusCircle } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { FaRegHeart } from "react-icons/fa";
import axios from "axios";
import { grid } from 'ldrs'
import LikeButton from "./LikeButton";
grid.register()

const CartItem = (props) => {
  const [quantity, setQuantity] = useState(props.quantity || 0); // Set default quantity to 0 if not provided
  const [userId, setUserId] = useState('');
  const [productId, setProductId] = useState('');
  const[productData , SetproductData] = useState({})

  useEffect(() => {
    console.log("Props in CartItem:", props);
    setQuantity(props.quantity || 0);
    setUserId(props.userId);
    setProductId(props.productId);
    FetchProductDetails();
    console.log("productdata" , productData)

  }, []);

  console.log(userId);
  const FetchProductDetails = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/data');
      if (response.status === 200) {
        const responseData = response.data.product_data;
        console.log("responseData",responseData ,props.productId)
        
        const foundProduct = responseData[props.productId];
        console.log("Founded product " , foundProduct)
        if (foundProduct) {
          SetproductData(foundProduct);
        } else {
          console.warn(`Product with ID ${props.productId} not found in response data.`);
        }
      } else {
        console.error('Error fetching product data:', response.statusText);
        setError(new Error('Failed to fetch product data')); // Set error state
      }
    } catch (error) {
      console.error('Error fetching product data:', error);
      setError(error); // Set error state
    }
  };


  const increaseQuantity = async () => {
    console.log("Hey your are on Increase Quantity fun() :", quantity);
    const newQuantity = quantity + 1;
    setQuantity(newQuantity); // Update UI quantity immediately (optimistic update)
    updateCart(newQuantity); // Call updateCart with new quantity
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity); // Update UI quantity immediately
      updateCart(newQuantity); // Call updateCart with new quantity
    }
  };

  const updateCart = async (newQuantity) => {
    console.log("You are currently on the Update Cart fun() : ", userId, productId, newQuantity);
    if (userId && productId && newQuantity > 0) {
      try {
        const response = await axios.post('http://localhost:5000/api/cart/add', { userId, productId, quantity: newQuantity });
        console.log("UserId: ",userId,"product",productId,"resopnse",response.data);
        props.TotalValueChange(response.data);
        // Update state only after successful response (if backend returns updated quantity)
        // if (response.data && response.data.quantity) { // Check for updated quantity in response
        //   setQuantity(response.data.quantity);
        // }
      } catch (error) {
        console.log("Error: ", error.message);
        // Handle potential update errors (optional - revert UI changes)
      }
    }
  };





  const handleDelete = async () => {
    if (userId && productId) {
        props.deleteCartItem(userId, productId); // Call deleteCartItem function from parent
    } else {
        console.error("Missing user or product ID for deletion.");
    }
};
console.log(productData);
  // const price=productData.details.price;
  // const discount=productData.details.discount;
  // var discountFraction = discount / 100;
  // var discountPrice =Math.floor(price - (discountFraction * price));

  return (
    <>
    {Object.keys(productData).length > 0 ? (
      
      <div className="CartItem">
    
        {/* <h1>{productData.details.images[0]}</h1>
        <h1>{`http://127.0.0.1:5000/static/imgs/${productData.details.images[0]}`}</h1> */}
        {/* <img src={productData.details.images[0]} alt="" srcset="" /> */}
        <img src={`http://127.0.0.1:5000/static/imgs/${productData.details.images[0]}`} alt={productData.product_name} className="CartItem-Image" />
        <div className="CartItem-Details">
          <h1>{productData.product_name}</h1>
          {/* <h2>{productData.details.Specification.General.brand} - {productData.details.Specification.General.model}</h2> */}
          <h2>{productData.details.brand || ""}</h2>
          <h3>{productData.details.product_FullName}</h3>
          <h4>Rating : {productData.details.ratings } ⭐</h4>
          <div className="CartItem-Modify">
            <button onClick={decreaseQuantity}><FiMinusCircle className="FiMinusCircle" /></button>
            <h5>{quantity}</h5>
            <button onClick={increaseQuantity}><FiPlusCircle className="FiPlusCircle" /></button>
          </div>
        </div>
        <div className="CartItem-Price">
          <div className="flex gap-5">  
            <p>₹{productData.details.price}</p>
            <p>{productData.details.discount}% OFF</p>
          </div>
          <h1>Rs .{Math.floor((productData.details.price - (productData.details.discount / 100) * productData.details.price) * quantity)}</h1>
          <div className="CartItem-AddorRemove">
            <button onClick={handleDelete}><AiOutlineDelete className="AiOutlineDelete" /></button>
            <LikeButton productId={productData._id} />
          </div>
        </div>
      </div>
    ) : (
      <></>
    )}
  </>
  );
};

export default CartItem;