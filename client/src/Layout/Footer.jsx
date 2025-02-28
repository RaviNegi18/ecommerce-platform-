import React, { useContext } from "react";
import myContext from "@/context/data/myContext";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

function Footer() {
  const { mode } = useContext(myContext);
  const isDarkMode = mode === "dark";

  return (
    <footer
      className={`w-full py-8 md:py-12 ${
        isDarkMode ? "bg-gray-900 text-gray-300" : "bg-gray-200 text-gray-800"
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 text-center md:text-left">
          {/* Company Section */}
          <div>
            <h2 className="text-xl font-bold mb-4">Company</h2>
            <ul className="space-y-2">
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
            <h2 className="text-xl font-bold mb-4">Support</h2>
            <ul className="space-y-2">
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
                <Link
                  to="/returnpolicy"
                  className="hover:text-primary transition"
                >
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
          <div>
            <h2 className="text-xl font-bold mb-4">Newsletter</h2>
            <p className="text-sm mb-4">
              Subscribe to get the latest updates and offers.
            </p>
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2">
              <Input
                placeholder="Enter your email"
                className="flex-1 rounded-md border-gray-400 focus:ring-2 focus:ring-primary"
              />
              <Button className="w-full sm:w-auto rounded-md bg-primary text-white hover:bg-primary-dark transition">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 flex flex-col md:flex-row justify-between items-center border-t border-gray-500 pt-6 text-center md:text-left">
          <p className="text-sm mb-4 md:mb-0">
            © 2025 shopcy. All Rights Reserved.
          </p>
          <div className="flex space-x-6">
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
    </footer>
  );
}

export default Footer;
