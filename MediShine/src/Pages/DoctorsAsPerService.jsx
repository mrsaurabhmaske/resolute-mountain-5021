import { useParams } from 'react-router-dom';
import {  useState,useEffect } from 'react';
import style from "./DoctorsAsPerService.module.css"
import DoctorCard from '../Components/DoctorCard';
import { Heading } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';
import Loader from '../Components/Loader';
import { ServicesAsPerId,baseUrl } from '../api';


function DoctorsAsPerService() {
    const navigate = useNavigate();
    const { id } = useParams();
    console.log(id);

    const [doctors, setDoctors] = useState([]);
    const [loading,setLoading]  = useState(false);

    const getDoctors = async () => {
        setLoading(true);
        try {
            let res = await fetch(baseUrl+"/doctors");
            let data = await res.json();
            setDoctors(data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            alert("Something went wrong while fetching doctors data");
        }
    }

    

    useEffect(() => {
        getDoctors();
    }, []);

    return (loading?<Loader/>:
        <div className={style.main}>

            <Heading as="h2" size="md" mb={5} style={{cursor: "pointer"}}><span onClick={() => navigate("/services")}>{`Services >`}</span><span style={{ fontSize: "23px", color: "#308CC5", textDecoration: "underline" }}>{`${ServicesAsPerId[id]}`}</span></Heading>

            {doctors.map((d) => {
                if (d?.serviceIds?.includes(+id)) { 
                    return <DoctorCard key={d.id} {...d}/>
                }

            }
            )}
        </div>
)
}


export default DoctorsAsPerService