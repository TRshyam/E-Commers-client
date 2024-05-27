import React, { useState } from 'react';
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const AddProductForm = () => {
  const [productName, setProductName] = useState('');
  const [productFullName, setproductFullName] = useState('');

  const [productPrice, setProductPrice] = useState('');
  const [productDiscount, setProductDiscount] = useState('');
  const [category, setCategory] = useState('');
  const [types, setTypes] = useState('');
  const [brand, setBrand] = useState('');
  const [images, setImages] = useState([]);
  const [highlights, setHighlights] = useState(['', '', '', '', '', '', '']);
  const [description, setDescription] = useState('');
  const [specifications, setSpecifications] = useState([{ key: 'General', values: [{ subKey: '', subValue: '' }] }]);

  const handleHighlightChange = (index, value) => {
    const newHighlights = [...highlights];
    newHighlights[index] = value;
    setHighlights(newHighlights);
  };

  const handleAddSpecification = () => {
    setSpecifications([...specifications, { key: '', values: [{ subKey: '', subValue: '' }] }]);
  };

  const handleRemoveSpecification = (index) => {
    const newSpecifications = [...specifications];
    newSpecifications.splice(index, 1);
    setSpecifications(newSpecifications);
  };

  const handleSpecificationChange = (index, subIndex, subKey, subValue) => {
    const newSpecifications = [...specifications];
    newSpecifications[index].values[subIndex] = { subKey, subValue };
    setSpecifications(newSpecifications);
  };

  const reorderImages = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const reorderedImages = reorderImages(
      images,
      result.source.index,
      result.destination.index
    );

    setImages(reorderedImages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const filteredHighlights = highlights.filter(highlight => highlight.trim() !== '');
    const highlightsArray = filteredHighlights.length > 0 ? filteredHighlights : [];

    const formData = new FormData();
    formData.append('productName', productName);
    formData.append('productFullName', productFullName);
    formData.append('productPrice', productPrice);
    formData.append('productDiscount', productDiscount);
    formData.append('category', category);
 
    formData.append('types', types);
    formData.append('brand', brand);

    images.forEach((image) => {
      formData.append('images', image);
    });

    formData.append('highlights', JSON.stringify(highlightsArray));
    formData.append('description', description);
    formData.append('specifications', JSON.stringify(specifications));

    // console.log(JSON.stringify(formDataObject, null, 2));
    console.log(productPrice);
    console.log(productDiscount);

    try {
      const response = await axios.post('http://127.0.0.1:5000/api/add_product', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('Server Response:', response.data.productPrice);
      setProductName('');
      setproductFullName('');
      setProductPrice('');
      setProductDiscount('');
      setCategory('');
      setTypes('');
      setBrand('');
      setImages([]);
      setHighlights(['', '', '', '', '', '', '']);
      setDescription('');
      setSpecifications([{ key: 'General', values: [{ subKey: '', subValue: '' }] }]);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Add Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Product Name */}
        <div>
          <label className="block mb-1">Product Name:</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>


        {/* Product FullName */}
        <div>
          <label className="block mb-1">Product Full Name:</label>
          <input
            type="text"
            value={productFullName}
            onChange={(e) => setproductFullName(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        {/* Product Price */}
        <div>
          <label className="block mb-1">Product Price:</label>
          <input
            type="text"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        {/* Product Discount */}
        <div>
          <label className="block mb-1">Product Discount:</label>
          <input
            type="text"
            value={productDiscount}
            onChange={(e) => setProductDiscount(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        {/* Category Selection */}
        <div>
          <label className="block mb-1">Category:</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          >
            <option value="">Select Category</option>
            {['Electronics', 'Appliance', 'Furniture', 'Clothing', 'Grocery'].map((categoryOption, index) => (
              <option key={index} value={categoryOption}>{categoryOption}</option>
            ))}
          </select>
        </div>
        {/* Category Selection */}

        {/* Type Selection */}
        {category === 'Electronics' && (
          <div>
            <label className="block mb-1">Type:</label>
            <select
              value={types}
              onChange={(e) => setTypes(e.target.value)}
              className="w-full border rounded px-3 py-2"
              required
            >
              <option value="">Select Type</option>
              {/* Populate Type options based on category */}
              {['Mobile', 'Headphone', 'Laptop'].map((typeOption, index) => (
                <option key={index} value={typeOption}>{typeOption}</option>
              ))}
            </select>
          </div>
        )}
        {category === 'Appliance' && (
          <div>
            <label className="block mb-1">Type:</label>
            <select
              value={types}
              onChange={(e) => setTypes(e.target.value)}
              className="w-full border rounded px-3 py-2"
              required
            >
              <option value="">Select Type</option>
              {/* Populate Type options based on category */}
              {['TV', 'WashingMachine', 'AirConditioners'].map((typeOption, index) => (
                <option key={index} value={typeOption}>{typeOption}</option>
              ))}
            </select>
          </div>
        )}
        {category === 'Furniture' && (
          <div>
            <label className="block mb-1">Type:</label>
            <select
              value={types}
              onChange={(e) => setTypes(e.target.value)}
              className="w-full border rounded px-3 py-2"
              required
            >
              <option value="">Select Type</option>
              {/* Populate Type options based on category */}
              {['KitchenCookwere', 'LivingRoomFurniture','SofaBeds', 'BedRoomFurniture','OfficeStudyFurniture'].map((typeOption, index) => (
                <option key={index} value={typeOption}>{typeOption}</option>
              ))}
            </select>
          </div>
        )}
        {category === 'Grosoury' && (
          <div>
            <label className="block mb-1">Type:</label>
            <select
              value={types}
              onChange={(e) => setTypes(e.target.value)}
              className="w-full border rounded px-3 py-2"
              required
            >
              <option value="">Select Type</option>
              {/* Populate Type options based on category */}
              {['Staples', 'Snacks&Beverages', 'PackedFood','Dairy&Eggs'].map((typeOption, index) => (
                <option key={index} value={typeOption}>{typeOption}</option>
              ))}
            </select>
          </div>
        )}


        {/* Type Selection */}


        {/* Brand Selection */}
        {category === 'Electronics' && types && (
          <div>
            <label className="block mb-1">Brand:</label>
            <select
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="w-full border rounded px-3 py-2"
              required
            >
              <option value="">Select Brand</option>

             
              {types === 'Mobile' && ['Apple', 'Samsung','Oneplus','Google','Oppo'].map((brandOption, index) => (
                <option key={index} value={brandOption}>{brandOption}</option>
              ))}
              {types === 'Laptop' && ['Lenovo', 'MSI'].map((brandOption, index) => (
                <option key={index} value={brandOption}>{brandOption}</option>
              ))}
              {types === 'Headphone' && ['Bose', 'OnePluse'].map((brandOption, index) => (
                <option key={index} value={brandOption}>{brandOption}</option>
              ))}
            </select>
          </div>
        )}

        {/* Brand Selection */}

        {/* Images Selection */}
        <div>
          <label className="block mb-1">Images:</label>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {images.map((image, index) => (
                    <Draggable key={index} draggableId={`image-${index}`} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <img src={URL.createObjectURL(image)} alt={`Image ${index}`} className="w-32 h-32 mr-2 mb-2" />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          <input
            type="file"
            multiple
            onChange={(e) => setImages([...images, ...e.target.files])}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Highlights */}
        <div>
          <label className="block mb-1">Highlights:</label>
          {highlights.map((highlight, index) => (
            <input
              key={index}
              type="text"
              value={highlight}
              onChange={(e) => handleHighlightChange(index, e.target.value)}
              className="w-full border rounded px-3 py-2 mb-2"
              placeholder={`Highlight ${index + 1}`}
            />
          ))}
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1">Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        {/* Specifications */}
        <div>
          <label className="block mb-1">Specifications:</label>
          {specifications.map((spec, index) => (
            <div key={index}>
              <input
                type="text"
                value={spec.key}
                onChange={(e) => {
                  const newSpecifications = [...specifications];
                  newSpecifications[index].key = e.target.value;
                  setSpecifications(newSpecifications);
                }}
                placeholder="Key"
                className="w-full border rounded px-3 py-2 mb-2"
              />
              {spec.values.map((value, subIndex) => (
                <div key={subIndex} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={value.subKey}
                    onChange={(e) => handleSpecificationChange(index, subIndex, e.target.value, value.subValue)}
                    placeholder="Sub Key"
                    className="border rounded px-3 py-2 w-1/2"
                  />
                  <input
                    type="text"
                    value={value.subValue}
                    onChange={(e) => handleSpecificationChange(index, subIndex, value.subKey, e.target.value)}
                    placeholder="Sub Value"
                    className="border rounded px-3 py-2 w-1/2"
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={() => {
                  const newSpecifications = [...specifications];
                  newSpecifications[index].values.push({ subKey: '', subValue: '' });
                  setSpecifications(newSpecifications);
                }}
                className="bg-blue-500 text-white font-semibold py-2 px-4 rounded mt-2"
              >
                Add Subspecification
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddSpecification}
            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded mt-2"
          >
            Add Specification
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddProductForm;
