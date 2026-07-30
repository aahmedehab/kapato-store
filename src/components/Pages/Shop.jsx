// import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { Search } from 'lucide-react';

// const API_URL = import.meta.env.VITE_API_URL;

// const Shop = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');

//   useEffect(() => {
// fetch(`${API_URL}/api/products`)
//       .then(res => res.json())
//       .then(data => {
//         setProducts(data);
//         setLoading(false);
//       })
//       .catch(err => {
//         console.error(err);
//         setLoading(false);
//       });
//   }, []);

//   const filteredProducts = products.filter(product =>
//     product.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   if (loading) return <div className="text-center py-20 text-xl bg-secondary-30">Loading products...</div>;

//   return (
//     <div className="min-h-screen bg-secondary-30">
//       {/* Premium Products Header */}
//       <div className="py-16">
//         <div className="max-w-7xl mx-auto px-6 text-center">
//           <h1 className="text-4xl font-bold text-primary">Premium Products Collection</h1>
//           <p className="text-primary-70 mt-3 text-lg">Discover our wide range of products</p>
//         </div>
//       </div>

//       {/* Search & Filter Bar */}
// <div className="top-0 z-10">
//   <div className="max-w-7xl w-[90%] mx-auto border-b border-gray-200">
//     <div className="px-6 py-6 flex flex-col md:flex-row gap-4 items-center">
//       <div className="flex-1 w-full relative">
//         <input
//           type="text"
//           placeholder="Search products..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="w-full border border-gray-300 rounded-2xl py-3 px-5 pl-12 text-sm focus:outline-none focus:border-gray-400"
//         />
//         <Search className="absolute left-5 top-3.5 text-gray-400" size={20} />   {/* ← غيرتها */}
//       </div>

//       <div>
//         <select className="border border-gray-300 rounded-2xl py-3 px-6 text-sm focus:outline-none">
//           <option>All Categories</option>
//           <option>All products</option>
//         </select>
//       </div>
//     </div>
//   </div>
// </div>

//       {/* Products Grid */}
//       <div className="max-w-7xl mx-auto px-6 py-12">
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
//           {filteredProducts.map((product) => (
//             <Link 
//               to={`/product/${product.id}`} 
//               key={product.id}
//               className="group"
//             >
//               <div className="bg-secondary rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
//                 <div className="aspect-[4/4] bg-gray-100 overflow-hidden">
//                   <img 
//                     src={`/images/${product.img}`}
//                     alt={product.name}
//                     className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//                   />
//                 </div>
//                 <div className="p-6">
//                   <h3 className="font-medium text-lg">{product.name}</h3>
//                   <p className="text-gray-500 text-sm mt-1">One Size • Adjustable</p>
//                   <div className="mt-4 flex justify-between items-end">
//                     <div>
//                       <p className="font-bold text-xl">EGP {product.price}</p>
//                     </div>
// <p className="text-xs text-gray-500">
//   {product.colors_count} {product.colors_count == 1 ? "color" : "colors"}
// </p>
//                   </div>
//                 </div>
//               </div>
//             </Link>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Shop;







import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';

import { getImages, getFirstImage } from "../../utils/images";

const API_URL = import.meta.env.VITE_API_URL;

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('collections'); // 'collections' | 'all'

  const [imagesMap, setImagesMap] = useState({});
const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/api/products`)
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

useEffect(() => {
  fetch("/images/images.json")
    .then((res) => res.json())
    .then((data) => {
      setImagesMap(data);
      setImagesLoaded(true);
    })
    .catch((err) => {
      console.error(err);
      setImagesLoaded(true);
    });
}, []);


//   const getImages = (product, variant) => {
//   const key = `${product.folder_path}/${variant.folder_name}`;

//   return (imagesMap[key] || []).map(
//     (file) => `/images/${key}/${file}`
//   );
// };


  // لو All Collections → المنتجات العادية
  // لو All Products → نفرد الـ variants
const displayItems =
  filter === "collections"
    ? products.map((product) => ({
        ...product,
img: getFirstImage(imagesMap, product),
      }))
    : products.flatMap((product) =>
        (product.variants || []).map((variant) => ({
          ...product,
          variantId: variant.id,
          img: getImages(imagesMap, product, variant)[0] || "",
          color: variant.color?.name || "Default",
          sku: variant.sku,
          stock: variant.stock,
          uniqueKey: `${product.id}-${variant.id}`,
        }))
      );

  const filteredItems = displayItems.filter((item) =>
    item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.color?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.sku?.toLowerCase().includes(searchTerm.toLowerCase())
  );

if (loading || !imagesLoaded) {
  return (
    <div className="text-center py-20">
      Loading products...
    </div>
  );
}

  return (
    <div className="min-h-screen bg-secondary-30">
      {/* Header */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold text-primary">Premium Products Collection</h1>
          <p className="text-primary-70 mt-3 text-lg">Discover our wide range of products</p>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="top-0 z-10">
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
              <Search className="absolute left-5 top-3.5 text-gray-400" size={20} />
            </div>

            <div>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="border border-gray-300 rounded-2xl py-3 px-6 text-sm focus:outline-none"
              >
                <option value="collections">All Collections</option>
                <option value="all">All Products</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredItems.map((item) => (
            <Link
              to={`/product/${item.id}`}
              key={item.uniqueKey || item.id}
              className="group"
            >
              <div className="bg-secondary rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                <div className="aspect-[4/4] bg-gray-100 overflow-hidden">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-medium text-lg">{item.name}</h3>
                  
                  {/* لو All Products نعرض اللون */}
                  {filter === 'all' ? (
                    <p className="text-gray-500 text-sm mt-1">{item.color}</p>
                  ) : (
                    <p className="text-gray-500 text-sm mt-1">One Size • Adjustable</p>
                  )}

                  <div className="mt-4 flex justify-between items-end">
                    <div>
                      <p className="font-bold text-xl">EGP {item.price}</p>
                    </div>

                    {filter === 'collections' ? (
                      <p className="text-xs text-gray-500">
                        {item.colors_count} {item.colors_count == 1 ? "color" : "colors"}
                      </p>
                    ) : (
                      <p className="text-xs text-gray-500">
                        {item.stock > 0 ? `${item.stock} in stock` : 'Out of stock'}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            No products found
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;