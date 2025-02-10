import React, { useState } from "react";
import { SiGmail, SiLinkedin, SiGithub, SiX } from "react-icons/si";
import {
  Github_Link,
  Email_Link,
  Linkedin_Link,
  Twitter_Link,
} from "../utils/constants";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you, ${formData.name}! We will get back to you soon.`);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="container mx-auto px-6 py-12 text-center">
      <h1 className="text-4xl font-bold text-gray-800">
        Contact <span className="text-red-500">Us</span>
      </h1>
      <p className="mt-4 text-lg text-gray-600">
        Have questions? We'd love to hear from you! Fill out the form below and we'll be in touch soon.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-3 mt-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          required
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          className="w-full p-3 mt-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          rows="4"
          required
        ></textarea>
        <button type="submit" className="w-full bg-red-500 text-white font-bold py-3 mt-4 rounded-md hover:bg-red-600 transition">
          Send Message
        </button>
      </form>

      <div className="mt-10">
        <h2 className="text-2xl font-semibold text-gray-700">Our Contact Details</h2>
        <p className="mt-2 text-lg text-gray-600">📍 123 Food Street, Gourmet City</p>
        <p className="mt-2 text-lg text-gray-600">📞 +1 234 567 890</p>
        <p className="mt-2 text-lg text-gray-600">📧 anilkumarakula34@gmail.com</p>
      </div>

      {/* Social Media Links */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold text-gray-700">Connect with Us</h2>
        <div className="mt-4 flex justify-center space-x-6">
          <a
            href={Linkedin_Link}
            title="Follow us on Linkedin"
            className="text-blue-700 text-3xl hover:text-blue-800 transition"
            target="_blank"
            rel="noopener noreferrer"
          >
            <SiLinkedin />
          </a>
          <a
            href={Twitter_Link}
            title="Follow us on Twitter"
            className="text-blue-500 text-3xl hover:text-blue-600 transition"
            target="_blank"
            rel="noopener noreferrer"
          >
            <SiX />
          </a>
          <a
            href={Github_Link}
            title="Follow us on Github"
            className="text-gray-900 text-3xl hover:text-gray-700 transition"
            target="_blank"
            rel="noopener noreferrer"
          >
            <SiGithub />
          </a>
          <a
            href={Email_Link}
            title="Email us"
            className="text-red-500 text-3xl hover:text-red-600 transition"
            target="_blank"
            rel="noopener noreferrer"
          >
            <SiGmail />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;

