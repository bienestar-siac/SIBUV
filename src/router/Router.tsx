// React
import { lazy } from "react";

const Home = lazy(() => import("../pages/Home/index.tsx"));
const NoFound = lazy(() => import("../pages/404.tsx"));
const Modules = lazy(() => import("../pages/Modules/index.tsx"));
const ModuleProcess = lazy(() => import("../pages/Process/index.tsx"));
const ModuleWorkerProcess = lazy(() => import("../pages/WorkerProcess/index.tsx"));
const ModuleWorkerPlan = lazy(() => import("../pages/WorkPlan/index.tsx"));
const GestionReport = lazy(() => import("../pages/GestionReport/index.tsx"));
const ModuleQuality = lazy(() => import("../pages/ModuleQuality/index.tsx"));
const ModuleAgreements = lazy(() => import("../pages/ModuleAgreements/index.tsx"));
const ModuleIA = lazy(() => import("../pages/IA/index.tsx"));

export default [
  { path: "/", element: <Home />, isAuth: false },
  { path: '/modules', element: <Modules />, isAuth: true},
  { path: '/module/process', element: <ModuleProcess />, isAuth: true},
  { path: '/module/process/:route', element: <ModuleWorkerProcess />, isAuth: true},
  { path: '/module/process/:route/:tool', element: <ModuleWorkerPlan />, isAuth: true},
  { path: '/module/informe-de-gestion', element: <GestionReport />, isAuth: true},
  { path: '/module/sistema-interno-de-aseguramiento-de-calidad', element: <ModuleQuality />, isAuth: true},
  { path: '/module/seguimiento-de-compromisos-y-acuerdos', element: <ModuleAgreements />, isAuth: true},
  { path: '/module/ia', element: <ModuleIA />, isAuth: true},
  { path: "*", element: <NoFound />, isAuth: false },
];