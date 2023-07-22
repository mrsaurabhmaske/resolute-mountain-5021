import { Route, Routes } from "react-router-dom"
import Home from "../Pages/Home"
import About from "../Pages/About"
import Services from "../Pages/Services"
import DoctorsAsPerService from "../Pages/DoctorsAsPerService";
import Signup from "../Pages/Signup"
import AllDoctors from "../Pages/AllDoctors"
import Login from "../Pages/Login"
import PrivateRoute from "./PrivateRoute"


function AllRoutes() { 
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/services" element={<Services />} />
            <Route path="/services/:id" element={ <DoctorsAsPerService/>}></Route>
            <Route path="/alldoctors" element={<PrivateRoute><AllDoctors /></PrivateRoute>} />
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/login" element={<Login />}></Route>
        </Routes>
    )
}

export {AllRoutes}