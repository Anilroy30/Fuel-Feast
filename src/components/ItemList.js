import { CDN_URL } from "../utils/constants";
import React from "react";

const ItemList = ({ items }) => {

    console.log(items);
    return (
        <div className="space-y-4">
            {items.map((item) => (
                <div
                    key={item.card.info.id}
                    className="flex items-center justify-between p-6 border rounded-lg bg-white shadow-md hover:shadow-lg transition w-full"
                >
                    {/* Left Section - Text */}
                    <div className="flex-1">
                        <h2 className="text-xl font-semibold text-gray-800">{item?.card?.info?.name}</h2>
                        <p className="text-md text-gray-600 mt-1">
                            ₹{" "}
                            {item?.card?.info?.price
                                ? item?.card?.info?.price / 100
                                : item?.card?.info?.defaultPrice / 100}
                        </p>
                        <p className="text-gray-500 text-md mt-2">
                            {item.card.info.description}
                        </p>
                    </div>

                    {/* Right Section - Image + Add Button */}
                    <div className="flex flex-col items-center">
                        {item?.card?.info?.imageId && (
                            <img
                                src={CDN_URL + item.card.info.imageId}
                                alt={item.card.info.name}
                                className="w-32 h-32 object-cover rounded-lg shadow-md mb-2"
                            />
                        )}
                        <button className="px-5 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
                            Add +
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ItemList;
