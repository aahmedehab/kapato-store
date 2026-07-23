// import { FaInstagram, FaFacebookF, FaTiktok } from "react-icons/fa";
// import { Link } from "react-router-dom";

// const Footer = () => {
//   return (
//     <footer className="py-8">
//       <div className="max-w-7xl mx-auto px-6">
//         <div className="h-px bg-[#C8B39A] w-[90%] mx-auto mb-8"></div>

//         <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm">
//           <p className="text-gray-600">© 2026 KAPATO. All Rights Reserved.</p>
          
//           <Link to="/terms" className="text-gray-600 hover:text-[#B71C1C] transition">
//             Terms and Policies
//           </Link>
          
//           <div className="flex items-center gap-6 text-2xl">
//             <a href="#" className="hover:text-[#B71C1C] transition"><FaInstagram /></a>
//             <a href="#" className="hover:text-[#B71C1C] transition"><FaFacebookF /></a>
//             <a href="#" className="hover:text-[#B71C1C] transition"><FaTiktok /></a>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;





import { Link } from "react-router-dom";
import { FaInstagram, FaTiktok } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-primary text-white pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-10">
          
          {/* Logo + Copyright */}
          <div className="md:col-span-3">
            <h2 className="text-4xl font-bold tracking-wider">KAPATO</h2>
            <p className="mt-4 text-sm text-white/70">
              © 2024 KAPATO<br />
              All rights reserved.
            </p>
          </div>

          {/* SHOP */}
          <div className="md:col-span-2">
            <h3 className="font-medium mb-4 text-white/90">SHOP</h3>
            <ul className="space-y-3 text-sm text-white/70">
              <li><Link to="/shop" className="hover:text-white transition">All Caps</Link></li>
              <li><Link to="/shop" className="hover:text-white transition">Best Sellers</Link></li>
              <li><Link to="/shop" className="hover:text-white transition">New Arrivals</Link></li>
            </ul>
          </div>

          {/* COMPANY */}
          <div className="md:col-span-2">
            <h3 className="font-medium mb-4 text-white/90">COMPANY</h3>
            <ul className="space-y-3 text-sm text-white/70">
              <li><Link to="/about" className="hover:text-white transition">About</Link></li>
              <li><Link to="/story" className="hover:text-white transition">Our Story</Link></li>
              <li><Link to="/contact" className="hover:text-white transition">Contact</Link></li>
            </ul>
          </div>

          {/* HELP */}
          <div className="md:col-span-2">
            <h3 className="font-medium mb-4 text-white/90">HELP</h3>
            <ul className="space-y-3 text-sm text-white/70">
              <li><Link to="/faq" className="hover:text-white transition">FAQs</Link></li>
              <li><Link to="/shipping" className="hover:text-white transition">Shipping</Link></li>
              <li><Link to="/returns" className="hover:text-white transition">Returns</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-3">
            <h3 className="font-medium mb-4 text-white/90">STAY IN THE LOOP</h3>
            <p className="text-sm text-white/70 mb-4">
              Get early access to new drops and good vibes.
            </p>
            
            <div className="relative">
              <input
                type="email"
                placeholder="Your email"
                className="w-full bg-white/10 border border-white/30 rounded-full py-3.5 px-6 text-sm focus:outline-none focus:border-white/50 placeholder:text-white/50"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-white text-primary p-2.5 rounded-full hover:bg-gray-100 transition">
                →
              </button>
            </div>

            {/* Social Icons */}
            <div className="flex gap-5 mt-10">
              <a href="#" className="text-2xl hover:text-white/70 transition"><FaInstagram /></a>
              <a href="#" className="text-2xl hover:text-white/70 transition"><FaFacebookF /></a>
              <a href="#" className="text-2xl hover:text-white/70 transition"><FaTiktok /></a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;