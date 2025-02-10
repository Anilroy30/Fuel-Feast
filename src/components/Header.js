import logo from '../assets/logo.png'; // Import the Fuel & Feast logo
import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from '../utils/useOnlineStatus';
import UserContext from '../utils/UserContext';
import { useSelector } from 'react-redux';
import { auth, provider } from "../Firebase/firebaseConfig"; // Firebase Config
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";

const Header = () => {
    const [user, setUser] = useState(null);
    const onlineStatus = useOnlineStatus();
    const cartItems = useSelector((store) => store.cart.items);

    // Check if user is already logged in
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    // Google Sign-In
    const handleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            setUser(result.user);
        } catch (error) {
            console.error("Login Error:", error);
        }
    };

    // Logout function
    const handleLogout = async () => {
        try {
            await signOut(auth);
            setUser(null);
        } catch (error) {
            console.error("Logout Error:", error);
        }
    };

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

                {/* Login/Logout Button */}
                {user ? (
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition font-semibold"
                        onClick={handleLogout}>
                        Logout
                    </button>
                ) : (
                    <button
                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition font-semibold"
                        onClick={handleLogin}>
                        Login
                    </button>
                )}

                {/* Display Logged-in User Name */}
                {user && <span className='px-4 font-bold text-red-500'>{user.displayName.split('@')[0]}</span>}
            </nav>
        </header>
    );
};

export default Header;
