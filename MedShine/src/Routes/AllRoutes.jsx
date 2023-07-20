import { Route, Routes } from "react-router-dom"
import Home from "../Pages/Home"
import About from "../Pages/About"
import Services from "../Pages/Services"

function AllRoutes() { 
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/services" element={<Services/>}/>
            <Route path="/findDoctor" element={<Services/>}/>
        </Routes>
    )
}

export {AllRoutes}