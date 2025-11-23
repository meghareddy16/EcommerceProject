import { useState } from "react";
import axios from "../api/axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/users/forgotPass", { email });

      toast.success("OTP sent to your email");
      console.log(res);
      // save email temporarily to localStorage
      localStorage.setItem("resetEmail", email);

      navigate("/verifyOtp");
    } catch (error) {
      toast.error(error.response?.data || "Something went wrong");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 w-96 rounded shadow">
        <h1 className="text-2xl font-bold mb-4 text-center">Forgot Password</h1>

        <input
          type="email"
          placeholder="Enter your email"
          className="w-full p-2 border rounded mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button className="w-full bg-blue-600 text-white p-2 rounded">
          Send OTP
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
