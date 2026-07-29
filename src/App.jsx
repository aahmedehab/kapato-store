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

import DashboardLayout from "./components/Dashboard/DashboardLayout";

import DashboardHome from "./components/Dashboard/pages/DashboardHome";
import Orders from "./components/Dashboard/pages/Orders";
import Products from "./components/Dashboard/pages/Products";
import Colors from "./components/Dashboard/pages/Colors";
import Customers from "./components/Dashboard/pages/Customers";
import Settings from "./components/Dashboard/pages/Settings";

function App() {
  const location = useLocation();

  const isHome = location.pathname === "/";
  const isCheckout = location.pathname === "/checkout";
  const isDashboard = location.pathname.startsWith("/dashboard");

  return (
    <div className="min-h-screen bg-[#ffffff]">
      <ScrollToTop />

      {!isCheckout && !isDashboard && <Nav overlay={isHome} />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/terms" element={<Terms />} />

        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="orders" element={<Orders />} />
          <Route path="products" element={<Products />} />
            <Route path="colors" element={<Colors />} />
          <Route path="customers" element={<Customers />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>

      {!isDashboard && <Footer />}
    </div>
  );
}

export default App;