// React
import { lazy } from "react";

const Home = lazy(() => import("../pages/Home/index.tsx"));
const NoFound = lazy(() => import("../pages/404.tsx"));
const Modules = lazy(() => import("../pages/Modules/index.tsx"));

export default [
  { path: "/", element: <Home />, isAuth: false },
  { path: '/modules', element: <Modules />, isAuth: true},
  { path: "*", element: <NoFound />, isAuth: false },
];