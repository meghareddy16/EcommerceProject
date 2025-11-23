import { useEffect, useState } from 'react';
import axios from '../api/axios';
import {useContext} from 'react';
import { AuthContext } from '../context/AuthContext';
import { Sidebar } from './AdminDashboard';

function UsersList(){
    const {user} = useContext(AuthContext);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState();


     useEffect(() => {
        axios.get('/users/registered').then((response) => {
            setUsers(response.data);
            console.log(response.data);
            setLoading(false);
        }).catch((error) => {
            console.error(error);
            setLoading(true);
        })
    },[]);

    const handleDeleteCategory = async (id) => {
        if (!window.confirm("Are you sure you want to delete this category?")) return;

        try {
            await axios.delete(`/categories/delete/${id}`);
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
            <h2 className="text-3xl font-bold text-center p-2 m-2">Users List</h2>
            
          {/* <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-6 p-4"> */}

          <table className="min-w-full border-collapse border rounded-lg border-gray-400">
            <thead className="bg-gray-100">
                <tr>               
                    <th className="border border-gray-300 p-2 text-lg">Sl.No</th>
                    <th className="border border-gray-300 p-2 text-lg">Name</th>
                    <th className="border border-gray-300 p-2 text-lg">Email</th>
                    <th className="border border-gray-300 p-2 text-lg">Role</th>
                </tr>
            </thead>
            {users.length > 0 ? (
              users.map((thing, index) => (
               
                <tbody key={thing._id} className="hover:bg-gray-50" >
                    <tr className="text-center">
                        <td className="border border-gray-300 p-2 text-lg">{index + 1}</td>
                        <td className="border border-gray-300 p-2 text-lg">{thing.username}</td>
                        <td className="border border-gray-300 p-2 text-lg">{thing.email}</td>
                        <td className="border border-gray-300 p-2 text-lg">{thing.type}</td>
                    </tr>
                </tbody>))
          ) : (
            <tbody>
              <tr>
                <td colSpan="4" className="p-4 text-center text-lg">No users found</td>
              </tr>
            </tbody>
          )}
        </table>
      </div>
    ) : (
      <p className="text-center p-4 text-lg">Access denied</p>
    )}
  </div>
</div>
);
}

export default UsersList;
            