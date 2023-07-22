import { createContext,useState } from 'react'

export const AuthContext = createContext();

function AuthContextProvider({children}) { 

    const [isAuth, setIsAuth] = useState({
        id:null,
        name: "",
        email: "",
        isLoggedIn:true
    });

    const [doctors, setDoctors] = useState([]);
    const [patients, setPatients] = useState([]);
    const [services, setServices] = useState([]);

    return <AuthContext.Provider value={{doctors, setDoctors, patients, setPatients, services, setServices,isAuth,setIsAuth}}>{ children}</AuthContext.Provider>
}

export default AuthContextProvider
