// React
import { Routes, Route } from "react-router-dom";
import { Suspense, Fragment } from "react";

// Components
import routes from "./router/Router";
import Loader from "./Components/Loarder/Loarder.tsx";

// Styles
import "./css/root.css"

/**
 * Router
*/
export default function Router() {
    return (
        <Fragment>
            <Suspense fallback={<Loader />}>
            <Routes>
                {routes.map(({ path, element }, index) => (
                    <Route key={index} path={path} element={element} />
                ))}
            </Routes>
            </Suspense>
        </Fragment>
    );
}