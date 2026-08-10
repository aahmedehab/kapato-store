import { Routes, Route, useLocation, Navigate } from "react-router-dom";

import Nav from "./components/Nav";
import Footer from "./components/Footer";

import Home from "./components/Pages/Home";
import Shop from "./components/Pages/Shop";
import Contact from "./components/Pages/Contact";
import ProductDetail from './components/Pages/ProductDetail';
import Cart from './components/Pages/Cart';
import Checkout from './components/Pages/Checkout';
import Confirmation from "./components/Pages/Confirmation";

import ScrollToTop from "./components/ScrollToTop";

import DashboardLayout from "./components/Dashboard/DashboardLayout";

import DashboardHome from "./components/Dashboard/pages/DashboardHome";
import Orders from "./components/Dashboard/pages/Orders";
import Products from "./components/Dashboard/pages/Products";
import Colors from "./components/Dashboard/pages/Colors";
import Customers from "./components/Dashboard/pages/Customers";
import Settings from "./components/Dashboard/pages/Settings";

import Policies from "./components/Pages/Policies";

function App() {
  const location = useLocation();

  const isHome = location.pathname === "/";
  const isCheckout = location.pathname === "/checkout";
  const isConfirmation = location.pathname === "/confirmation";
  const isDashboard = location.pathname.startsWith("/dashboard");

  return (
    <div className="min-h-screen bg-[#ffffff]">
      <ScrollToTop />

      {!isCheckout && !isConfirmation && !isDashboard && <Nav overlay={isHome} />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/policies" element={<Policies />} />

        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="orders" element={<Orders />} />
          <Route path="products" element={<Products />} />
            <Route path="colors" element={<Colors />} />
          <Route path="customers" element={<Customers />} />
          <Route path="settings" element={<Settings />} />
        </Route>

          {/* Any unknown URL → Home */}
          <Route path="*" element={<Navigate to="/" replace />} />  
      </Routes>

      {!isDashboard && !isCheckout && !isConfirmation && <Footer />}
    </div>
  );
}

export default App;