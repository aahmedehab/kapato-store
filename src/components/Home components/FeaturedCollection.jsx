// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// const API_URL = import.meta.env.VITE_API_URL;


// const FeaturedCollection = () => {
//   const [products, setProducts] = useState([]);
//   const [imagesMap, setImagesMap] = useState({});

//   useEffect(() => {
//   fetch("/images/images.json")
//     .then((res) => res.json())
//     .then(setImagesMap)
//     .catch(console.error);
// }, []);

// const getImage = (product) => {
//   if (!product.variants?.length) return "";

//   const variant = product.variants[0];
//   const key = `${product.folder_path}/${variant.folder_name}`;

//   const images = imagesMap[key] || [];

//   return images.length
//     ? `/images/${key}/${images[0]}`
//     : "";
// };

//   useEffect(() => {
//     fetch(`${API_URL}/api/products`)
//       .then((res) => res.json())
//       .then((data) => setProducts(data))
//       .catch(console.error);
//   }, []);

//   return (
//     <div className="w-full py-10 bg-secondary overflow-hidden">
//       <div className="mx-auto px-6 mb-12">
// <div className="flex flex-col items-start">
//             <div>
//             <h2 className="text-primary text-4xl md:text-5xl font-bold tracking-tight">
//               Our Collection
//             </h2>
//             <p className="text-gray-600 mt-3 text-lg">
//               Five icons. Endless summer.
//             </p>
//           </div>
          
//           <Link 
//             to="/shop" 
//             className="mt-6 md:mt-0 group flex items-center gap-2 text-primary font-medium hover:text-primary-dark transition-colors"
//           >
//             SHOP ALL 
//             <span className="group-hover:translate-x-1 transition-transform">→</span>
//           </Link>
//         </div>
//       </div>

//       <div className="relative w-full overflow-hidden">
//         <div className="flex gap-8 animate-marquee whitespace-nowrap">
//           {[...products, ...products].map((product, index) => (
//             <Link
//               key={`${product.id}-${index}`}
//               to={`/product/${product.id}`}
//               className="group inline-block w-72 flex-shrink-0"
//             >
//               <div className="aspect-square bg-white rounded-3xl overflow-hidden shadow-md border border-gray-100 group-hover:shadow-2xl transition-all duration-700">
//                 <img
//                   src={getImage(product)}
//                   alt={product.name}
//                   className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
//                 />
//               </div>
              
//               <div className="text-center mt-6">
//                 <p className="font-semibold text-primary text-xl tracking-tight">
//                   {product.name}
//                 </p>
//                 <p className="text-gray-500 mt-1.5">{product.price} EGP</p>
//               </div>
//             </Link>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FeaturedCollection;

import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

const FeaturedCollection = () => {
  const [products, setProducts] = useState([]);
  const [imagesMap, setImagesMap] = useState({});
  const scrollRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    fetch("/images/images.json")
      .then((res) => res.json())
      .then(setImagesMap)
      .catch(console.error);
  }, []);

  const getImage = (product) => {
    if (!product.variants?.length) return "";
    const variant = product.variants[0];
    const key = `${product.folder_path}/${variant.folder_name}`;
    const images = imagesMap[key] || [];
    return images.length ? `/images/${key}/${images[0]}` : "";
  };

  useEffect(() => {
    fetch(`${API_URL}/api/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch(console.error);
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
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
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
            className="inline-flex items-center gap-2 text-sm font-medium text-primary border border-primary/30 px-5 py-2.5 rounded-full hover:bg-primary hover:text-white transition-all duration-300"
          >
            Shop All
            <span>→</span>
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

        {/* المنتجات */}
        <div
          ref={scrollRef}
          className="flex gap-6 md:gap-8 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-6 px-10 md:px-14 hide-scrollbar"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {products.map((product) => (
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

              <div className="mt-5 text-center">
                <h3 className="font-semibold text-primary text-lg tracking-tight group-hover:underline underline-offset-4 decoration-1">
                  {product.name}
                </h3>
                <p className="text-gray-500 mt-1.5 text-sm">
                  {product.price} EGP
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollection;