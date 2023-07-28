import { Route, Routes,Navigate } from "react-router-dom"
import Home from "../Pages/Home"
import About from "../Pages/About"
import Services from "../Pages/Services"
import DoctorsAsPerService from "../Pages/DoctorsAsPerService";
import Signup from "../Pages/Signup"
import AllDoctors from "../Pages/AllDoctors"
import Login from "../Pages/Login"
import PrivateRoute from "./PrivateRoute"
import Doctordashoard from "../Pages/DoctorDashboard";
import SlotBooking from "../Pages/SlotBooking";
import Payments from "../Pages/Payments";
import PatientDashboard from "../Pages/PatientDashboard";

function AllRoutes() { 
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/services" element={<Services />} />
            <Route path="/services/:id" element={ <DoctorsAsPerService/>}></Route>
            <Route path="/alldoctors" element={<AllDoctors />} />
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/doctordashboard" element={<PrivateRoute><Doctordashoard /></PrivateRoute>}></Route>
            <Route path="/booking/:id" element={<PrivateRoute><SlotBooking /></PrivateRoute>}></Route>
            <Route path="/patientdashboard" element={<PrivateRoute><PatientDashboard /></PrivateRoute>}></Route>
            <Route path="*" element={<Navigate to="/" />}></Route>
            <Route path="/payments" element={<PrivateRoute><Payments/></PrivateRoute> }></Route>
        </Routes>
    )
}

export {AllRoutes}