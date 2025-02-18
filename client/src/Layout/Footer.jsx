import React, { useContext } from "react";
import myContext from "@/context/data/myContext";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

function Footer() {
  const context = useContext(myContext);
  const { mode } = context;

  return (
    <footer className="w-full py-10 bg-gray-300 dark:bg-gray-900 text-gray-800 dark:text-white">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h2 className="text-lg font-bold mb-4">Company</h2>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-primary">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/careers" className="hover:text-primary">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-primary">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-bold mb-4">Support</h2>
            <ul className="space-y-2">
              <li>
                <Link to="/help" className="hover:text-primary">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-primary">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/returnpolicy" className="hover:text-primary">
                  Return Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-primary">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-bold mb-4">Newsletter</h2>
            <p className="text-sm mb-4">
              Subscribe to get the latest updates and offers.
            </p>
            <div className="flex space-x-2">
              <Input placeholder="Enter your email" className="flex-1" />
              <Button>Subscribe</Button>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col md:flex-row justify-between items-center border-t border-gray-400 pt-6">
          <p className="text-sm">© 2025 shopcy. All Rights Reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a
              href="#"
              className="text-gray-600 dark:text-gray-300 hover:text-primary"
            >
              <FaFacebook size={20} />
            </a>
            <a
              href="#"
              className="text-gray-600 dark:text-gray-300 hover:text-primary"
            >
              <FaTwitter size={20} />
            </a>
            <a
              href="#"
              className="text-gray-600 dark:text-gray-300 hover:text-primary"
            >
              <FaInstagram size={20} />
            </a>
            <a
              href="#"
              className="text-gray-600 dark:text-gray-300 hover:text-primary"
            >
              <FaLinkedin size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
