import React, { useState, useContext } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import myContext from "@/context/data/myContext";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ContactPage = () => {
  const navigate = useNavigate();
  const { mode } = useContext(myContext);
  const isDarkMode = mode === "dark";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill out all fields before submitting.");
      return;
    }
    alert("Your message has been submitted. We will contact you soon!");
    setFormData({ name: "", email: "", message: "" });
    navigate("/");
  };

  return (
    <div className={`${isDarkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-800"} min-h-screen py-16 px-6`}>
      {/* Header */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
        <p className="text-gray-500 dark:text-gray-400 text-lg">
          Have a question or need help? Reach out to us, we’re here to assist you!
        </p>
      </div>

      {/* Contact Info Cards */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 mb-16">
        <div className={`flex flex-col items-center p-6 rounded-xl shadow-md ${isDarkMode ? "bg-gray-800" : "bg-white"}`}>
          <FaPhone className="text-4xl text-blue-500 mb-4" />
          <p className="text-lg font-medium">Phone</p>
          <p className="mt-2 text-gray-500 dark:text-gray-300">+91 7009635150</p>
        </div>
        <div className={`flex flex-col items-center p-6 rounded-xl shadow-md ${isDarkMode ? "bg-gray-800" : "bg-white"}`}>
          <FaEnvelope className="text-4xl text-blue-500 mb-4" />
          <p className="text-lg font-medium">Email</p>
          <p className="mt-2 text-gray-500 dark:text-gray-300">support@shopsy.com</p>
        </div>
        <div className={`flex flex-col items-center p-6 rounded-xl shadow-md ${isDarkMode ? "bg-gray-800" : "bg-white"}`}>
          <FaMapMarkerAlt className="text-4xl text-blue-500 mb-4" />
          <p className="text-lg font-medium">Location</p>
          <p className="mt-2 text-gray-500 dark:text-gray-300">Delhi, India</p>
        </div>
      </div>

      {/* Contact Form */}
      <div className="max-w-3xl mx-auto">
        <form
          onSubmit={handleSubmit}
          className={`p-8 rounded-2xl shadow-lg ${isDarkMode ? "bg-gray-800" : "bg-white"}`}
        >
          <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>

          <div className="mb-4">
            <label className="block mb-2 font-medium">
              Name
            </label>
            <Input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full rounded-lg p-3 focus:ring-2 ${isDarkMode ? "bg-gray-700 text-gray-100 focus:ring-blue-500" : "bg-gray-100 text-gray-800 focus:ring-blue-500"}`}
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-medium">
              Email
            </label>
            <Input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              className={`w-full rounded-lg p-3 focus:ring-2 ${isDarkMode ? "bg-gray-700 text-gray-100 focus:ring-blue-500" : "bg-gray-100 text-gray-800 focus:ring-blue-500"}`}
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 font-medium">
              Message
            </label>
            <Textarea
              name="message"
              placeholder="Write your message..."
              value={formData.message}
              onChange={handleChange}
              rows={5}
              className={`w-full rounded-lg p-3 focus:ring-2 resize-none ${isDarkMode ? "bg-gray-700 text-gray-100 focus:ring-blue-500" : "bg-gray-100 text-gray-800 focus:ring-blue-500"}`}
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition disabled:bg-blue-400"
            disabled={!formData.name || !formData.email || !formData.message}
          >
            Send Message
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
