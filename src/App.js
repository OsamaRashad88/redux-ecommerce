import "./App.css";
import Home from "./Home";
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout";
import Categories from "./Categories";
import Detailedproduct from "./Detailedproduct";
import Login from "./Login";
import Register from "./Register";
import { logincontext, Logincontextprovider } from "./Logincontext";
import Protectedroute from "./Protectedroute";
import toast, { Toaster } from 'react-hot-toast';
import Cart from "./Cart";
import Wishlist from "./Wishlist";

 export const notify = () => toast('Here is your toast.')
const routers = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element:  <Categories />  },
      { path: "/products", element: <Protectedroute><Home />   </Protectedroute> },
      { path: ":productid", element:<Protectedroute> <Detailedproduct /> </Protectedroute> },
      { path: "/login", element: <Login /> },
      { path: "/cart", element: <Protectedroute> <Cart /> </Protectedroute> },
      { path: "/register", element: <Register /> },
      { path: "/wishlist", element: <Protectedroute> <Wishlist /> </Protectedroute> }

    ],
  },
]);
export default function App() {
  return<Logincontextprovider>
          <Toaster></Toaster>

    <RouterProvider router={routers}>
    </RouterProvider>
  </Logincontextprovider>
}
