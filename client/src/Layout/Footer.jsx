import React, { useContext, useState } from "react";
import myContext from "@/context/data/myContext";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Button } from "@/components/ui/button";

function Footer() {
  const { mode } = useContext(myContext);
  const [inputValue, setInputValue] = useState("");
  const isDarkMode = mode === "dark";

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubscribe = () => {
    if (!inputValue) {
      alert("Please enter an email");
    } else if (!emailRegex.test(inputValue)) {
      alert("Please enter a valid email");
      setInputValue("");
    } else {
      alert(`Subscribed with ${inputValue}`);
      setInputValue("");
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={`w-full py-12 border-t-2 mt-10 ${
        isDarkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-800"
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {/* Company Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="hover:text-primary transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-primary transition">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/careers" className="hover:text-primary transition">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-primary transition">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/help" className="hover:text-primary transition">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-primary transition">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/returnpolicy" className="hover:text-primary transition">
                  Return Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-primary transition">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div className="sm:col-span-2">
            <h3 className="text-lg font-semibold mb-4">Subscribe to our Newsletter</h3>
            <p className="text-sm mb-4">
              Get the latest updates, promotions, and offers directly in your inbox.
            </p>
            <div className="flex flex-col items-center sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className={`flex-1 p-3 rounded-md border ${
                  isDarkMode
                    ? "bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-400 focus:ring-primary"
                    : "bg-white border-gray-300 text-gray-800 placeholder-gray-500 focus:ring-primary"
                } focus:outline-none focus:ring-2`}
              />
              <Button
                className="bg-primary text-white hover:bg-primary-dark px-6 py-3 rounded-md transition"
                onClick={handleSubscribe}
              >
                Subscribe
              </Button>
            </div>
            <div className="flex gap-4 mt-6">
              <a href="#" className="hover:text-primary transition">
                <FaFacebook size={22} />
              </a>
              <a href="#" className="hover:text-primary transition">
                <FaTwitter size={22} />
              </a>
              <a href="#" className="hover:text-primary transition">
                <FaInstagram size={22} />
              </a>
              <a href="#" className="hover:text-primary transition">
                <FaLinkedin size={22} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div
          className={`mt-12 pt-6 border-t ${
            isDarkMode ? "border-gray-700" : "border-gray-300"
          } flex flex-col md:flex-row justify-between items-center text-sm`}
        >
          <p>© {currentYear} Shopcy. All Rights Reserved.</p>
          <p className="mt-2 md:mt-0 text-gray-500">
            Designed for modern e-commerce
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
