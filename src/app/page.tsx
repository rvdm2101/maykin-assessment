'use client'

import { useContext } from "react";
import { HotelContext } from "../Context/HotelContext";

const HomePage = () => {
    const { hotelsWithReviews } = useContext(HotelContext);
    console.log(hotelsWithReviews);
    return (
        <div>
            HomePage
        </div>
    )
}
export default HomePage;