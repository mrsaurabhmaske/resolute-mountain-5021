import { useContext } from "react";
import {AuthContext} from "../AuthContext/AuthContextProvider";
import { Navigate } from 'react-router-dom'


export default function PrivateRoute({ children }) { 

    const { isAuth } = useContext(AuthContext);
    
    if(isAuth?.isLoggedIn){
        return children;
    }

    return <Navigate to="/login" />
}