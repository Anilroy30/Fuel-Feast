import logo from '../assets/logo.png'; // Import the Fuel & Feast logo
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from '../utils/useOnlineStatus';
import UserContext from '../utils/UserContext';
import { useSelector } from 'react-redux';

const Header = () => {
    const [btnNameReact, setBtnNameReact] = useState("Login");
    const onlineStatus = useOnlineStatus();
    const { loggedInUser } = useContext(UserContext);
    const cartItems = useSelector((store) => store.cart.items);

    return (
        <header className="bg-gray-100 text-gray-900 shadow-md px-8 py-4 flex justify-between items-center">
            {/* Logo Section */}
            <div className="flex items-center space-x-3">
                <img alt="Fuel & Feast Logo" src={logo} className="w-16 h-16 rounded-full" />
                <h1 className="text-2xl font-bold tracking-wide">Fuel<span className="text-red-500">&</span>Feast</h1>
            </div>

            {/* Navigation Items */}
            <nav className="flex items-center space-x-6 text-lg font-medium">
                <p className="flex items-center">Online Status: <span className="ml-1 text-green-500">{onlineStatus ? "✅" : "❌"}</span></p>
                <Link 
                    to="/" 
                    className="px-4 py-2 rounded-lg transition bg-transparent hover:bg-blue-500 hover:text-white"
                    onClick={() => setFilteredRestaurant(listOfRestaurants)} // Reset restaurants
                >
                    Home
                </Link>
                <Link to="/about" className="px-4 py-2 rounded-lg transition bg-transparent hover:bg-blue-500 hover:text-white">About</Link>
                <Link to="/contact" className="px-4 py-2 rounded-lg transition bg-transparent hover:bg-blue-500 hover:text-white">Contact</Link>
                <Link to="/cart" className="px-4 py-2 rounded-lg transition bg-transparent hover:bg-yellow-500 hover:text-white flex items-center">🛒 Cart ({cartItems.length})</Link>
                
                <button
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition font-semibold"
                    onClick={() => setBtnNameReact(btnNameReact === "Login" ? "Logout" : "Login")}>
                    {btnNameReact}
                </button>
                
                <span className='px-4 font-bold text-red-500'>{loggedInUser}</span>
            </nav>
        </header>
    );
};

export default Header;
