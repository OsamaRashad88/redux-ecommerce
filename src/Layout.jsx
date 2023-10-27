import React from "react";
import { Outlet } from "react-router-dom";
import ResponsiveAppBar from "./Navbar";
export default function Layout() {
  return (
    <>
      <ResponsiveAppBar />
      <Outlet />
    </>
  );
}
