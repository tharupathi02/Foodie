// Base URL for the API
export const BASE_URL = "https://foodie-backend-5mf1.onrender.com";

// Food API Endpoints
export const AUTHENTICATION = {
  LOGIN: "/api/users/login",
  REGISTRATION: "/api/users/register",
};

export const FOOD_API = {
  GET_FOOD_LIST: "/api/food/getFoodList",
};

export const CART_API = {
  ADD_TO_CART: "/api/cart/add",
  REMOVE_FROM_CART: "/api/cart/remove",
  GET_CART: "/api/cart/get",
};

export const ORDER_API = {
  PLACE_ORDER: "/api/order/placeOrder",
  VERIFY_ORDER: "/api/order/verifyOrder",
  GET_USER_ORDERS: "/api/order/getOrders",
};

export const IMAGE_API = {
  GET_IMAGE: "/api/uploads",
};
