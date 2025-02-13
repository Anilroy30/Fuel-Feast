import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import RestaurantCard from "./RestaurantCard";
import Shimmer from "./shimmer";
import DarkModeToggle from "../utils/Toggle"; // ✅ Import Dark Mode Toggle
import { RESTAURANT_URL } from "../utils/constants";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";

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

      const allRestaurants =
        json?.data?.cards?.flatMap(
          (card) => card?.card?.card?.gridElements?.infoWithStyle?.restaurants || []
        ) || [];

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

  const onlineStatus = useOnlineStatus();

  if (!onlineStatus) {
    return (
      <h1 className="text-center text-red-500 mt-10 text-2xl">
        Looks like you are offline, please check your internet connection...
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

  return listOfRestaurants.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="container mx-auto px-4">
      <div className="flex flex-wrap items-center justify-between gap-4 mt-6 px-4">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
          onClick={() => {
            const filteredList = listOfRestaurants.filter((res) => res?.info?.avgRating > 4.2);
            setFilteredRestaurant(filteredList);
          }}
        >
          ⭐ Top Rated Restaurants
        </button>

        <div className="flex items-center w-full sm:w-2/4 lg:w-2/4">
        <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-l-lg focus:outline-none 
                        placeholder-black-700 dark:placeholder-white !text-black dark:text-white"
            placeholder="🔍 Search a restaurant..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
        />




          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-red-600 transition"
            onClick={() => setSearchText("")}
          >
            ❌ Clear
          </button>
        </div>

        {/* ✅ Dark Mode Toggle */}
        <DarkModeToggle />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {filteredRestaurant.length > 0 ? (
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
