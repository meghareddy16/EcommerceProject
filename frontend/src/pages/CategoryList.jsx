import { useEffect, useState } from 'react';
import axios from '../api/axios';
import { Link } from 'react-router-dom';
import {useContext} from 'react';
import { AuthContext } from '../context/AuthContext';
import { Pencil, Heart, User, Search, Trash, PlusCircleIcon } from "lucide-react";
import { Sidebar } from './AdminDashboard';
import toast from 'react-hot-toast';

function CategoryList(){
    const {user} = useContext(AuthContext);
    const [category, setCategory] = useState([]);
    const [loading, setLoading] = useState();


     useEffect(() => {
        axios.get('/category/allCategory').then((response) => {
            setCategory(response.data);
            // console.log(response.data);
            setLoading(false);
        }).catch((error) => {
            console.error(error);
            setLoading(true);
        })
    },[]);

    const handleDeleteCategory = async (id) => {
        if (!window.confirm("Are you sure you want to delete this category?")) return;

        try {
            await axios.delete(`/category/delete/${id}`);
            toast.success("Category deleted");
            setCategory(category.filter((cat) => cat._id !== id));
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete category");
        }
    };


   return (
    <div className="flex">
      
      {/* 👉 Admin Sidebar */}
      {user?.type === "Admin" && (
        <div className="w-74">
          <Sidebar />
        </div>
      )}

      {/* 👉 Main Content */}
      <div className="flex-1 px-6">
        
        {/* If Admin → Show Admin Cards */}
        {user?.type === "Admin" ? (
        <div>
            <Link to={`/addCategory`} className="flex flex-row justify-end mx-3"> 
                <button className="flex my-2 bg-blue-500 hover:bg-blue-700 rounded py-2 px-3 text-white text-xl font-semibold">
                    <PlusCircleIcon className=""/> Category</button> 
            </Link>
          <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-6 p-4">

            {category.length > 0 ? (
              category.map((thing) => (
                <div
                  className="rounded shadow-md flex justify-between items-center p-4"
                  key={thing._id}
                >
                  <div className="text-center">
                    <img
                      className="rounded w-40 h-40 object-cover mx-auto"
                      src={`http://localhost:8001/api/uploads/${thing.imageUrl}`}
                      alt="Category"
                    />
                    {/* <p className="font-bold text-xl py-2">{thing.catName}</p> */}
                  </div>

                  <div className="flex flex-col">
                    <Link to={`/editCategory/${thing._id}`}>
                      <button className="m-2 bg-blue-700 hover:bg-blue-800 text-white rounded py-2 px-3">
                        <Pencil />
                      </button>
                    </Link>

                    <button
                      onClick={() => handleDeleteCategory(thing._id)}
                      className="m-2 bg-red-700 hover:bg-red-800 text-white rounded py-2 px-3"
                    >
                      <Trash />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No Categories available.</p>
            )}

            {loading && <p>Loading...</p>}
          </div>
          </div>
        ) : (
          /* 👉 USER VIEW (NO EDIT / DELETE) */
          // <div className="max-w-6xl border flex justify-center p-3">
          // {/* <div className=" grid grid-cols-4 sm:grid-cols-2 lg:grid-cols-5 gap-x-5 gap-y-6 p-4"> */}
          // <div className=" flex flex-wrap gap-6">
<div className="max-w-6xl mx-auto p-3 flex justify-center">

  <div
    className="flex flex-wrap gap-6 justify-center overflow-x-auto"
    style={{
      maxHeight: "400px",   // ⬅ approx 2 rows height
      paddingRight: "10px"  // avoids content hiding behind scrollbar
    }}
  >
            {category.length > 0 ? (
              category.map((thing) => (
                <div className="shadow-lg p-3 rounded-lg text-center w-full max-w-[180px] mx-auto"  key={thing._id}>
                <Link to={`/category/${thing._id}`}>
                  <img
                      className="w-50 h-45 rounded object-cover mx-auto"
                      src={`http://localhost:8001/api/uploads/${thing.imageUrl}`}
                      alt="Category"
                    />
                    {/* <p className="font-bold text-xl py-2">{thing.catName}</p> */}
                </Link>
                </div>
              ))
            ) : (
              <p>No Categories available.</p>
            )}

            {loading && <p>Loading...</p>}
          </div>
          </div>
        )}
      </div>
    </div>
    
  );
}
export default CategoryList;
    