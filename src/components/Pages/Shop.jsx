import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { useCart } from '../../context/CartContext';

import { getImages, getFirstImage } from "../../utils/images";

const API_URL = import.meta.env.VITE_API_URL;

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('collections'); // 'collections' | 'all'

  const [imagesMap, setImagesMap] = useState({});
const [imagesLoaded, setImagesLoaded] = useState(false);

const { addToCart } = useCart();
const [addingId, setAddingId] = useState(null);
const [addedId, setAddedId] = useState(null);

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

  const handleAddToCart = (item) => {
  const itemKey = item.uniqueKey || item.id;

  // لو هو بالفعل بيضيف أو اتضاف، متعملش حاجة
  if (addingId === itemKey || addedId === itemKey) return;

  setAddingId(itemKey);
  setAddedId(null);

  // نحدد الـ variant
  let selectedVariant;
  let img = item.img;

  if (filter === "all") {
    // في حالة All Products → الـ variant موجود بالفعل
    selectedVariant = {
      id: item.variantId,
      sku: item.sku,
      color: { name: item.color },
    };
  } else {
    // في حالة Collections → ناخد أول variant
    selectedVariant = item.variants?.[0];
  }

  if (!selectedVariant) {
    console.error("No variant found");
    setAddingId(null);
    return;
  }

  const cartItem = {
    id: item.id,
    variantId: selectedVariant.id,
    name: item.name,
    price: Number(item.price),
    sku: selectedVariant.sku,
    img: img,
    color: selectedVariant.color?.name || item.color || "Default",
    hexCode: selectedVariant.color?.hex_code || null,
    quantity: 1,
  };

  // أنيميشن بسيطة
  setTimeout(() => {
    addToCart(cartItem);
    setAddingId(null);
    setAddedId(itemKey);

    // يرجع بعد ثانيتين
    setTimeout(() => {
      setAddedId(null);
    }, 2000);
  }, 600);
};

if (loading || !imagesLoaded) {
  return (
    <div>
      {/* Header Skeleton */}
      <div className="py-20 text-center">
        <div className="h-10 w-72 bg-gray-200 rounded-lg mx-auto animate-pulse" />
        <div className="h-5 w-96 max-w-[90%] bg-gray-200 rounded-lg mx-auto mt-5 animate-pulse" />
      </div>

      {/* Search & Filter Skeleton */}
      <div className="top-0 z-10">
        <div className="max-w-7xl w-[90%] mx-auto border-b border-gray-200">
          <div className="px-6 py-6 flex flex-col md:flex-row gap-4 items-center">
            
            <div className="flex-1 w-full h-12 bg-gray-200 rounded-2xl animate-pulse" />

            <div className="w-full md:w-48 h-12 bg-gray-200 rounded-2xl animate-pulse" />

          </div>
        </div>
      </div>

      {/* Products Skeleton */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="bg-secondary rounded-3xl overflow-hidden shadow-sm"
            >
              {/* Image */}
              <div className="aspect-[4/4] bg-gray-200 animate-pulse" />

              {/* Content */}
              <div className="p-6">
                <div className="h-6 w-3/4 bg-gray-200 rounded-md animate-pulse" />

                <div className="h-4 w-1/2 bg-gray-200 rounded-md mt-3 animate-pulse" />

                <div className="mt-5 flex justify-between items-end">
                  <div className="h-7 w-24 bg-gray-200 rounded-md animate-pulse" />

                  <div className="h-4 w-16 bg-gray-200 rounded-md animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
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

{/* Price + Stock */}
<div className="mt-4 flex justify-between items-end">
  <div>
    <div className="flex items-center gap-2">
      <p className="font-bold text-xl">
        EGP {Number(item.price).toFixed(0)}
      </p>

      {item.old_price &&
        Number(item.old_price) > Number(item.price) && (
          <p className="text-sm text-gray-400 line-through">
            EGP {Number(item.old_price).toFixed(0)}
          </p>
        )}
    </div>

    {item.old_price &&
      Number(item.old_price) > Number(item.price) && (
        <p className="text-xs font-medium text-green-600 mt-1">
          Save EGP{" "}
          {(Number(item.old_price) - Number(item.price)).toFixed(0)}
        </p>
      )}
  </div>

  {filter === "collections" ? (
    <p className="text-xs text-gray-500">
      {item.colors_count}{" "}
      {item.colors_count == 1 ? "color" : "colors"}
    </p>
  ) : (
    <p className="text-xs text-gray-500">
      {item.stock > 0 ? `${item.stock} in stock` : "Out of stock"}
    </p>
  )}
</div>

{/* Strong Add to Cart Button */}
{/* Strong Add to Cart Button */}
<button
  onClick={(e) => {
    e.preventDefault();
    e.stopPropagation();
    handleAddToCart(item);
  }}
  disabled={addingId === (item.uniqueKey || item.id) || addedId === (item.uniqueKey || item.id)}
  className={`mt-4 w-full flex items-center justify-center gap-2 text-sm font-medium py-2.5 rounded-xl transition-all duration-200 shadow-sm
    ${
      addedId === (item.uniqueKey || item.id)
        ? "bg-primary-dark text-white"
        : addingId === (item.uniqueKey || item.id)
        ? "bg-primary-80 text-white cursor-not-allowed"
        : "bg-primary text-white hover:bg-primary-dark hover:scale-[1.02] active:scale-[0.98]"
    }`}
>
  {addingId === (item.uniqueKey || item.id) ? (
    <>
      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
      Adding...
    </>
  ) : addedId === (item.uniqueKey || item.id) ? (
    "✓ Added"
  ) : (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="8" cy="21" r="1" />
        <circle cx="19" cy="21" r="1" />
        <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
      </svg>
      Add to Cart
    </>
  )}
</button>
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