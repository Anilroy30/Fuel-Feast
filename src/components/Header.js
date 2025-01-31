import { LOGO_URL } from '../utils/constants';
import { useState } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from '../utils/useOnlineStatus';

const Header = () => {
    const [btnNameReact, setBtnNameReact] = useState("Login");

    const onlineStatus = useOnlineStatus();

    return (
        <div className="flex justify-between items-center bg-white shadow-md px-6 py-4">
            {/* Logo Section */}
            <div className="flex items-center">
                <img alt="App-logo" src={LOGO_URL} className="w-16 h-16" />
            </div>

            {/* Navigation Items */}
            <div className="flex items-center space-x-6">
                <ul className="flex space-x-4 text-gray-700 font-medium">
                    <li>Online Status: {onlineStatus ? "✅" : "❌"}</li>
                    <li><Link to="/" className="hover:text-blue-500">Home</Link></li>
                    <li><Link to="/about" className="hover:text-blue-500">About</Link></li>
                    <li><Link to="/contact" className="hover:text-blue-500">Contact</Link></li>
                    <li className="hover:text-blue-500 cursor-pointer">Cart</li>
                </ul>
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                    onClick={() => setBtnNameReact(btnNameReact === "Login" ? "Logout" : "Login")}
                >
                    {btnNameReact}
                </button>
            </div>
        </div>
    );
};

export default Header;
