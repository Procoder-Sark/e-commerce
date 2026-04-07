import React, { useEffect, useState } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router'

const ProtectedRoute = () => {
  
    const { pathname } = useLocation();

    const [ isLoggedIn, setIsLoggedin] = useState(true); // hardcoded for now
    const [ navigateToLogin, setNavigateToLogin ] = useState(null);
  
    useEffect(() => {
        if(!isLoggedIn){
            setTimeout(() => {
                setNavigateToLogin(true);
            }, 1000);
        } else{
            setTimeout(() => {
                setNavigateToLogin(false);
            }, 3000);
        }
    }, [isLoggedIn]);

    if(navigateToLogin) {
        return <Navigate to= '/login' replace= {true} state={pathname}/>
    }
    else if (navigateToLogin === false){
        return <Outlet />
    }
}


// usercart click->Protected route->loginPage
export default ProtectedRoute