import React, { useEffect, useState } from "react";
import "./Orders.css";
import axios from "axios";
import { BASE_URL, ORDER_API } from "../../constants/API";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets";
import moment from "moment";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    const response = await axios.get(`${BASE_URL}${ORDER_API.ORDERS_LIST}`);
    if (response.data.success) {
      setOrders(response.data.orders.reverse());
    } else {
      toast.error(response.data.message);
    }
  };

  const statusHandler = async (event, orderId) => {
    const response = await axios.post(
      `${BASE_URL}${ORDER_API.UPDATE_ORDER_STATUS}`,
      { orderId: orderId, status: event.target.value }
    );
    if (response.data.success) {
      toast.success(response.data.message);
      fetchAllOrders();
    } else {
      toast.error(response.data.message);
    }
  };

  const formatDate = (date) => {
    return moment(date).format("dddd, MMMM Do YYYY, h:mm:ss a");
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="order add">
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order, index) => (
          <div key={index} className="order-item">
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className="order-item-food">
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + " x " + item.quantity + " ";
                  } else {
                    return item.name + " x " + item.quantity + ", ";
                  }
                })}
              </p>
              <p className="order-item-name">
                {order.address.firstName + " " + order.address.lastName}
              </p>
              <div className="order-item-address">
                <p>{order.address.street + ", "}</p>
                <p>
                  {order.address.city +
                    ", " +
                    order.address.state +
                    ", " +
                    order.address.country +
                    ", " +
                    order.address.zipCode}
                </p>
              </div>
              <p className="order-item-phone">{order.address.phone}</p>
              <p className="order-item-date">{formatDate(order.date)}</p>
            </div>
            <p>Items: {order.items.length}</p>
            <p>Total: $ {order.amount}</p>
            <select
              onChange={(event) => statusHandler(event, order._id)}
              value={order.status}
            >
              <option value="Food Processing">Food Processing</option>
              <option value="Out for Delivery">Out for Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
