import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ProductImages from '../components/ProductPage/ProductImage';
import ProductDetails from '../components/ProductPage/ProductDetails';
import Navbar from '../components/Navbar';
import Carousel from '../components/carousel/Carousel';
import Card from '../components/Cards/Card';
import { useData } from '../components/ProductData';
import { categorizeCards } from '../utils/categorizeCards';
import { grid } from 'ldrs';

grid.register();

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const topRef = useRef(null);
  const navigate = useNavigate();

  const addToRecentlyViewed = (product) => {
    if (!recentlyViewed.some((item) => item.id === product.id)) {
      setRecentlyViewed([product, ...recentlyViewed.slice(0, 4)]);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/data');
        const foundProduct = response.data.product_data[id];
        setProduct(foundProduct);
        setLoading(false);
        addToRecentlyViewed(foundProduct);
      } catch (error) {
        console.error(`Error fetching product: ${error}`);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const [cards, setCards] = useState([]);
  const { data, error } = useData();

  useEffect(() => {
    if (error) {
      console.log(error);
    }
    setCards(data);
  }, [data]);

  const { adCards, itemCards, categories } = categorizeCards(cards);

  const renderItemCards = (itemCards, category) => {
    const filteredItemCards = Object.values(itemCards).filter(card => card.category === category);
    return filteredItemCards.map((card) => {
      const { _id, product_name, details } = card;
      return (
        <div key={_id} onClick={() => handleItemClick(_id)} className="carousel-item">
          <Card item={{ _id, product_name, details }} />
        </div>
      );
    });
  };

  const handleItemClick = (itemId) => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    navigate(`/product/${itemId}`);
  };

  if (loading) return (
    <p className='absolute top-1/2 bottom-1/2 left-1/2 right-1/2'>
      <l-grid size="60" speed="1.5" color="blue"></l-grid>
    </p>
  );

  if (!product) return <p>Product not found</p>;

  return (
    <div className='bg-gray-100 w-full h-screen'>
      <Navbar />
      <div ref={topRef} className='bg-gray-100 w-full flex flex-col'>
        <div className='mx-0 xl:mx-16 2xl:mx-48 py-3 h-auto md:flex-grow md:flex'>
          <ProductImages 
            mainImgs={product.details.images} 
            productId={product._id} 
            price={product.details.price}
            discount={product.details.discount}
            />
          <ProductDetails details={product} />
        </div>

        <div className='mx-0 xl:mx-16 2xl:mx-48 py-3 h-auto'>
          <Carousel>
            {renderItemCards(itemCards, "Electronics")}
          </Carousel>
          <Carousel>
            {renderItemCards(itemCards, "Electronics")}
          </Carousel>
        </div>
        {/* <div className='mx-0 xl:mx-16 2xl:mx-48 py-3 h-auto '>
          <Carousel>
            {renderItemCards(recentlyViewed)}
          </Carousel>
        </div> */}
      </div>
    </div>
  );
}

export default ProductPage;
