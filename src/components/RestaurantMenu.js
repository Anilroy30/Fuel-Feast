import { useState } from 'react';
import { useParams } from 'react-router-dom';
import useRestaurantMenu from '../utils/useRestaurantMenu';
// import ShimmerMenu from './ShimmerMenu';
import RestaurantCategory from './RestaurantCategory';
import Shimmer from './Shimmer';

const RestaurantMenu = () => {
  const { resId } = useParams();

//   const dummy = 'Dummy Data'

  const resInfo = useRestaurantMenu(resId);
    console.log(resInfo);
//   const [showIndex, setShowIndex] = useState(null);

  if (resInfo === null) return <Shimmer />;

  const {
    name,
    cuisines,
    costForTwoMessage,
    cloudinaryImageId,
    avgRating,
    deliveryTime,
  } = resInfo?.cards[2]?.card?.card?.info;

//   const { itemCards } =
//     resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card;

  const categories =
    resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (c) =>
        c.card?.card?.['@type'] ===
        'type.googleapis.com/swiggy.presentation.food.v2.ItemCategory'
    );

  // console.log(categories);

  return (
    <div className="text-center">
      <h1 className="font-bold my-6 text-2xl">{name}</h1>
      <p className="font-bold text-lg">
        {cuisines.join(', ')} - {costForTwoMessage}
      </p>
      {/* categories accordions */}
      {categories.map((category, index) => (
        // Controlled Component
        <RestaurantCategory
          key={category?.card?.card.title}
          data={category?.card?.card}
        //   showItems={index === showIndex ? true : false}
        //   setShowIndex={() => setShowIndex(index)}
        //   dummy={dummy}
        />
      ))}
    </div>
  );
};

export default RestaurantMenu;
