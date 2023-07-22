import { useState,useEffect } from "react"
import DoctorCard from "../Components/DoctorCard"
import style from "./AllDoctors.module.css"
import { Heading, Button, Input, Center } from "@chakra-ui/react"
import Loader from "../Components/Loader"

function AllDoctors() { 

    const [doctors, setDoctors] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    const getDoctors = async (params) => {
        setLoading(true);
        try {
            let res = await fetch("https://medshine-data.onrender.com/doctors"+params);
            let data = await res.json();
            setDoctors(data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            alert("Something went wrong while fetching doctors data");
        }
    }

    const handleSearch  = (e) => {
        setInput((prev) => { return e.target.value });
        
    }

    useEffect(() => {
        getDoctors("");
    }, []);

    
    return (
        loading?<Loader/>:
        <>
            <Center p={3} >
                <Input type="text" w={"50%"} placeholder="Search Doctors by Name, City or Speciality" style={{ margin: "auto" }} onChange={handleSearch}/>
            </Center>
            <Center>

                <Button m={2} onClick={() => getDoctors("?_sort=fees&_order=asc")}>Fees: Low to High</Button>
                <Button onClick={() => getDoctors("?_sort=fees&_order=desc")}>Fees: High to Low</Button>
            </Center>

        <div className={ style.main}>
            {doctors?.map((d) => { 
                return <DoctorCard key={d.id} {...d}/>
            }) }
        </div>
            </>
    )
}

export default AllDoctors