import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./components/HomePage";
import RestaurantPage from "./components/RestaurantPage";
import Cart from "./components/Cart";
import { Provider } from "react-redux";
import Store from "./utils/Store/Store.js";
import Offers from "./components/Offers.js";
import SignIn from "./components/SignIn.js";
import Help from "./components/Help.js";
import Search from "./components/Search.js";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <Provider store={Store}>
        <App />
      </Provider>
    ),
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/restaurant/:id",
        element: <RestaurantPage />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/offers",
        element: <Offers />,
      },
      {
        path: "/signin",
        element: <SignIn />,
      },
      {
        path: "/help",
        element: <Help />,
      },
      {
        path: "/search",
        element: <Search />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
