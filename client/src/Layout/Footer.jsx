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
      className={`w-full py-12 ${isDarkMode ? "bg-gray-900" : "bg-gray-200"} ${
        isDarkMode ? "text-gray-300" : "text-gray-800"
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <h2 className="text-xl font-bold mb-4">Company</h2>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/about"
                  className="hover:text-primary transition-colors duration-200"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-primary transition-colors duration-200"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="/careers"
                  className="hover:text-primary transition-colors duration-200"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="hover:text-primary transition-colors duration-200"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4">Support</h2>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/help"
                  className="hover:text-primary transition-colors duration-200"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="hover:text-primary transition-colors duration-200"
                >
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  to="/returnpolicy"
                  className="hover:text-primary transition-colors duration-200"
                >
                  Return Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="hover:text-primary transition-colors duration-200"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4">Newsletter</h2>
            <p className="text-sm mb-4">
              Subscribe to get the latest updates and offers.
            </p>
            <div className="flex space-x-2">
              <Input
                placeholder="Enter your email"
                className="flex-1 rounded-md border border-gray-400 focus:ring-2 focus:ring-primary"
              />
              <Button className="rounded-md bg-primary text-white hover:bg-primary-dark transition-colors duration-200">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col md:flex-row justify-between items-center border-t border-gray-500 pt-6">
          <p className="text-sm">© 2025 shopcy. All Rights Reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a
              href="#"
              className="text-gray-600 hover:text-primary transition-colors duration-200"
            >
              <FaFacebook size={22} />
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-primary transition-colors duration-200"
            >
              <FaTwitter size={22} />
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-primary transition-colors duration-200"
            >
              <FaInstagram size={22} />
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-primary transition-colors duration-200"
            >
              <FaLinkedin size={22} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
