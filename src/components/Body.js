import { useEffect, useState, useContext } from 'react';
import RestaurantCard from './RestaurantCard';
import Shimmer from './shimmer';
import DarkModeToggle from './Toggle';  // Import Dark Mode Toggle
import { Link } from 'react-router-dom';
import { RESTAURANT_URL } from "../utils/constants";
import useOnlineStatus from '../utils/useOnlineStatus';
import UserContext from '../utils/UserContext';

const Body = () => {
    const [listOfRestaurants, setListOfRestaurants] = useState([]);
    const [filteredRestaurant, setFilteredRestaurant] = useState([]);
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch(RESTAURANT_URL);
            const json = await response.json();

            console.log("Fetched JSON:", json);

            // Extract restaurant data
            const allRestaurants = json?.data?.cards?.flatMap((card) =>
                card?.card?.card?.gridElements?.infoWithStyle?.restaurants || []
            ) || [];

            // Remove duplicates based on restaurant ID
            const uniqueRestaurants = allRestaurants.reduce((acc, curr) => {
                if (!acc.find((res) => res.info.id === curr.info.id)) {
                    acc.push(curr);
                }
                return acc;
            }, []);

            setListOfRestaurants(uniqueRestaurants);
            setFilteredRestaurant(uniqueRestaurants);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    // ✅ Now inside the component
    const onlineStatus = useOnlineStatus();

    if (!onlineStatus) {
        return (
            <h1 className="text-center text-red-500 mt-10 text-2xl">
                Looks like you are offline, please check your internet connection..
            </h1>
        );
    }

    const { loggedInUser } = useContext(UserContext);

    useEffect(() => {
        if (searchText.trim() === "") {
            setFilteredRestaurant(listOfRestaurants);
        } else {
            const filteredList = listOfRestaurants.filter((res) =>
                res?.info?.name?.toLowerCase().includes(searchText.toLowerCase())
            );
            setFilteredRestaurant(filteredList);
        }
    }, [searchText, listOfRestaurants]);

    return (listOfRestaurants.length === 0) ? <Shimmer /> : (
        <div className="container mx-auto pl-3">
            <div className="flex justify-between items-center my-4 mx-auto w-full">
                <button 
                    className="bg-green-500 text-white px-2 py-2 rounded-lg hover:bg-green-600 transition"
                    onClick={() => {
                        const filteredList = listOfRestaurants.filter((res) => res?.info?.avgRating > 4.2);
                        setFilteredRestaurant(filteredList);
                    }}>
                    Top Rated Restaurants
                </button>

                <div className="ml-60 flex w-7/12">
                    <input 
                        type="text" data-testid="searchInput"
                        className="w-full pt-2 p-2 border border-gray-300 rounded-l-lg focus:outline-none"
                        placeholder="Search a Restaurant you want..." 
                        value={searchText} 
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                    <button 
                        className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-red-600 transition"
                        onClick={() => setSearchText("")}> 
                        Clear
                    </button>
                </div>

                {/* Dark Mode Toggle */}
                <div className="flex justify-end mt-4">
                    <DarkModeToggle />
                </div>

            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
                {filteredRestaurant?.length > 0 ? (
                    filteredRestaurant.map((res) => (
                        <Link key={res?.info?.id} to={"/restaurant/" + res?.info?.id}>
                            <div className="transform transition duration-300 hover:scale-105">
                                <RestaurantCard resData={res} />
                            </div>
                        </Link>
                    ))
                ) : (
                    <h2 className="text-center text-xl text-gray-500">No restaurants found.</h2>
                )}
            </div>
        </div>
    );
};

export default Body;
