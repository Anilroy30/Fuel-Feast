import React from "react";
import ReactDOM from "react-dom/client";
import Header from './components/Header';
import Body from './components/Body';
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import About from "./components/About";
import Contact from "./components/Contact";
import Error from "./components/Error";
import RestaurantMenu from "./components/RestaurantMenu";
import { useState, useEffect } from "react";
import UserContext from "./utils/UserContext";
import {Provider} from "react-redux";
import appStore from "./utils/appStore";


const currYear = new Date().getFullYear();

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white text-center p-4 mt-6">
      <p>
        Copyright &copy; {currYear}, Made with 💗 by <strong>Anil</strong>
      </p>
    </footer>
  );
};

const AppLayout = () => {
  const [userName, setUserName] = useState();

  useEffect(() => {
    const data = {
      name: "Akshay"
    };
    setUserName(data.name);
  }, []);

    return (
        <Provider store={appStore}>
          <UserContext.Provider value={{ loggedInUser: userName, setUserName }}>
            <div className="flex flex-col min-h-screen">
                <Header />
                <div className="flex-1">
                    <Outlet />
                </div>
                <Footer />
            </div>
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
      { path: "/restaurant/:resId", element: <RestaurantMenu /> }
    ],
    errorElement: <Error />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
