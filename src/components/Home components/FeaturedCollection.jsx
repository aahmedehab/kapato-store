import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

const FeaturedCollection = () => {
  const [products, setProducts] = useState([]);
const [loading, setLoading] = useState(true);
const [imagesLoading, setImagesLoading] = useState(true);
  const [imagesMap, setImagesMap] = useState({});
  const scrollRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
  fetch("/images/images.json")
    .then((res) => res.json())
    .then(setImagesMap)
    .catch(console.error)
    .finally(() => setImagesLoading(false));
}, []);

const isLoading = loading || imagesLoading;

  const getImage = (product) => {
    if (!product.variants?.length) return "";
    const variant = product.variants[0];
    const key = `${product.folder_path}/${variant.folder_name}`;
    const images = imagesMap[key] || [];
    return images.length ? `/images/${key}/${images[0]}` : "";
  };

  useEffect(() => {
  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API_URL}/api/products`);

      if (!res.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  fetchProducts();
}, []);

  const scroll = (direction) => {
    const container = scrollRef.current;
    if (!container || products.length === 0) return;

    const cardWidth = 300;
    const maxScroll = container.scrollWidth - container.clientWidth;

    if (direction === "right") {
      if (container.scrollLeft >= maxScroll - 10) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        container.scrollBy({ left: cardWidth, behavior: "smooth" });
      }
    } else {
      if (container.scrollLeft <= 10) {
        container.scrollTo({ left: maxScroll, behavior: "smooth" });
      } else {
        container.scrollBy({ left: -cardWidth, behavior: "smooth" });
      }
    }
  };

  // Auto play
  const startAutoPlay = () => {
    stopAutoPlay();
    intervalRef.current = setInterval(() => {
      scroll("right");
    }, 3500); // كل 3.5 ثانية
  };

  const stopAutoPlay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    if (products.length > 0) {
      startAutoPlay();
    }
    return () => stopAutoPlay();
  }, [products]);

  return (
    <section className="w-full py-16 md:py-20 bg-secondary relative overflow-hidden">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 mb-10 md:mb-14">
<div className="flex flex-col items-start gap-5">
  <div>
    <h2 className="text-4xl md:text-5xl font-bold text-primary tracking-tight">
      Our Collection
    </h2>
    <p className="text-gray-500 mt-3 text-lg max-w-md">
      Five icons. Endless summer.
    </p>
  </div>

  <Link
    to="/shop"
    className="group inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/70 transition-colors"
  >
    Shop All
    <span className="group-hover:translate-x-1 transition-transform">→</span>
  </Link>
</div>
      </div>

      {/* Carousel */}
      <div
        className="relative max-w-7xl mx-auto px-6"
        onMouseEnter={stopAutoPlay}
        onMouseLeave={startAutoPlay}
      >
        {/* أزرار التحكم */}
        {!isLoading && (
      <>
        <button
          onClick={() => {
            scroll("left");
            stopAutoPlay();
            startAutoPlay(); // يعيد الـ timer بعد الضغط
          }}
          className="absolute left-2 md:left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-300"
          aria-label="Previous"
        >
          <ChevronLeft size={22} />
        </button>

        <button
          onClick={() => {
            scroll("right");
            stopAutoPlay();
            startAutoPlay();
          }}
          className="absolute right-2 md:right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-300"
          aria-label="Next"
        >
          <ChevronRight size={22} />
        </button>
  </>
)}
        {/* المنتجات */}
        <div
          ref={scrollRef}
          className="flex gap-6 md:gap-8 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-6 px-10 md:px-14 hide-scrollbar"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {isLoading
  ? Array.from({ length: 4 }).map((_, index) => (
      <div
        key={index}
        className="flex-shrink-0 w-64 md:w-72 snap-center animate-pulse"
      >
        {/* Image Skeleton */}
        <div className="aspect-[4/5] bg-gray-200 rounded-2xl" />

        {/* Name Skeleton */}
        <div className="mt-4">
          <div className="h-5 bg-gray-200 rounded-md w-3/4" />
        </div>

        {/* Price Skeleton */}
        <div className="mt-2 flex items-center gap-2">
          <div className="h-4 bg-gray-200 rounded-md w-20" />
          <div className="h-4 bg-gray-200 rounded-md w-14" />
        </div>

        {/* Save Skeleton */}
        <div className="mt-2">
          <div className="h-3 bg-gray-200 rounded-md w-24" />
        </div>
      </div>
    ))
  : products.map((product) => (
      <Link
        key={product.id}
        to={`/product/${product.id}`}
        className="group flex-shrink-0 w-64 md:w-72 snap-center"
      >
        <div className="aspect-[4/5] bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 group-hover:shadow-xl transition-all duration-500">
          <img
            src={getImage(product)}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        </div>

        <h3 className="mt-4 font-semibold text-gray-900">
          {product.name}
        </h3>

        <div className="flex items-center gap-2 mt-2">
          {product.old_price &&
            Number(product.old_price) > Number(product.price) && (
              <p className="text-sm text-gray-400 line-through">
                {Number(product.old_price).toFixed(0)} EGP
              </p>
            )}

          <p className="font-bold text-gray-900">
            {Number(product.price).toFixed(0)} EGP
          </p>
        </div>

        {product.old_price &&
          Number(product.old_price) > Number(product.price) && (
            <p className="text-xs font-medium text-green-600 mt-1">
              Save{" "}
              {(Number(product.old_price) - Number(product.price)).toFixed(0)}{" "}
              EGP
            </p>
          )}
      </Link>
    ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollection;