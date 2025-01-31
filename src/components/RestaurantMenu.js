import Shimmer from "./shimmer";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";

const RestaurantMenu = () => {
    const { resId } = useParams();
    const resInfo = useRestaurantMenu(resId);


    if (resInfo === null) return <Shimmer />;

    const { name, cuisines, costForTwoMessage } = resInfo?.cards[2]?.card?.card?.info;
    const { itemCards } = resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card;

    // console.log(resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards);

    const categories = resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter((each) => each?.card?.card?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory");

    console.log(categories);

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h1 className="text-3xl font-bold text-gray-800">{name}</h1>
            <p className="text-gray-600 mt-2">{cuisines.join(", ")} - {costForTwoMessage}</p>

            <h2 className="text-2xl font-semibold mt-6">Menu</h2>
            <ul className="mt-4 space-y-2">
                {itemCards.map((item) => (
                    <li key={item.card.info.id} className="flex justify-between border-b py-2">
                        <span className="text-gray-700">{item.card.info.name}</span>
                        <span className="font-semibold text-gray-900">Rs. {item.card.info.price / 100 || item.card.info.defaultPrice / 100}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RestaurantMenu;
