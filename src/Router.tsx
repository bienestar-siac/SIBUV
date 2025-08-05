// React
import { Routes, Route } from "react-router-dom";
import { Suspense, useEffect, Fragment } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

// Components
import routes from "./router/Router";
import Loader from "./Components/Loarder/Loarder.tsx";
import FloatingChatAssistant from './Components/FloatingChatAssistant/FloatingChatAssistant'

// Styles
import "./css/root.css"

// Hooks
import { getDecryptedCookie } from './services/cookie/cookie'
import { useDispatch } from "react-redux";
import { setSession } from "./hooks/store"; 

/**
 * Router
*/
export default function Router() {
    // Navigate
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const session = useSelector((state) => state.session);
    const path = window?.location?.pathname

    const init = () => {
        const data = getDecryptedCookie('session_vbu')
        if (data?.id) {
            dispatch(setSession({ isAuth: true, user: data }));
            if (path === '/')
                navigate('/modules')
        }
    }

    useEffect(init,[])

    return (
        <Fragment>
            <Suspense fallback={<Loader />}>
            <Routes>
                {routes.map(({ path, element, isAuth }, index) => {
                    if (!isAuth)
                        return (<Route key={index} path={path} element={element} />)

                    if (isAuth && session?.isAuth)
                        return (<Route key={index} path={path} element={element} />)
                })}
            </Routes>
            </Suspense>
            {session?.isAuth && <FloatingChatAssistant />}
        </Fragment>
    );
}