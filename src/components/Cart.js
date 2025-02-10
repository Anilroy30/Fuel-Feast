import { useSelector, useDispatch } from "react-redux";
import ItemList from "./ItemList";
import { clearCart } from "../utils/cartSlice";

const Cart = () => {
    const cartItems = useSelector((store) => store.cart.items);
    const dispatch = useDispatch();

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    return (
        <div className="flex flex-col items-center p-6">
            <h1 className="text-3xl font-bold mb-4">🛒 Your Cart</h1>
            
            <div className="w-8/12 p-6 bg-white shadow-lg rounded-lg">
                {cartItems.length > 0 ? (
                    <>
                        <button 
                            className="p-2 bg-red-500 text-white rounded-lg mb-4 hover:bg-red-600 transition"
                            onClick={handleClearCart}
                        >
                            🗑️ Clear Cart
                        </button>
                        <ItemList items={cartItems} />
                    </>
                ) : (
                    <div className="text-center text-gray-500 text-lg p-6">
                        <p>🛍️ Your cart is empty!</p>
                        <p className="mt-2">Add some items to see them here.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
