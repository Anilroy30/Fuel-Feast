import { useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../utils/cartSlice";
import { CDN_URL } from "../utils/constants";

const ItemList = ({ items }) => {
  const dispatch = useDispatch();
  const [loadingItem, setLoadingItem] = useState(null); // Track the item being added

  const handleAddItem = (item) => {
    setLoadingItem(item.card.info.id); // Set loading state
    dispatch(addItem(item));

    setTimeout(() => {
      setLoadingItem(null); // Reset loading state after 1 second
    }, 1000);
  };

  return (
    <div>
      {items.map((item) => (
        <div
          key={item.card.info.id}
          data-testid="foodItems"
          className="p-4 m-4 border-b flex justify-between items-center"
        >
          {/* Text on the left */}
          <div className="flex-1 text-left">
            <h3 className="font-semibold text-lg">{item.card.info.name}</h3>
            <p className="text-sm text-gray-600">{item.card.info.description}</p>
            <p className="text-md font-medium mt-1">
              ₹
              {item.card.info.price
                ? item.card.info.price / 100
                : item.card.info.defaultPrice / 100}
            </p>
          </div>

          {/* Image + Overlaid Add button on the right */}
          <div className="relative w-24">
            {/* Image */}
            <img
              src={CDN_URL + item.card.info.imageId}
              alt={item.card.info.name}
              className="w-24 h-24 rounded-lg object-cover"
            />

            {/* Add Button Overlaid on Image */}
            <button
              className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 px-4 py-1 text-white text-sm font-semibold rounded-md shadow-md transition-all duration-300 ${
                loadingItem === item.card.info.id
                  ? "bg-green-600 w-20 h-10" // Enlarged on adding
                  : "bg-black hover:bg-gray-900 hover:scale-110"
              }`}
              onClick={() => handleAddItem(item)}
            >
              {loadingItem === item.card.info.id ? "Adding..." : "ADD+"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemList;
