import React, { useEffect } from "react";
import "./Verify.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { BASE_URL, ORDER_API } from "../../constants/API";
import axios from "axios";
import { toast } from "react-toastify";

const Verify = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const navigate = useNavigate();

  const verifyPayment = async () => {
    let response = await axios.post(`${BASE_URL}${ORDER_API.VERIFY_ORDER}`, {
      success,
      orderId,
    });

    if (response.data.success) {
      toast.success(response.data.message);
      navigate("/my-orders");
    } else {
      toast.error(response.data.message);
      navigate("/");
    }
  };

  useEffect(() => {
    verifyPayment();
  }, []);

  return (
    <div className="verify">
      <div className="spinner"></div>
    </div>
  );
};

export default Verify;
