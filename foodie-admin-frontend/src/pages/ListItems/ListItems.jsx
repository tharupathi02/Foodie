import React, { useEffect, useState } from "react";
import "./ListItems.css";
import axios from "axios";
import { BASE_URL, FOOD_API, IMAGE_API } from "../../constants/API";
import { toast } from "react-toastify";
import Lottie from "lottie-react";
import { assets } from "../../assets/assets";

const ListItems = () => {
  const [foodList, setFoodList] = useState([]);

  const fetchFoodList = async () => {
    const response = await axios.get(`${BASE_URL}${FOOD_API.GET_FOOD_LIST}`);
    if (response.data.success) {
      setFoodList(response.data.data);
    } else {
      toast.error(response.data.message);
    }
  };

  const removeFoodItem = async (foodId) => {
    const response = await axios.post(`${BASE_URL}${FOOD_API.REMOVE_FOOD}`, {
      id: foodId,
    });
    if (response.data.success) {
      toast.success(response.data.message);
      fetchFoodList();
    } else {
      toast.error(response.data.message);
    }
  };

  useEffect(() => {
    fetchFoodList();
  }, []);

  return (
    <div className="list add flex-col">
      <p>All Food List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b> 
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {foodList.length === 0 && (
          <div className="no-food-items">
            <Lottie
              className="no-food-items-animation"
              animationData={assets.noDataAnimation}
              loop={true}
              width={100}
              height={100}
            />
            <p>No food items available</p>
          </div>
        )}
        {foodList.map((item, index) => {
          return (
            <div key={index} className="list-table-format">
              <img
                src={`${BASE_URL}${IMAGE_API.GET_IMAGE}/${item.image}`}
                alt=""
              />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{item.price}</p>
              <p onClick={() => removeFoodItem(item._id)} className="cursor">
                X
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ListItems;
