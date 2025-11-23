import { useState } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";
import {Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    type: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("formData",formData)
    try {
      const res = await api.post("/users/register", formData);
      console.log(res.data);
      toast.success("Registration successful! Please login.");
      navigate("/list");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <div className="w-full max-w-md">
            <form onSubmit={handleSubmit}
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h2 className="text-4xl font-bold mb-4 text-center">Register</h2>
                <div class="mb-4">
                    <label class="block text-gray-700 text-xl font-bold mb-2" htmlFor="username">
                        User Name
                    </label>
                    <input className="text-lg shadow appearance-none border rounded w-full py-2 px-3 text-md text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                    required type="text" name="username" placeholder="Full Name" value={formData.username} onChange={handleChange} />
                </div>

                <div class="mb-4">
                  <label for="type" className="block mb-2 text-lg font-bold text-gray-900 dark:text-white">Role</label>
                    <select id="type" name="type" value={formData.type} onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                      <option value="">Select</option>
                      <option value="Admin" >Admin</option>  
                      <option value="User">User</option> 
                    </select>
                </div>

                <div class="mb-4">
                    <label class="block text-gray-700 text-xl font-bold mb-2" for="username">
                        Email
                    </label>
                    <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange}
                    class="text-lg shadow appearance-none border rounded w-full py-2 px-3 text-md text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                    required />
                </div>

                <div class="mb-4">
                    <label class="block text-gray-700 text-xl font-bold mb-2" for="username">
                        Password
                    </label>
                    <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange}
                    class="text-lg shadow appearance-none border rounded w-full py-2 px-3 text-md text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                    required />
                </div>

                

                <div class="flex flex-col">
                    <button type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white text-xl mt-2 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Register
                    </button>
                    <p className="text-lg mt-3 text-center">
                        Already have an account?{" "}
                        <Link to="/login" className="text-blue-600 text-lg hover:underline">
                            Login
                        </Link>
                    </p>
                </div>

            </form>
        </div>
    </div>
  );
};

export default Register;
