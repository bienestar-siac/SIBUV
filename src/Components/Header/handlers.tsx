// Cookie
import Cookies from "js-cookie";

export default ({
    setAnchorEl,
    dispatch,
    setSession,
    navigate
}) => {

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
  
      const handleClose = () => {
        setAnchorEl(null);
      };
  
      const onCloseSession = () => {
        Cookies.remove("session_token"); 
        dispatch(setSession({ isAuth: false, user: {} }));
        navigate('/')
      }

    return {
        handleClick,
        handleClose,
        onCloseSession,
    }
}