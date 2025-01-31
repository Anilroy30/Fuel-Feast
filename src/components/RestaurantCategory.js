import ItemList from "./ItemList";

const RestaurantCategory = ({ data }) => {
    return (
        <div className="bg-white w-full p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center border-b pb-2 mb-4">
                <span className="text-2xl font-semibold text-gray-800">
                    {data.title} ({data?.itemCards.length})
                </span>
                <span className="text-lg">&#9660;</span>  {/* ▼ */}
            </div>

            <ItemList items={data.itemCards} />
        </div>
    );
};

export default RestaurantCategory;
