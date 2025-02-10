import React from "react";

const About = () => {
  return (
    <div className="container mx-auto px-6 py-12 text-center">
      <h1 className="text-4xl font-bold text-gray-800">
        About <span className="text-red-500">Fuel & Feast</span>
      </h1>
      <p className="mt-4 text-lg text-gray-600">
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
      <ul className="mt-4 text-lg text-gray-600 space-y-2">
        <li>🍽️ Hand-picked restaurants with top ratings</li>
        <li>🚀 Fast and seamless ordering experience</li>
        <li>💳 Secure payments and exclusive discounts</li>
        <li>📍 Location-based restaurant recommendations</li>
      </ul>
    </div>
  );
};

export default About;
