import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="text-center py-20 text-xl">Loading products...</div>;

  return (
    <div className="min-h-screen bg-white">
      {/* Premium Products Header */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold text-gray-900">Premium Products Collection</h1>
          <p className="text-gray-600 mt-3 text-lg">Discover our wide range of products</p>
        </div>
      </div>

      {/* Search & Filter Bar */}
<div className="top-0 bg-white z-10">
  <div className="max-w-7xl w-[90%] mx-auto border-b border-gray-200">
    <div className="px-6 py-6 flex flex-col md:flex-row gap-4 items-center">
      <div className="flex-1 w-full relative">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full border border-gray-300 rounded-2xl py-3 px-5 pl-12 text-sm focus:outline-none focus:border-gray-400"
        />
        <Search className="absolute left-5 top-3.5 text-gray-400" size={20} />   {/* ← غيرتها */}
      </div>

      <div>
        <select className="border border-gray-300 rounded-2xl py-3 px-6 text-sm focus:outline-none">
          <option>All Categories</option>
          <option>Caps</option>
          <option>T-Shirts</option>
          <option>Accessories</option>
        </select>
      </div>
    </div>
  </div>
</div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <Link 
              to={`/product/${product.id}`} 
              key={product.id}
              className="group"
            >
              <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                <div className="aspect-[4/4] bg-gray-100 overflow-hidden">
                  <img 
                    src={`http://localhost:5000/images/${product.img}`} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-medium text-lg">{product.name}</h3>
                  <p className="text-gray-500 text-sm mt-1">One Size • Adjustable</p>
                  <div className="mt-4 flex justify-between items-end">
                    <div>
                      <p className="font-bold text-xl">EGP {product.price}</p>
                    </div>
                    <p className="text-xs text-gray-500">4 colors</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;