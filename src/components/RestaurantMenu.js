import Shimmer from "./shimmer";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import RestaurantCategory from "./restaurantCategory";

const RestaurantMenu = () => {
    const { resId } = useParams();
    const resInfo = useRestaurantMenu(resId);

    if (resInfo === null) return <Shimmer />;

    const { name, cuisines, costForTwoMessage } = resInfo?.cards[2]?.card?.card?.info;

    const categories = resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
        (each) =>
            each?.card?.card?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );

    console.log(categories);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            {/* Restaurant Info - Centered */}
            <div className="text-center bg-white shadow-lg rounded-lg p-6 w-3/4 max-w-4xl">
                <h1 className="text-4xl font-bold text-gray-900">{name}</h1>
                <p className="text-lg text-gray-600 mt-2">{cuisines.join(", ")} - {costForTwoMessage}</p>
            </div>

            {/* Menu Categories - Centered */}
            <div className="w-3/4 max-w-4xl mt-6 space-y-6">
                {categories.map((each) => (
                    <RestaurantCategory key={each?.card?.card?.categoryId} data={each?.card?.card} />
                ))}
            </div>
        </div>
    );
};

export default RestaurantMenu;
