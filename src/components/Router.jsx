import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ErrorPage } from "../components/ErrorPage.jsx";
import { App } from "../components/App.jsx";
import { Home } from "../components/Home.jsx";
import { Shop } from "../components/Shop.jsx";
import { Cart } from "../components/Cart.jsx";
import { Checkout } from "./checkout/Checkout.jsx";
import { ProductPage } from "./ProductPage.jsx";

function Router() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/Shop",
          element: <Shop />,
        },
        {
          path: "/Cart",
          element: <Cart />,
        },
        {
          path: "/Checkout",
          element: <Checkout />,
        },
        {
          path: "/Product",
          element: <ProductPage />,
        },
      ],
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export { Router };
