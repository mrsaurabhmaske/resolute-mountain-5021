import { Heading, Button } from '@chakra-ui/react'
import { useState ,useContext} from 'react'
import style from "../Pages/AllDoctors.module.css"
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../AuthContext/AuthContextProvider'


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


function DoctorCard({ name, email, phone,serviceIds,id, address,availableSlots,fees }) {
    
    const [slotsHidden, setSlotsHidden] = useState(true);
    const navigate = useNavigate();

    const { isAuth,setAppointment,appointment} = useContext(AuthContext);

    return (
        <div style={{ padding: "20px", borderRadius: "20px",display:"flex",boxShadow:" rgba(0, 0, 0, 0.24) 0px 3px 8px",margin:"10px"}} className={style.doctorr}>
            <img style={{ width:"25%",height:"250px"}} src="https://img.freepik.com/free-vector/doctor-character-background_1270-84.jpg?w=826&t=st=1689966510~exp=1689967110~hmac=18cc30256d86cb625f8d575fd1e623c003df55c67abfbec1420537e345d098a4" alt="name" />
            <div style={{marginLeft:"20px"}}>

            <Heading as="h1" size="lg" mb={ 2}>{name}</Heading>
            <p size="md">📤 {email}</p>
            <p size="md">📞{phone}</p>

                <div style={{ width: "400px",borderRadius:"20px", padding:"10px",display: "flex",justifyContent:"space-between"}}>
            {/* Address Container */}
            <div style={{padding:"10px",borderRadius:"10px",gap:"20px",boxShadow:"rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"}}>
            <Heading size="md">{address.city}</Heading>
            <p>{address.state}, { address.country}</p>
            </div>
                    {/* ===================================================================     */}
                    
                    {/* Services Contaner */}
                <div style={{}}>
                    <Heading size="md">Services:</Heading>
                    <ul>
                        { serviceIds?.map((id,ind) => {
                                return (<li key={ind}>{ServicesAsPerId[id]}</li>)
                            })
                        }
                    </ul>
                </div>
                    {/* ===================================================================     */}
                    
                </div>
                <p style={{ margin: "10px" }}>Fees: {fees}</p>
            <Button colorScheme="blue" onClick={() => setSlotsHidden(!slotsHidden)}>Show Available Slots</Button>
                {!slotsHidden && <div style={{ backgroundColor: "", borderRadius: "10px", margin: "10px" }}>
                {availableSlots?.map((slot,ind) => {
                    return (
                        <Button m={2} key={ind} p={2} colorScheme='green' onClick={() => { setAppointment({ ...appointment, appointmentDateTime: slot,doctorid:id,patientid:isAuth.id}); navigate(`/booking/${id}`)}}>{slot}</Button>
                    )
                })}
            </div>}

            </div>
        </div>)    
} 

export default DoctorCard