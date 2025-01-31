import { useState, useEffect } from "react";
import { RESTAURANT_URL } from "./constants";

const useRestaurantList = () => {
    const [listOfRestaurants, setListOfRestaurants] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setIsLoading(true);
            const data = await fetch(RESTAURANT_URL);
            const json = await data.json();

            // Extracting restaurant data from multiple cards
            // const restaurantData = json?.data?.cards
            //     ?.map(card => (
            //          card?.card?.card?.gridElements?.infoWithStyle?.restaurants
            //     ))
            //     .flat()
            //     .filter(Boolean); // Removes undefined/null entries


            setListOfRestaurants(restaurantData || []);
        } catch (err) {
            setError(err.message);
            console.error("Error fetching restaurants:", err);
        } finally {
            setIsLoading(false);
        }
    };

    return { listOfRestaurants, isLoading, error };
};

export default useRestaurantList;
