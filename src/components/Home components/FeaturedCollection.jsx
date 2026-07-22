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

  return (
    <div className="w-full py-10 bg-[#f8f4ed] overflow-hidden">
      <div className="mx-auto px-6 mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between">
          <div>
            <h2 className="text-[#0a2540] text-4xl md:text-5xl font-bold tracking-tight">
              Our Collection
            </h2>
            <p className="text-gray-600 mt-3 text-lg">
              Five icons. Endless summer.
            </p>
          </div>
          
          <Link 
            to="/shop" 
            className="mt-6 md:mt-0 group flex items-center gap-2 text-[#0a2540] font-medium hover:text-black transition-colors"
          >
            SHOP ALL 
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
      </div>

      <div className="relative w-full overflow-hidden">
        <div className="flex gap-8 animate-marquee whitespace-nowrap">
          {[...products, ...products].map((product, index) => (
            <Link
              key={`${product.id}-${index}`}
              to={`/product/${product.id}`}
              className="group inline-block w-72 flex-shrink-0"
            >
              <div className="aspect-square bg-white rounded-3xl overflow-hidden shadow-md border border-gray-100 group-hover:shadow-2xl transition-all duration-700">
                <img
                  src={`/images/${product.img}`}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              
              <div className="text-center mt-6">
                <p className="font-semibold text-[#0a2540] text-xl tracking-tight">
                  {product.name}
                </p>
                <p className="text-gray-500 mt-1.5">EGP 550</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedCollection;