import { useEffect, useState } from "react";

const DarkModeToggle = () => {
    const [darkMode, setDarkMode] = useState(
        localStorage.getItem("theme") === "dark"
    );

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [darkMode]);

    return (
        <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 bg-gray-200 dark:bg-gray-800 dark:text-white rounded-lg transition"
        >
            {darkMode ? "🌙 Dark Mode" : "☀️ Light Mode"}
        </button>
    );
};

export default DarkModeToggle;
