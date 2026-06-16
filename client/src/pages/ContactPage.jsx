import React, { useState, useContext } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import myContext from "@/context/data/myContext";
import { showErrorToast, showSuccessToast } from "@/utills/ToastUtills";
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
      showErrorToast("Please fill out all fields before submitting.");
      return;
    }
    showSuccessToast("Your message has been submitted. We will contact you soon!");
    setFormData({ name: "", email: "", message: "" });
    navigate("/");
  };

  return (
    <div className={`${isDarkMode ? "bg-slate-950 text-gray-100" : "bg-gradient-to-br from-slate-50 to-slate-100 text-slate-900"} min-h-screen py-16 px-4`}>      
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <p className="text-sm uppercase tracking-[0.3em] text-blue-500 mb-3">
            Get in touch
          </p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Let’s build something great together.
          </h1>
          <p className={`mt-4 text-base md:text-lg ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}>
            Have a question, feedback, or a special request? Our team is ready to help.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] items-start">
          <div className={`rounded-[2rem] border ${isDarkMode ? "border-slate-800 bg-slate-900" : "border-slate-200 bg-white"} shadow-xl p-10 space-y-8`}>            
            <div className="grid gap-6 sm:grid-cols-2">
              <div className={`rounded-3xl p-6 border ${isDarkMode ? "border-slate-800 bg-slate-800" : "border-slate-200 bg-slate-50"}`}>
                <p className="text-sm uppercase tracking-[0.25em] text-blue-500 mb-4">Phone</p>
                <div className="flex items-start gap-4">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-2xl text-blue-600 ${isDarkMode ? "bg-blue-500/10" : "bg-blue-100"}`}>
                    <FaPhone className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Call us</h3>
                    <p className={`mt-2 ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}>+91 7009635150</p>
                  </div>
                </div>
              </div>

              <div className={`rounded-3xl p-6 border ${isDarkMode ? "border-slate-800 bg-slate-800" : "border-slate-200 bg-slate-50"}`}>
                <p className="text-sm uppercase tracking-[0.25em] text-blue-500 mb-4">Email</p>
                <div className="flex items-start gap-4">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-2xl text-blue-600 ${isDarkMode ? "bg-blue-500/10" : "bg-blue-100"}`}>
                    <FaEnvelope className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Message us</h3>
                    <p className={`mt-2 ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}>support@shopsy.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className={`rounded-3xl p-6 border ${isDarkMode ? "border-slate-800 bg-slate-800" : "border-slate-200 bg-slate-50"}`}>
              <p className="text-sm uppercase tracking-[0.25em] text-blue-500 mb-4">Location</p>
              <div className="flex items-start gap-4">
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl text-blue-600 ${isDarkMode ? "bg-blue-500/10" : "bg-blue-100"}`}>
                  <FaMapMarkerAlt className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Visit us</h3>
                  <p className={`mt-2 ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}>Delhi, India</p>
                </div>
              </div>
            </div>

            <div className={`rounded-3xl p-8 border ${isDarkMode ? "border-slate-800 bg-slate-950" : "border-slate-200 bg-slate-50"}`}>
              <h2 className="text-xl font-semibold mb-4">Office hours</h2>
              <p className={`text-sm ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}>
                We're available Monday to Friday from 9am to 7pm IST. Send your message anytime and we'll get back to you on the next business day.
              </p>
            </div>
          </div>

          <div className={`rounded-[2rem] border ${isDarkMode ? "border-slate-800 bg-slate-900" : "border-slate-200 bg-white"} shadow-xl p-10`}>
            <div className="mb-8">
              <p className="text-sm uppercase tracking-[0.3em] text-blue-500 mb-3">Contact form</p>
              <h2 className="text-3xl font-bold">Send us a message</h2>
              <p className={`mt-3 ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}>
                Fill out the form and our support team will reply as soon as possible.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block mb-2 font-medium">Name</label>
                  <Input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full rounded-2xl border px-4 py-3 focus:ring-2 ${isDarkMode ? "bg-slate-800 border-slate-700 text-slate-100 focus:ring-blue-500" : "bg-slate-100 border-slate-200 text-slate-900 focus:ring-blue-500"}`}
                  />
                </div>
                <div>
                  <label className="block mb-2 font-medium">Email</label>
                  <Input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full rounded-2xl border px-4 py-3 focus:ring-2 ${isDarkMode ? "bg-slate-800 border-slate-700 text-slate-100 focus:ring-blue-500" : "bg-slate-100 border-slate-200 text-slate-900 focus:ring-blue-500"}`}
                  />
                </div>
              </div>

              <div>
                <label className="block mb-2 font-medium">Message</label>
                <Textarea
                  name="message"
                  placeholder="Tell us more about your request..."
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className={`w-full rounded-2xl border px-4 py-3 focus:ring-2 resize-none ${isDarkMode ? "bg-slate-800 border-slate-700 text-slate-100 focus:ring-blue-500" : "bg-slate-100 border-slate-200 text-slate-900 focus:ring-blue-500"}`}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-2xl transition disabled:bg-blue-400"
                disabled={!formData.name || !formData.email || !formData.message}
              >
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
