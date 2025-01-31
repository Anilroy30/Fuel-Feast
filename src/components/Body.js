
import { useEffect, useState } from 'react';
import RestaurantCard from './RestaurantCard';
import Shimmer from './shimmer';
import { Link } from 'react-router-dom';
import { RESTAURANT_URL } from "../utils/constants";
import useOnlineStatus from '../utils/useOnlineStatus';

const Body = () => {
    const [listOfRestaurants, setListOfRestaurants] = useState([]);
    const [filteredRestaurant, setFilteredRestaurant] = useState([]);
    const [searchText, setSearchText] = useState("");


    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const data = await fetch(RESTAURANT_URL);
        const json = await data.json();

        setListOfRestaurants(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
        setFilteredRestaurant(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    };

    const onlineStatus = useOnlineStatus();

    if (!onlineStatus) {
        return (
            <h1 className="text-center text-red-500 mt-10 text-2xl">Looks like you are offline, please check your internet connection..</h1>
        );
    }

    return listOfRestaurants.length === 0 ? <Shimmer /> : (
        <div className="container mx-auto px-4">
            <div className="flex justify-center items-center my-4">
                <input 
                    type="text"
                    className="w-1/2 p-2 border border-gray-300 rounded-l-lg focus:outline-none"
                    placeholder="Search Food or Restaurant" 
                    value={searchText} 
                    onChange={(e) => setSearchText(e.target.value)}
                />
                <button 
                    className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 transition"
                    onClick={() => {
                        const filteredRestaurant = listOfRestaurants.filter(
                            (res) => res?.info?.name.toLowerCase().includes(searchText.toLowerCase())
                        );
                        setFilteredRestaurant(filteredRestaurant);
                    }}>
                    Search
                </button>
            </div>

            <div className="flex justify-center">
                <button 
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                    onClick={() => {
                        const filteredList = listOfRestaurants.filter((res) => res?.info?.avgRating > 4.2);
                        setFilteredRestaurant(filteredList);
                    }}>
                    Top Rated Restaurants
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
                {filteredRestaurant.map((res) => (
                    <Link key={res?.info?.id} to={"/restaurant/" + res?.info?.id}>
                        <RestaurantCard resData={res} />
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Body;
