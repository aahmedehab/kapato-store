import { Routes, Route, useLocation } from "react-router-dom";

import Header from "./components/Header";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

import Home from "./components/Pages/Home";
import About from "./components/Pages/About";
import Shop from "./components/Pages/Shop";
import ProductDetail from './components/Pages/ProductDetail';
import Cart from './components/Pages/Cart';
import Checkout from './components/Pages/Checkout';
import Terms from "./components/Pages/Terms";
import Confirmation from "./components/Pages/Confirmation";

import ScrollToTop from "./components/ScrollToTop";

function App() {
  const location = useLocation();

  const isHome = location.pathname === "/";
  const isCheckout = location.pathname === "/checkout";

  return (
    <div className="min-h-screen bg-[#ffffff]">
          <ScrollToTop />

            {!isCheckout && <Nav overlay={isHome} />}

      {/* {!isCheckout && <Header />}   هيخفي الـ Header في Checkout */}
      <div className={!isHome && !isCheckout ? "" : ""}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/terms" element={<Terms />} />
      </Routes>

      <Footer />
    </div>
    </div>
  );
}

export default App;