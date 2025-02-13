import React, { useContext } from "react";
import { ThemeContext } from "../components/ThemeContext";

const About = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={`container mx-auto px-6 py-12 text-center ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <h1 className="text-4xl font-bold">
        About <span className="text-red-500">Fuel & Feast</span>
      </h1>
      <p className="mt-4 text-lg">
        Welcome to <strong>Fuel & Feast</strong>, your go-to platform for discovering the best restaurants and ordering delicious food effortlessly. We aim to fuel your cravings with a feast of amazing flavors!
      </p>

      <div className="mt-8 flex justify-center">
        <img
          src="https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg"
          alt="About Fuel & Feast"
          className="rounded-lg shadow-lg w-full max-w-2xl"
        />
      </div>

      <h2 className="mt-8 text-2xl font-semibold">Why Choose Us?</h2>
      <ul className="mt-4 text-lg space-y-2">
        <li>🍽️ <span className="text-yellow-500">Hand-picked restaurants</span> with top ratings</li>
        <li>🚀 <span className="text-green-500">Fast and seamless ordering</span> experience</li>
        <li>💳 <span className="text-blue-500">Secure payments</span> and exclusive discounts</li>
        <li>📍 <span className="text-pink-500">Location-based recommendations</span></li>
      </ul>
    </div>
  );
};

export default About;
