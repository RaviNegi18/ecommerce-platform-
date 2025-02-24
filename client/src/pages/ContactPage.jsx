import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const ContactPage = () => {
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
  };

  return (
    <div className="max-w-3xl mt-20 mx-auto py-10 px-6">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
          Contact Us
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Have a question? We'd love to hear from you!
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <div className="flex flex-col items-center p-4 border rounded-lg dark:border-gray-700">
          <FaPhone className="text-3xl text-blue-500" />
          <p className="text-gray-700 dark:text-gray-300 mt-2">7009635150 </p>
        </div>
        <div className="flex flex-col items-center p-4 border rounded-lg dark:border-gray-700">
          <FaEnvelope className="text-3xl text-blue-500" />
          <p className="text-gray-700 dark:text-gray-300 mt-2">
            support@shopsy.com
          </p>
        </div>
        <div className="flex flex-col items-center p-4 border rounded-lg dark:border-gray-700">
          <FaMapMarkerAlt className="text-3xl text-blue-500" />
          <p className="text-gray-700 dark:text-gray-300 mt-2">delhi,india </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-900 shadow-md rounded-lg p-6"
      >
        <div className="mb-4">
          <label className="text-gray-700 dark:text-gray-300 block mb-1">
            Your Name
          </label>
          <Input
            type="text"
            name="name"
            placeholder="Ravinder singh"
            value={formData.name}
            onChange={handleChange}
            className="w-full bg-gray-100 dark:bg-gray-800 border-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="text-gray-700 dark:text-gray-300 block mb-1">
            Email Address
          </label>
          <Input
            type="email"
            name="email"
            placeholder="example@email.com"
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-gray-100 dark:bg-gray-800 border-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="text-gray-700 dark:text-gray-300 block mb-1">
            Your Message
          </label>
          <Textarea
            name="message"
            placeholder="Write your message..."
            value={formData.message}
            onChange={handleChange}
            className="w-full bg-gray-100 dark:bg-gray-800 border-none focus:ring-2 focus:ring-blue-500"
            rows="4"
          />
        </div>
        <Button
          type="submit"
          className="w-full bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-400"
          disabled={!formData.name || !formData.email || !formData.message}
        >
          Send Message
        </Button>
      </form>
    </div>
  );
};

export default ContactPage;
