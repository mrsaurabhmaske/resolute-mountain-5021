import { useParams } from 'react-router-dom';
import {  useState,useEffect } from 'react';
import style from "./DoctorsAsPerService.module.css"
import DoctorCard from '../Components/DoctorCard';
import { Heading } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';
import Loader from '../Components/Loader';

const ServicesAsPerId = {
  "1": "General Health Checkup",
  "2": "Allergy Management",
  "3": "Diabetes Management",
  "4": "Cardiology",
  "5": "Pediatrics",
  "6": "Gynecology",
  "7": "Orthopedics",
  "8": "Dermatology",
  "9": "Mental Health Counseling",
  "10": "Hypertension Management",
  "11": "Obesity Counseling",
  "12": "Acne Treatment",
  "13": "Sports Medicine",
  "14": "Asthma Management",
  "15": "Gastroenterology",
  "16": "High Cholesterol Management",
  "17": "Insomnia Treatment",
  "18": "Anemia Management",
  "19": "PCOS Management",
  "20": "Food Poisoning Treatment"
}


function DoctorsAsPerService() {
    const navigate = useNavigate();
    const { id } = useParams();
    console.log(id);

    const [doctors, setDoctors] = useState([]);
    const [loading,setLoading]  = useState(false);

    const getDoctors = async () => {
        setLoading(true);
        try {
            let res = await fetch("https://medshine-data.onrender.com/doctors");
            let data = await res.json();
            setDoctors(data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            alert("Comething went wrong while fetching doctors data");
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