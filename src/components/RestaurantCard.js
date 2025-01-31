import { CDN_URL } from '../utils/constants';

const RestaurantCard = ({ resData }) => {
    const { cloudinaryImageId, name, cuisines, avgRating, costForTwo, sla } = resData?.info || {};

    return (
        <div className="w-[250px] h-[320px] bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition duration-300">
            <img
                className="w-full h-40 object-cover"
                src={CDN_URL + cloudinaryImageId}
                alt={name || "Restaurant Image"}
            />
            <div className="p-3">
                <h3 className="text-lg font-semibold text-gray-800 truncate">{name}</h3>
                <p className="text-gray-500 text-sm truncate">{cuisines.join(', ')}</p>
                <div className="flex items-center justify-between mt-2">
                    <p className="text-green-600 font-semibold">⭐ {avgRating}</p>
                    <p className="text-gray-600">{costForTwo}</p>
                </div>
                <p className="text-gray-500 text-sm mt-1">{sla?.slaString}</p>
            </div>
        </div>
    );
};

export default RestaurantCard;
