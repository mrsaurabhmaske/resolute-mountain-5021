import { createContext,useState } from 'react'

export const AuthContext = createContext();

function AuthContextProvider({ children }) { 
    const [doctors, setDoctors] = useState([]);
    const [services,setServices] = useState([]);
    const [patients, setPatients] = useState([]);
    const [isDoctor, setIsDoctor] = useState(false);

    const [appointment, setAppointment] = useState({
            patientid: null,
            doctorid: null,
            service: {
                id: null,
                title: "",
                description: ""
            },
            appointmentDateTime: ""
    })

    const [allAppointments,setAllAppointments] = useState([]);

    const [isAuth, setIsAuth] = useState({
        id:null,
        name: "",
        email: "",
        isLoggedIn: false,
        type:null
    });

    const logout = () => {
        setIsAuth({
            id:null,
            name: "",
            email: "",
            isLoggedIn: false,
            type:null
        })
    }


    return <AuthContext.Provider value={{allAppointments,setAllAppointments,patients,setPatients,doctors,setDoctors,appointment,setAppointment,isDoctor,setIsDoctor,logout,services,setServices,isAuth,setIsAuth}}>{ children}</AuthContext.Provider>
}

export default AuthContextProvider
