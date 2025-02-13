import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";

import Header from "./components/Header";
import Body from "./components/Body";
import About from "./components/About";
import Contact from "./components/Contact";
import Error from "./components/Error";
import RestaurantMenu from "./components/RestaurantMenu";
import Cart from "./components/Cart";
import Footer from "./components/Footer";

import UserContext from "./utils/UserContext";
import { ThemeProvider } from "./components/ThemeContext"; // ✅ Import ThemeProvider

const AppLayout = () => {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const data = { name: "Akshay" };
    setUserName(data.name);
  }, []);

  return (
    <Provider store={appStore}>
      <UserContext.Provider value={{ loggedInUser: userName, setUserName }}>
        <ThemeProvider> {/* ✅ Wrap everything inside ThemeProvider */}
          <div className="flex flex-col min-h-screen">
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
