// React
import { lazy } from "react";

const Home = lazy(() => import("../pages/Home/index.tsx"));
const NoFound = lazy(() => import("../pages/404.tsx"));

export default [
  { path: "/", element: <Home /> },
  { path: "*", element: <NoFound /> },
];