import { useEffect, useState } from 'react';
import axios from '../api/axios';
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';
import CategoryList from "../pages/CategoryList";
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { PlusCircle, PlusCircleIcon, PlusIcon, PlusSquareIcon, Search } from 'lucide-react';
import { Sidebar } from './AdminDashboard';
import { FiPlus } from 'react-icons/fi';

function productList(){
        const {user} = useContext(AuthContext);
    
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState();
    const [category, setCategory] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

  const limit = 8;

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
    
    useEffect(() => {
        axios.get('/products/allProducts').then((response) => {
            setProducts(response.data);
            // console.log(response.data);
            setLoading(false);
        }).catch((error) => {
            console.error(error);
            setLoading(true);
        })
    },[]);


     const loadProducts = () => {
    axios
      .get(
        `/products/filters?category=${selectedCategory}&search=${search}&page=${page}&limit=${limit}`
      )
      .then((res) => {
        setProducts(res.data.products);
        setTotalPages(res.data.totalPages);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadProducts();
  }, [selectedCategory, search, page]);

    return(
        // <div className="max-w-12xl mx-auto px-4">
        //     {/* <h1 className="text-center font-bold text-2xl m-3">Products List</h1> */}
        //      {user?.type === "Admin" && (
        //     <div className="flex justify-end py-2">
        //         <Link to={`/addProduct`} className="flex justify-end mx-3"> 
        //             <button className="my-2 bg-blue-500 hover:bg-blue-700 rounded py-2 px-3 text-white font-semibold"><PlusCircle/> Product</button> 
        //         </Link>
                
        //     </div>
        //      )}
        //     <div className=" w-full">
        //         {/* <CategoryList/> */}
        //     </div>
            // <div className="grid grid-cols-4 sm:grid-cols-2 lg:grid-cols-4 gap-5 px-8">
            //     {products.length > 0 ?
            //             (products.map((product) => (
            //                 <ProductCard key={product._id} product={product}/>
            //             ))
            //     ) : (
            //         <p className="text-center col-span-full">No products available.</p>
            //     )}
            //     {loading && <p className="text-center col-span-full">Loading...</p>}
            // </div>

        // </div>
        <div className='flex'>
            {user?.type === "Admin" && (
                <div className='w-74'><Sidebar/></div>
            )}

            <div className='flex-1'>
                {user?.type === "Admin" ? (
                    <div>
                        <Link to={`/addProduct`} className="flex justify-end mx-3"> 
                            <button className="flex my-2 bg-blue-500 hover:bg-blue-700 rounded py-2 px-3 text-white text-lg font-semibold"><PlusSquareIcon classname="pt-1 text-xl"/> Product</button> 
                        </Link>
                         <div className="grid grid-cols-4 sm:grid-cols-2 lg:grid-cols-4 gap-5 px-8">
                            {products.length > 0 ?
                                    (products.map((product) => (
                                        <ProductCard key={product._id} product={product}/>
                                    ))
                            ) : (
                                <p className="text-center col-span-full">No products available.</p>
                            )}
                            {loading && <p className="text-center col-span-full">Loading...</p>}
                        </div>
                    </div>
                ) : (
                    <div className="p-4">
                         <div className="flex justify-end gap-4 mb-5 px-6 text-xl">
                            {/* Category Filter */}
                            <select
                                className="border p-2 rounded w-60 text-xl"
                                value={selectedCategory}
                                onChange={(e) => {
                                setSelectedCategory(e.target.value);
                                setPage(1);
                                }}
                            >
                                <option value="all">All Categories</option>
                                {category.map((c) => (
                                <option key={c._id} value={c._id}>
                                    {c.catName}
                                </option>
                                ))}
                            </select>

                            {/* Search Bar */}
                           <div className="relative w-80">
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    className="border rounded w-full p-2 pl-10 text-xl"
                                    value={search}
                                    onChange={(e) => {
                                    setSearch(e.target.value);
                                    setPage(1);
                                    }}
                                />

                                {/* Search Icon */}
                                <Search className="absolute left-2 top-2.5 w-6 h-6 text-gray-500" />
                                </div>

                            </div>

                         <div className="grid grid-cols-4 sm:grid-cols-2 lg:grid-cols-4 gap-5 px-8">
                            {products.length > 0 ?
                                    (products.map((product) => (
                                        <ProductCard key={product._id} product={product}/>
                                    ))
                            ) : (
                                <p className="text-center col-span-full">No products available.</p>
                            )}
                            {loading && <p className="text-center col-span-full">Loading...</p>}
                        </div>

                         {/* Pagination */}
                        <div className="flex justify-center mt-6 gap-3">
                            <button
                                disabled={page <= 1}
                                onClick={() => setPage(page - 1)}
                                className="px-4 py-2 border rounded disabled:opacity-50"
                            >
                                Prev
                            </button>

                            <span className="px-4 py-2 font-semibold">
                                {page} / {totalPages}
                            </span>

                            <button
                                disabled={page >= totalPages}
                                onClick={() => setPage(page + 1)}
                                className="px-4 py-2 border rounded disabled:opacity-50"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}
            </div>

        </div>
    );
}

export default productList;
    