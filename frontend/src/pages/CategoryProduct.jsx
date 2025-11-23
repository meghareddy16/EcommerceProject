import { useEffect, useState } from "react";
import axios from "../api/axios";
import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";

function ProductsByCategory() {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`/products/category/${categoryId}`)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [categoryId]);

  return (
    <div className="max-w-12xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-4 text-center">Products</h1>

      {loading && <p>Loading...</p>}

      {!loading && products.length === 0 && (
        <p>No products found in this category.</p>
      )}

      <div className="grid grid-cols-4 sm:grid-cols-3 lg:grid-cols-4 gap-x-8">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default ProductsByCategory;
