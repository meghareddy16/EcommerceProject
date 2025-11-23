import { useEffect, useState } from "react";
import axios from "../api/axios";
import { Link } from "react-router-dom";
import { FiMenu, FiX, FiHome, FiPackage, FiUsers, FiShoppingCart, FiGrid, FiDollarSign, FiShoppingBag, FiMaximize, FiLogOut } from "react-icons/fi";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Dashboard() {
  const [stats, setStats] = useState({});

  useEffect(() => {
    const fetchStats = async () => {

      const res = await axios.get("/users/allCounts");
      // console.log("Counts = ",res.data);
      setStats(res.data);
    };

    fetchStats();
  }, []);



  return (
    <div className="flex flex-cols-2">
    {/* <Sidebar /> */}
    <Sidebar/>
    <div className="p-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <div className="grid grid-cols-3 gap-4 mt-10">
        <div className="bg-blue-200 w-80 h-50 p-4 rounded">
          <div className="flex justify-center gap-4 text-3xl py-4">
            <span className=" "><FiUsers/></span>
            <h2 className="">Total Users</h2>
          </div>
          <p className="text-6xl text-center">{stats.users}</p>
        </div>

        <div className="bg-pink-200 w-80 h-50 p-4 rounded">
           <div className="flex justify-center gap-4 text-3xl py-4">
            <span className=" "><FiGrid/></span>
            <h2 className="">Total Products</h2>
          </div>
          <p className="text-6xl text-center">₹{stats.products}</p>
        </div>

        <div className="bg-yellow-200 w-80 h-50 p-4 rounded">
           <div className="flex justify-center gap-4 text-3xl py-4">
            <span className=" "><FiMenu/></span>
            <h2 className="">Total Categories</h2>
          </div>
          <p className="text-6xl text-center">₹{stats.categories}</p>
        </div>

         <div className="bg-green-200 w-80 h-50 p-4 rounded">
          <div className="flex justify-center gap-4 text-3xl py-4">
            <span className=" "><FiShoppingBag/></span>
            <h2 className="">Total Orders</h2>
          </div>
          <p className="text-6xl text-center">{stats.orders}</p>
        </div>

         <div className="bg-red-200 w-80 h-50 p-4 rounded">
           <div className="flex justify-center gap-4 text-3xl py-4">
            <span className=" "><FiDollarSign/></span>
            <h2 className="">Total Revenue</h2>
          </div>
          <p className="text-6xl text-center">₹{stats.Revenue}</p>
        </div>

      </div>
    </div>
    </div>
  );
}


function Sidebar(){
    const {  logout } = useContext(AuthContext);

   const handleLogout = () => {
    alert('Are you sure want to Logout');
    logout();
    navigate("/login");
  };

  return (
        <div className="flex">
      <div className="bg-gray-900 text-white transition-all duration-300 h-screen p-4 w-86">
        {/* <div className="flex justify-center">
          <button className="text-white text-2xl">Dashboard</button>
        </div> */}
        <ul className="mt-6 space-y-3">
          <li className="flex justify-center m-3">
             <img src="\src\assets\logoFood.png" className="rounded-full" alt="Logo"/>
          </li>
          <li>
            <Link to="/adminDashboard" className="flex flex-row items-center gap-4 p-4 rounded-lg hover:bg-gray-700 transition">
              <span className="text-2xl"><FiHome/></span>
              <span className="text-2xl">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to="/list" className="flex flex-row items-center gap-4 p-4 rounded-lg hover:bg-gray-700 transition">
              <span className="text-2xl"><FiGrid/></span>
              <span className="text-2xl">Products</span>
            </Link>
          </li>
          <li>
            <Link to="/categoryList" className="flex flex-row items-center gap-4 p-4 rounded-lg hover:bg-gray-700 transition">
              <span className="text-2xl"><FiMenu/></span>
              <span className="text-2xl">Categories</span>
            </Link>
          </li>
          <li>
            <Link to="/orderList" className="flex flex-row items-center gap-4 p-4 rounded-lg hover:bg-gray-700 transition">
              <span className="text-2xl"><FiShoppingCart/></span>
              <span className="text-2xl">Orders</span>
            </Link>
          </li>
          <li>
            <Link to="/usersList" className="flex flex-row items-center gap-4 p-4 rounded-lg hover:bg-gray-700 transition">
              <span className="text-2xl"><FiUsers/></span>
              <span className="text-2xl">Users</span>
            </Link>
          </li>
          <li>
            <Link to="/" className="flex flex-row items-center gap-4 p-4 rounded-lg hover:bg-gray-700 transition">
              <span className="text-2xl"><FiLogOut/></span>
              <button className="text-2xl" onClick={handleLogout}>Logout</button>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
} 

export {Sidebar} ;