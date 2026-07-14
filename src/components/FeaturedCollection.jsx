import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const FeaturedCollection = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/api/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch(console.error);
  }, []);

  // Duplicate products for smooth infinite loop
  const loopProducts = [...products, ...products, ...products];

  return (
    <div className="w-full py-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-10">
        <h2 className="text-[#B71C1C] text-3xl font-semibold text-center md:text-left">
          Featured Collection
        </h2>
      </div>

      {/* Full Width Automatic Marquee */}
      <div className="relative w-full">
        <div 
          className="flex gap-8 animate-marquee whitespace-nowrap"
          style={{
            width: "max-content",
          }}
        >
          {loopProducts.map((product, index) => (
            <Link
              key={`${product.id}-${index}`}
              to={`/product/${product.id}`}
              className="group w-64 md:w-72 flex-shrink-0 block"
            >
              <div className="aspect-square bg-gray-200 rounded-2xl overflow-hidden">
                <img
                  src={`/images/${product.img}`}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <p className="text-center mt-4 font-medium text-lg">
                {product.name}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedCollection;