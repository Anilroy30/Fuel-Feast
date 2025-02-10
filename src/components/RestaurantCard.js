import { CDN_URL } from '../utils/constants';
import { Clock } from "lucide-react";

const RestaurantCard = ({ resData }) => {
    const { cloudinaryImageId, name, cuisines, avgRating, costForTwo, sla } = resData?.info || {};

    // Determine rating background color
    const getRatingColor = (rating) => {
        if (rating >= 4) return "bg-green-600";
        if (rating >= 2.5) return "bg-yellow-500";
        return "bg-red-500";
    };

    return (
        <div data-testid="resCard" className="w-[250px] h-[320px] bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition duration-300">
            {/* Image with rounded corners inside the card */}
            <div className="w-full h-40 overflow-hidden">
                <img
                    className="w-full h-full object-cover rounded-md"
                    src={CDN_URL + cloudinaryImageId}
                    alt={name || "Restaurant Image"}
                />
            </div>

            {/* Restaurant Details */}
            <div className="p-3">
                <h3 className="text-xl font-medium text-gray-900 truncate pb-1">{name}</h3>
                <p className="text-gray-700 text-sm truncate pb-1">{cuisines.join(', ')}</p>
                <p className="text-gray-800 font-bold">{costForTwo}</p>

                {/* Rating, Delivery Time, and Cost in one line */}
                <div className="flex items-center justify-between mt-2 text-white text-sm font-semibold">
                    <span className={`px-2 py-1 rounded ${getRatingColor(avgRating)}`}>
                        ⭐ {avgRating}
                    </span>
                    <span className="flex font-bold items-center text-gray-600">
                        <Clock size={14} className="mr-1" /> {sla?.slaString}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default RestaurantCard;
