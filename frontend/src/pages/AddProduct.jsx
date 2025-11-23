import {useState,useEffect} from 'react';
import axios from '../api/axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
    const [product, setProduct] = useState([]);
    const [itemName, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState(0);
    const [categoryList, setCategoryList] = useState([]);
    const [stockQuantity, setStockQuantity] = useState('');
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

        useEffect(() => {
            axios.get('/category/allCategory').then((response) => {
                setCategoryList(response.data);
                console.log(response.data);
                setLoading(false);
            }).catch((error) => {
                console.error(error);
                setLoading(true);
            })
        },[]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const formData = new FormData();
        formData.append('itemName', itemName);
        formData.append('price', price);
        formData.append('description', description);
        formData.append('category', category);
        formData.append('stockQuantity', stockQuantity);
        if (image) {
            formData.append('image', image);
        }
        console.log(formData);

        try {
            const response = await axios.post('/products/createProduct', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setProduct([...product, response.data]);
            console.log(response.data);
            // setName('');
            // setPrice('');
            // setDescription('');
            // setCategory('');
            // setImage(null);
            toast.success("Product created Successfully");
            navigate('/list');
        } catch (err) {
            setError('Failed to add product');
            toast.error("Failed to create Product");
        } finally {
            setLoading(false);
        }
    };

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    return (
       
        <section className=" bg-white dark:bg-gray-900">
            <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">Add new product</h2>
                <form action="" onSubmit={handleSubmit} >
                    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                        <div className="sm:col-span-2">
                            <label for="name" className="block mb-2 text-xl font-medium text-gray-900 dark:text-white">Product Name</label>
                            <input type="text" name="itemName" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                             placeholder="Type product name" value={itemName} onChange={(e)=>setName(e.target.value)} required />
                        </div>
                        {/* <div className="w-full">
                            <label for="brand" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Brand</label>
                            <input type="text" name="brand" id="brand" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Product brand" required/>
                        </div> */}
                        <div className="w-full">
                            <label for="price" className="block mb-2 text-xl font-medium text-gray-900 dark:text-white">Price</label>
                            <input type="number" name="price" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                             placeholder="Type Price" value={price} onChange={(e)=>setPrice(e.target.value)} required/>
                        </div>
                        <div>
                            <label for="category" className="block mb-2 text-xl font-medium text-gray-900 dark:text-white">Category</label>
                            <select id="category" value={category} onChange={(e) => setCategory(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                <option value="">Select Category</option>
                                {Array.isArray(categoryList) && categoryList.length > 0 ?(
                                categoryList.map((cat) => (
                                <option key={cat._id} value={cat._id}>
                                    {cat.catName}
                                </option>)
                            )):(<option disabled>No categories found</option>)}
                            </select>
                        </div>

                        <div>
                            <label for="item-weight" className="block mb-2 text-xl font-medium text-gray-900 dark:text-white">Stock Quantity</label>
                            <input type="number" name="stockQuantity" id="stockQuantity" className="bg-gray-50 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
                            placeholder="e.g.12" value={stockQuantity} onChange={(e)=>setStockQuantity(e.target.value)}/>
                        </div> 
                        <div className="sm:col-span-2">
                            <label for="description" className="block mb-2 text-xl font-medium text-gray-900 dark:text-white">Description</label>
                            <textarea id="description" rows="8" className="block p-2.5 w-full text-xl text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
                            placeholder="Your description here" onChange={(e)=>setDescription(e.target.value)}></textarea>
                        </div>
                        <div>
                            <label className="block mb-2 text-xl font-medium text-gray-900 dark:text-white" for="user_avatar">Upload file</label>
                            <input className="p-3 block w-full text-xl text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" 
                            aria-describedby="user_avatar_help" id="user_avatar" name="image" onChange={handleImageChange} accept='image/*' type="file"/>
                        </div>
                    </div>
                    <button type="submit"  disabled={loading}   className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-xl font-medium text-center text-white bg-blue-600 rounded-lg focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 hover:bg-blue-700">
                       {loading ? 'Adding...' : 'Add Product'}
                    </button>
                </form>
            </div>
        </section>
    );
};

export default AddProduct;

