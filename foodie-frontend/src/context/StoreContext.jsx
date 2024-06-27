import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL, CART_API, FOOD_API } from "../constants/API";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  // cartItems is an object with keys as item ids and values as the quantity of that item in the cart
  const [cartItems, setCartItems] = useState({});

  // token is the JWT token for the user
  const [token, setToken] = useState("");

  const [food_list, setFoodList] = useState([]);

  // Add an item to the cart
  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if (token) {
      await axios.post(
        `${BASE_URL}${CART_API.ADD_TO_CART}`,
        { itemId },
        { headers: { token } }
      );
    }
  };

  // Remove an item from the cart
  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (token) {
      await axios.post(
        `${BASE_URL}${CART_API.REMOVE_FROM_CART}`,
        { itemId },
        { headers: { token } }
      );
    }
  };

  // Get the total amount of the cart
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };

  const fetchFoodList = async () => {
    const response = await axios.get(`${BASE_URL}${FOOD_API.GET_FOOD_LIST}`);
    setFoodList(response.data.data);
  };

  const loadCartData = async (token) => {
    const response = await axios.post(
      `${BASE_URL}${CART_API.GET_CART}`,
      {},
      { headers: { token } }
    );
    setCartItems(response.data.cartData);
  };

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadCartData(localStorage.getItem("token"));
      }
    }
    loadData();
  }, []);

  const contextValue = {
    // food_list is the list of all food items
    food_list,

    // add cart functions and cartItems state
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,

    // token functions and token state
    token,
    setToken,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
