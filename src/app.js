import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import Header from './components/Header';
import Body from './components/Body';
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import About from "./components/About";
import Contact from "./components/Contact";
import Error from "./components/Error";
import RestaurantMenu from "./components/RestaurantMenu";
import UserContext from "./utils/UserContext";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Cart from "./components/Cart";
import Footer from "./components/Footer";
import { ThemeProvider } from "./utils/ThemeContext"; // ✅ Import Theme Context

const AppLayout = () => {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const data = { name: "Akshay" };
    setUserName(data.name);
  }, []);

  return (
    <Provider store={appStore}>
      <UserContext.Provider value={{ loggedInUser: userName, setUserName }}>
        <ThemeProvider>
          {/* ✅ Apply dark mode classes here */}
          <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white transition-all duration-300">
            <Header />
            <div className="flex-1">
              <Outlet />
            </div>
            <Footer />
          </div>
        </ThemeProvider>
      </UserContext.Provider>
    </Provider>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "/", element: <Body /> },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },
      { path: "/cart", element: <Cart /> },
      { path: "/restaurant/:resId", element: <RestaurantMenu /> }
    ],
    errorElement: <Error />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
