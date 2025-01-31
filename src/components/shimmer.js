const Shimmer = () => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
            {Array(12).fill("").map((_, index) => (
                <div key={index} className="w-full h-40 bg-gray-300 animate-pulse rounded-md"></div>
            ))}
        </div>
    );
};

export default Shimmer;
