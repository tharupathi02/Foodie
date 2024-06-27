import React, { useEffect, useState } from "react";
import "./AddItems.css";
import { assets } from "../../assets/assets";
import axios from "axios";
import { BASE_URL, FOOD_API } from "../../constants/API";
import { toast } from "react-toastify";

const AddItems = () => {
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad",
  });

  // Function to handle the form input changes
  const onChangeHandler = (event) => {
    // Get the name and value of the input field
    const name = event.target.name;
    const value = event.target.value;

    // Update the data state with the new value
    setData((data) => ({ ...data, [name]: value }));
  };

  // Function to handle the form submission
  const onSubmitHandler = async (event) => {
    event.preventDefault();

    // Create a new FormData object
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", image);

    // Send the form data to the server
    const response = await axios.post(
      `${BASE_URL}${FOOD_API.ADD_FOOD}`,
      formData
    );

    // Check if the response is successful
    if (response.data.success) {
      setData({
        name: "",
        description: "",
        price: "",
        category: "Salad",
      });
      setImage(false);
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  };

  return (
    <div className="add">
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <div className="add-image-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt=""
            />
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
            required
          />
        </div>
        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            name="name"
            placeholder="Type here"
          />
        </div>
        <div className="add-product-description flex-col">
          <p>Product Description</p>
          <textarea
            onChange={onChangeHandler}
            value={data.description}
            name="description"
            placeholder="Write content here"
            rows="6"
          />
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product Categoty</p>
            <select onChange={onChangeHandler} name="category">
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product Price</p>
            <input
              onChange={onChangeHandler}
              value={data.price}
              type="number"
              name="price"
              placeholder="Price ($)"
            />
          </div>
        </div>
        <button type="submit" className="add-button">
          Add Item
        </button>
      </form>
    </div>
  );
};

export default AddItems;
