import React, { useEffect, useState } from 'react';
import './CSS/Category.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link, useParams } from 'react-router-dom';
import { useData } from '../components/ProductData';
import { categorizeCards } from '../utils/categorizeCards';

const Category = () => {
    const { category, type } = useParams();
    const [Data, setData] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(category);
    const [selectedType, setSelectedType] = useState(type);

    const { data, error } = useData();

    // Fetch data from backend
    useEffect(() => {
        if (error) {
            console.log("Error::", error);
        }
        setData(data);
    }, [data, error]);

    const { itemCards, categories } = categorizeCards(Data);

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };

    const handleTypeChange = (type) => {
        setSelectedType(type);
    };

    const renderProducts = () => {
        if (!selectedCategory || !categories[selectedCategory]) return null;

        const filteredProducts = categories[selectedCategory].filter(item => {
            if (!selectedType) return true;

           
            return item.details.types === selectedType;
        });


        return (
            <>
                {filteredProducts.map((item) => (
                    <Link to={`/product/${item._id}`} key={item._id}>
                        <div className="Product">
                            <div className='h-[18rem]  w-full flex justify-center items-center '>
                                <img src={`http://127.0.0.1:5000/static/imgs/${item.details.images[0]}`} alt={item.product_name} />
                            </div>
                            <div className='Product-details bg-slate-100'>
                                <h2>{item.category}</h2>
                                <h1>{item.product_name}</h1>
                                {/* <h3>Rs .{item.details}</h3> */}
                                <h3>Rs .{item.details.price}</h3>
                            </div>
                        </div>
                    </Link>
                ))}
            </>
        );
    };

    return (
        <>
            <Navbar />
            <div className='bg-slate-100 md:px-40'>
                <div className=" flex bg- justify-around  w-full  h-10 items-center ">
                    {Object.keys(categories).map((cat) => (
                        <div key={cat} className="">
                            {/* <h1>{cat}</h1> */}
                        <Link
                            to={`/Category/${cat}`}
                            onClick={(e) => {
                            handleCategoryChange(cat); // Call the change handler
                            }}
                        >
                            <div>

                                <p 
                                className={`font-mono ${selectedCategory === cat ? ' text-violet-500' : 'hover:text-violet-500'}`}                                
                                >
                                    {cat}</p>
                            </div>
                        </Link>
                        </div>
                    ))}
                </div>
            </div>
            <div className="Category">
                <div className="Category-Filters">
                    <h1>Filter</h1>
                    <div className='Checkboxes'>
                        {Object.keys(categories).map((cat) => (
                            <div className='checkbox'>
                                <input
                                    type="checkbox"
                                    value={cat}
                                    checked={selectedCategory === cat}
                                    onChange={() => handleCategoryChange(cat)}
                                    className='checkbox-input'
                                />
                                <p>{cat}</p>
                            </div>
                        ))}
                    </div>

                </div>
                <div className="Category-Products">
                    {renderProducts()}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Category;
