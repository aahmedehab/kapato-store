import { FaInstagram, FaFacebookF, FaTiktok } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="py-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="h-px bg-[#C8B39A] w-[90%] mx-auto mb-8"></div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm">
          <p className="text-gray-600">© 2026 KAPATO. All Rights Reserved.</p>
          
          <Link to="/terms" className="text-gray-600 hover:text-[#B71C1C] transition">
            Terms and Policies
          </Link>
          
          <div className="flex items-center gap-6 text-2xl">
            <a href="#" className="hover:text-[#B71C1C] transition"><FaInstagram /></a>
            <a href="#" className="hover:text-[#B71C1C] transition"><FaFacebookF /></a>
            <a href="#" className="hover:text-[#B71C1C] transition"><FaTiktok /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;