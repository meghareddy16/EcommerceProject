import { useState, useEffect, useContext } from "react";
import axios from "../api/axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const UserLogin = () =>{
    const navigate = useNavigate();
    const {login} = useContext(AuthContext);
    const [formData, setFormData] = useState({email: "",password: "", type: ""})

    const handleChange = (e) =>{
      setFormData({...formData, [e.target.name]:e.target.value});
    };

  const handleSubmit = async(e) => {
    e.preventDefault();

    // console.log("formData",formData)
    try{
      const response = await axios.post("/users/login", formData);
      const {accessToken, user} = response.data;
      // console.log(response.data);
      login(accessToken, user);
      toast.success("Login Successfully Done");
      if(response.data.user.type === 'Admin'){
        navigate('/adminDashboard');
      }else{
        navigate('/userDashboard');
      }
    }catch(error){
      toast.error(error.response?.data?.message || "Invalid credentials");
    }
  };

    return(
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div class="w-full max-w-md">
          <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
            <h1 className="flex justify-center font-bold text-center text-3xl py-2 px-3 mb-3">Login </h1>
            <div class="mb-4">
              <label class="block text-gray-700 text-xl font-bold mb-2" for="username">
                Email
              </label>
              <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
              id="email" type="text" placeholder="email" name="email" value={formData.email} onChange={handleChange}/>
            </div>
            <div class="mb-3">
              <label class="block text-gray-700 text-xl font-bold mb-2" for="password">
                Password
              </label>
              <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
              id="password" type="password" placeholder="Enter password" name="password" value={formData.password} onChange={handleChange}/>
              {/* <p class="text-red-500 text-lg italic">Please choose a password.</p> */}
            </div>
             <div class="mb-4">
                  <label for="type" className="block mb-2 font-bold text-gray-900 dark:text-white text-lg">Role</label>
                    <select id="type" name="type" value={formData.type} onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                      <option value="">Select</option>
                      <option value="Admin" >Admin</option>  
                      <option value="User">User</option> 
                    </select>
                </div>
            <div class="flex items-center justify-between">
              <button class="bg-blue-500 hover:bg-blue-700 text-white text-lg font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                Sign In
              </button>
              
              <a class="inline-block align-baseline font-bold text-lg text-blue-500 hover:text-blue-800" href="/forgotPassword">
                Forgot Password?
              </a>
            </div>
            <div classname="flex justify-center">
            <p className="text-lg text-center p-2">Don't have an account?  <a href="/" class="text-bold text-lg hover:underline text-blue-500"> Sign Up</a></p>
            </div>
          </form>
        </div>
      </div>
    )
};

export default UserLogin;

