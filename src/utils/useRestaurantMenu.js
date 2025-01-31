import { useState, useEffect } from "react";
import { MENU_URL } from "../utils/constants";

const useRestaurantMenu = (resId) => {
    const [resInfo, setResInfo] = useState(null);

    useEffect(() => {
        fetchMenu()
    }, []);
    
    const fetchMenu = async () => {
        try {
            const data = await fetch(MENU_URL + resId);
            const json = await data.json();
            setResInfo(json.data);
        } catch (error) {
            console.error("Error fetching menu:", error);
        }
    }

    // console.log(resInfo);

    return resInfo;
}

export default useRestaurantMenu;