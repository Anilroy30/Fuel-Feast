import { useState } from "react";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";
import Shimmer from "./shimmer";
import { CDN_URL } from "../utils/constants";

const RestaurantMenu = () => {
  const { resId } = useParams();
  const resInfo = useRestaurantMenu(resId);
  
  const [showIndex, setShowIndex] = useState(null);

  if (!resInfo) return <Shimmer />;

  const {
    name,
    cuisines,
    costForTwoMessage,
    cloudinaryImageId,
    avgRating,
    sla
  } = resInfo?.cards[2]?.card?.card?.info || {};

  const deliveryTime = sla?.deliveryTime || "N/A";

  const categories =
    resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (c) =>
        c.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );

  // Function to determine rating color
  const getRatingColor = (rating) => {
    if (rating >= 4) return "bg-green-500"; // Green for 4+
    if (rating >= 2.5) return "bg-yellow-500"; // Yellow for 2 - 3.9
    return "bg-red-500"; // Red for below 2.5
  };

  return (
    <div className="text-center min-h-screen py-6">
      {/* Restaurant Info Card */}
      <div className="w-6/12 mx-auto my-6 text-white bg-gray-900 shadow-lg p-6 rounded-lg border border-gray-700">
        {/* Restaurant Image */}
        <img
          src={CDN_URL + cloudinaryImageId}
          alt={name}
          className="w-full h-48 object-cover rounded-md shadow-md"
        />

        {/* Restaurant Details */}
        <h1 className="font-bold text-3xl mt-4">{name}</h1>
        <p className="text-lg text-gray-300 mt-1">{cuisines?.join(", ")}</p>

        {/* Cost, Rating, and Delivery in One Line */}
        <div className="flex items-center justify-between mt-3 px-4">
          <span className="text-lg font-semibold">💰 {costForTwoMessage}</span>

          {/* Rating Box */}
          <span className={`px-3 py-1 text-black font-bold rounded-lg ${getRatingColor(avgRating)}`}>
            ⭐ {avgRating}
          </span>

          {/* Delivery Time */}
          <span className="text-gray-400">⏳ {deliveryTime} mins</span>
        </div>
      </div>

      {/* Categories Accordions */}
      <div className="w-10/12 mx-auto">
        {categories.map((category, index) => (
          <RestaurantCategory
            key={category?.card?.card.title}
            data={category?.card?.card}
            showItems={index === showIndex}
            setShowIndex={() => setShowIndex(index === showIndex ? null : index)}
          />
        ))}
      </div>
    </div>
  );
};

export default RestaurantMenu;
