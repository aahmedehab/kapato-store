import { useParams, useNavigate } from "react-router-dom";
import { useCart } from '../../context/CartContext';
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Copy, Crown, Minus, Plus } from 'lucide-react';
import { PRODUCT_DESCRIPTIONS } from "../../data/constants";

const API_URL = import.meta.env.VITE_API_URL;

const TABS = [
  'Description',
  'Material & Finish',
  // 'Customization Guide',
  // 'Design Guide',
  'Care Guide',
];

const TAB_CONTENT = {
  Description: PRODUCT_DESCRIPTIONS.WASHED_CAP,
  "Material & Finish": PRODUCT_DESCRIPTIONS.MATERIAL,
  // "Customization Guide": PRODUCT_DESCRIPTIONS.CUSTOMIZATION,
  // "Design Guide": PRODUCT_DESCRIPTIONS.DESIGN,
  "Care Guide": PRODUCT_DESCRIPTIONS.CARE,
};

// const PRINTING_TECHNIQUES = [
//   {
//     title: 'Embroidery',
//     name: 'Embroidery - Hat',
//     price: 125,
//     dimensions: '9cm x 5cm',
//   },
//   {
//     title: 'DTF Printing',
//     name: 'DTF - Hat',
//     price: 55,
//     dimensions: '9cm x 5cm',
//   },
// ];

// const variants = [
//   { color: '#F9A8D4', sku: 'WSHD-CAP-PALE PINK', img: '/images/pink.png' },
//   { color: '#1F2937', sku: 'WSHD-CAP-BLACK', img: '/images/black.png' },
//   { color: '#7F1D1D', sku: 'WSHD-CAP-MAROON', img: '/images/maroon.png' },
//   { color: '#1E3A8A', sku: 'WSHD-CAP-NAVY', img: '/images/navy.png' },
//   { color: '#374151', sku: 'WSHD-CAP-CHARCOAL', img: '/images/charcoal.png' },
//   { color: '#4B5563', sku: 'WSHD-CAP-GRAY', img: '/images/gray.png' },
//   { color: '#FDE047', sku: 'WSHD-CAP-YELLOW', img: '/images/yellow.png' },
//   { color: '#6B21A8', sku: 'WSHD-CAP-PURPLE', img: '/images/purple.png' },
// ];

const formatPrice = (amount) => `EGP ${amount.toFixed(2)}`;

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('Description');
  const [copied, setCopied] = useState(false);

const [product, setProduct] = useState(null);
const [variants, setVariants] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchProduct = async () => {
    try {
      const res = await fetch(`${API_URL}/api/products/${id}`);

      if (!res.ok) {
        throw new Error("Failed to fetch product");
      }

      const data = await res.json();

      setProduct({
        ...data.product,
        price: Number(data.product.price),
      });

      setVariants(data.variants);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  fetchProduct();
}, [id]);

  if (loading) return <div className="text-center py-20 text-xl">Loading product...</div>;
  if (!product) return <div>Product not found</div>;

  const selectedVariant = variants[selectedColorIndex];
  const subtotal = product.price * quantity;

  const handleCopySku = async () => {
    try {
      await navigator.clipboard.writeText(selectedVariant.sku);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const handlePrevImage = () => {
    setSelectedImageIndex((prev) =>
      prev === 0 ? variants.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prev) =>
      prev === variants.length - 1 ? 0 : prev + 1
    );
  };

  const buildCartItem = () => ({
    id: product.id,
    variantId: selectedVariant.id,
    name: product.name,
    price: product.price,
    sku: selectedVariant.sku,
    img: `/images/${selectedVariant.image}`,
    color: selectedVariant.color_name,
    hexCode: selectedVariant.hex_code,
    quantity,
  });

  const handleAddToCart = () => {
    addToCart(buildCartItem());
  };

  const handleBuyNow = () => {
    addToCart(buildCartItem());
    navigate("/cart");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 lg:py-12 bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16">
        {/* Left Column — Gallery & Logistics */}
        <div className="space-y-4 sm:space-y-5">
          <div className="bg-[#F3F4F6] rounded-xl sm:rounded-2xl overflow-hidden relative aspect-square flex items-center justify-center">
            <img
              src={`/images/${selectedVariant?.image}`}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={handlePrevImage}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition"
              aria-label="Previous image"
            >
              <ChevronLeft size={18} className="text-gray-700 sm:w-5 sm:h-5" />
            </button>
            <button
              type="button"
              onClick={handleNextImage}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition"
              aria-label="Next image"
            >
              <ChevronRight size={18} className="text-gray-700 sm:w-5 sm:h-5" />
            </button>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
            {variants.map((variant, i) => (
              <button
                key={variant.sku}
                type="button"
                onClick={() => {
                  setSelectedImageIndex(i);
                  setSelectedColorIndex(i);
                }}
                className={`w-14 h-14 sm:w-[72px] sm:h-[72px] bg-[#F3F4F6] rounded-lg sm:rounded-xl overflow-hidden flex-shrink-0 border-2 transition ${
                  selectedImageIndex === i
                    ? 'border-blue-600'
                    : 'border-transparent hover:border-gray-300'
                }`}
              >
                <img
                  src={`/images/${variant.image}`}
                  alt=""
                  className="w-full h-full object-contain p-1"
                />
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 min-[480px]:grid-cols-2 gap-3 sm:gap-4 pt-1 sm:pt-2">
            <div className="border border-gray-200 rounded-xl p-4 sm:p-5 bg-white">
              <p className="text-sm font-semibold text-gray-900 mb-1.5 sm:mb-2">
                Production time
              </p>
              <p className="text-base sm:text-lg font-bold text-blue-600 mb-1">within 3 days</p>
              <p className="text-xs text-gray-500 leading-relaxed">
                Standard production timeline for this item
              </p>
            </div>
            <div className="border border-gray-200 rounded-xl p-4 sm:p-5 bg-white">
              <p className="text-sm font-semibold text-gray-900 mb-1.5 sm:mb-2">
                Delivery time
              </p>
              <p className="text-base sm:text-lg font-bold text-pink-500 mb-1">
                1-2 Working days
              </p>
              <p className="text-xs text-gray-500 leading-relaxed">
                For orders outside Greater Cairo
              </p>
            </div>
          </div>
        </div>

        {/* Right Column — Product Info & Purchase */}
        <div className="space-y-4 sm:space-y-5">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
              {product.name}
            </h1>
            <div className="flex flex-wrap items-center gap-2 mt-2 sm:mt-3">
              <span className="inline-flex items-center gap-2 bg-gray-100 text-gray-600 text-[11px] sm:text-xs font-mono px-2.5 sm:px-3 py-1.5 rounded-lg max-w-full">
                <span className="truncate">SKU: {selectedVariant.sku}</span>
                <button
                  type="button"
                  onClick={handleCopySku}
                  className="text-gray-400 hover:text-gray-600 transition"
                  aria-label="Copy SKU"
                >
                  <Copy size={14} />
                </button>
              </span>
              {copied && (
                <span className="text-xs text-green-600">Copied!</span>
              )}
            </div>
          </div>

          <div>
            <p className="font-semibold text-gray-900 mb-3">Color</p>
            <div className="flex gap-2.5 flex-wrap">
              {variants.map((variant, i) => (
                <button
                  key={variant.sku}
                  type="button"
                  onClick={() => {
                    setSelectedColorIndex(i);
                    setSelectedImageIndex(i);
                  }}
                  className={`w-10 h-10 rounded-lg border-2 transition hover:scale-105 ${
                    selectedColorIndex === i
                      ? 'border-blue-600 ring-1 ring-blue-600'
                      : 'border-gray-200'
                  }`}
                  style={{ backgroundColor: variant.hex_code }}
                  aria-label={`Select color ${variant.sku}`}
                />
              ))}
            </div>
          </div>

          <div className="bg-[#F3F4F6] rounded-xl px-4 sm:px-5 py-3.5 sm:py-4 space-y-2">
            <div className="flex justify-between items-center gap-3 text-sm">
              <span className="text-gray-500 shrink-0">SKU:</span>
              <span className="font-mono text-gray-700 text-[11px] sm:text-xs text-right truncate">
                {selectedVariant.sku}
              </span>
            </div>
            <div className="flex justify-between items-center gap-3">
              <span className="text-gray-700 font-medium text-sm sm:text-base">Item Price:</span>
              <span className="font-bold text-gray-900 text-base sm:text-lg">
                {formatPrice(product.price)}
              </span>
            </div>
          </div>

          <div>
            <div className="flex flex-wrap justify-between items-center gap-2 mb-3">
              <p className="font-semibold text-gray-900">Quantity</p>
              <button
                type="button"
                className="text-xs sm:text-sm text-pink-500 hover:text-pink-600 font-medium"
              >
                Quantity discounts
              </button>
            </div>
            <div className="inline-flex items-center border border-gray-200 rounded-xl overflow-hidden">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-11 h-11 flex items-center justify-center hover:bg-gray-50 transition border-r border-gray-200"
                aria-label="Decrease quantity"
              >
                <Minus size={16} className="text-gray-600" />
              </button>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) =>
                  setQuantity(Math.max(1, parseInt(e.target.value, 10) || 1))
                }
                className="w-14 h-11 text-center text-base font-semibold outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="w-11 h-11 flex items-center justify-center hover:bg-gray-50 transition border-l border-gray-200"
                aria-label="Increase quantity"
              >
                <Plus size={16} className="text-gray-600" />
              </button>
            </div>
          </div>

          <div className="border border-gray-200 rounded-xl p-4 sm:p-5 bg-white space-y-3">
            <div className="flex justify-between gap-3 text-xs sm:text-sm text-gray-600">
              <span>Unit Price (Item):</span>
              <span className="shrink-0">{formatPrice(product.price)}</span>
            </div>
            <div className="flex justify-between gap-3 text-xs sm:text-sm text-gray-600">
              <span>Subtotal ({quantity} items):</span>
              <span className="shrink-0">{formatPrice(subtotal)}</span>
            </div>
            <hr className="border-gray-200" />
            <div className="flex flex-col min-[480px]:flex-row min-[480px]:justify-between min-[480px]:items-center gap-1 min-[480px]:gap-3">
              <span className="font-bold text-gray-900 text-sm sm:text-base">
                Total (Item Price Only):
              </span>
              <span className="font-bold text-blue-600 text-lg sm:text-xl">
                {formatPrice(subtotal)}
              </span>
            </div>
            {/* <p className="text-[11px] sm:text-xs text-gray-400 pt-1">
              * Printing cost will be added on customization
            </p> */}
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={handleAddToCart}
              className="flex-1 bg-blue-600 text-white py-3.5 rounded-xl text-sm sm:text-base font-semibold hover:bg-blue-700 transition"
            >
              Add to Cart
            </button>
            <button
              type="button"
              className="flex-1 bg-gray-800 text-white py-3.5 rounded-xl text-sm sm:text-base font-semibold hover:bg-gray-900 transition"
              onClick={handleBuyNow}
            >
              Buy it Now
            </button>
          </div>

          <div className="border border-yellow-300 bg-yellow-50 rounded-xl px-4 sm:px-5 py-3.5 sm:py-4 flex items-start gap-3">
            <Crown size={18} className="text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-gray-900 text-sm">
                Save 15% with Platinum
              </p>
              <p className="text-xs text-gray-600 mt-0.5">
                Join now and unlock exclusive discounts on this product.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section — Full Width */}
      <div className="mt-10 sm:mt-14">
        <div className="flex border-b border-gray-200 overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
          {TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`px-3 sm:px-5 py-3 sm:py-3.5 text-xs sm:text-sm font-medium whitespace-nowrap border-b-2 transition shrink-0 ${
                activeTab === tab
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="mt-4 sm:mt-6 border border-gray-200 rounded-xl bg-[#F9FAFB] p-4 sm:p-6 min-h-[100px] sm:min-h-[120px]">
          <div className="text-sm sm:text-base text-gray-600 leading-relaxed">
            {TAB_CONTENT[activeTab]}
          </div>
        </div>
      </div>

      {/* Printing Techniques — Full Width */}
      {/* <div className="mt-14 pb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Printing Techniques
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {PRINTING_TECHNIQUES.map((technique) => (
            <div
              key={technique.title}
              className="border border-gray-200 rounded-xl p-5 bg-white"
            >
              <h3 className="font-semibold text-gray-900 mb-4">
                {technique.title}
              </h3>
              <div className="bg-[#EFF6FF] rounded-xl px-5 py-4 flex justify-between items-center">
                <span className="text-sm font-medium text-gray-800">
                  {technique.name}
                </span>
                <span className="font-bold text-blue-600">
                  {formatPrice(technique.price)}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-3">{technique.dimensions}</p>
            </div>
          ))}
        </div>
      </div> */}
      {/* Physical Dimensions */}
      <div className="mt-10 sm:mt-14 pb-4 sm:pb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
          Physical Dimensions
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-blue-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center">
            <div className="text-2xl sm:text-4xl font-bold text-blue-600 mb-1">100</div>
            <div className="text-xs sm:text-sm text-gray-600">Weight (g)</div>
          </div>
          <div className="bg-emerald-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center">
            <div className="text-2xl sm:text-4xl font-bold text-emerald-600 mb-1">2</div>
            <div className="text-xs sm:text-sm text-gray-600">Length (cm)</div>
          </div>
          <div className="bg-purple-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center">
            <div className="text-2xl sm:text-4xl font-bold text-purple-600 mb-1">2</div>
            <div className="text-xs sm:text-sm text-gray-600">Width (cm)</div>
          </div>
          <div className="bg-orange-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center">
            <div className="text-2xl sm:text-4xl font-bold text-orange-600 mb-1">2</div>
            <div className="text-xs sm:text-sm text-gray-600">Height (cm)</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
