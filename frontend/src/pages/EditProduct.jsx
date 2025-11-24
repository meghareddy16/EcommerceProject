import { useEffect, useState } from 'react';
import axios from '../api/axios';
import toast from 'react-hot-toast';
import { useParams, useNavigate } from 'react-router-dom';

function EditProduct() {

    const {id} = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState(null);
    const [category, setCategory] = useState(null);
    const [stockQuantity, setStockQuantity] = useState(null);
    const [categoryList, setCategoryList] = useState(null);
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [preview, setPreview] = useState('');

    useEffect(() => {
         const fetchProduct = async () => {
            try{
                    const response = await axios.get(`/products/oneProduct/${id}`);
                    const p = response.data;
                    // console.log(p);
                    setName(p.itemName);
                    setPrice(p.price);
                    setDescription(p.description);
                    setCategory(p.category?._id || p.category || "");
                    setStockQuantity(p.stockQuantity);
                    setPreview(`https://backend-u4x0.onrender.com/uploads/${p.imageUrl}`)
                    // console.log(`Product with ${id} fetched Successfully`);
                }
            catch(error){
                toast.error("Failed to update Product", error);
                console.error(error);
            }finally{
                setLoading(false);
            }
        }; fetchProduct();
    },[id]);

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

    const handleImage = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setPreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append('itemName', name);
        formData.append('price', price);
        formData.append('description', description);
        formData.append('category', category);
        formData.append('stockQuantity', stockQuantity);
        if(image) formData.append('image', image);

        try{
            const response = await axios.put(`/products/updateProduct/${id}`,formData, {
                headers: {'Content-Type': 'multipart/form-data',},
            });
            console.log(response.data);
            toast.success(`Product with ${id} updated successfully`);
            navigate('/list');
        }catch(error){
            toast.error("failed to update product")
            console.error(error);
        }finally{
            setLoading(false);
        }
    };

   return (
        <section className=" bg-white dark:bg-gray-900">
            <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Edit product</h2>
                <form onSubmit={handleSubmit} >
                    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                        <div className="sm:col-span-2">
                            <label for="name" className="block mb-2 text-xl font-medium text-gray-900 dark:text-white">Product Name</label>
                            <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                             placeholder="Type product name" value={name} onChange={(e)=>setName(e.target.value)} required />
                        </div>
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
                            placeholder="e.g.12" value={stockQuantity} onChange={(e)=>setStockQuantity(e.target.value)} />
                        </div> 
                        <div className="sm:col-span-2">
                            <label for="description" className="block mb-2 text-xl font-medium text-gray-900 dark:text-white">Description</label>
                            <textarea id="description" rows="8" className="block p-2.5 w-full text-xl text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
                            placeholder="Your description here" value={description || ''} onChange={(e)=>setDescription(e.target.value)}></textarea>
                        </div>
                        <div>
                            <label className="block mb-2 text-xl font-medium text-gray-900 dark:text-white" for="user_avatar">Upload file</label>
                            <input className="p-3 block w-full text-xl text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" 
                            aria-describedby="user_avatar_help" id="user_avatar" name="image" onChange={handleImage} accept='image/*' type="file"/>
                            {preview && (
                                <img
                                src={preview}
                                alt="Product Preview"
                                className="mt-3 w-32 h-32 object-cover rounded-md border"
                                />
                            )}
                        </div>
                    </div>
                    <button type="submit"  disabled={loading}   className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-l font-medium text-center text-white bg-blue-600 rounded-lg focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 hover:bg-blue-700">
                       {loading ? 'Updating...' : 'Update'}
                    </button>
                </form>
            </div>
        </section>
    );
   
}

export default EditProduct;