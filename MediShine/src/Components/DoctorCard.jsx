import { Heading, Button } from '@chakra-ui/react'
import { useState ,useContext} from 'react'
import style from "../Pages/AllDoctors.module.css"
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../AuthContext/AuthContextProvider'
import { ServicesAsPerId } from '../api'


function DoctorCard({ name, email, phone,serviceIds,id, address,availableSlots,fees }) {
    
    const [slotsHidden, setSlotsHidden] = useState(true);
    const navigate = useNavigate();

    const { isAuth,setAppointment} = useContext(AuthContext);

    const handleScheduleAppointment = (slot) =>{ 
        setAppointment({
        "patientid": isAuth?.id,
        "doctorid": id,
        "service": {
            "id": null,
            "title": "",
            "description": ""
        },
        "appointmentDateTime": slot,
        "doctor": {
            "doctorid": id,
            "name": name,
            "email": email,
            "phone": phone,
            "fees": fees
        },
        "patient": {
            "patientid": isAuth.id,
            "name": isAuth?.name,
            "email": isAuth?.email
        }
    })
    }

    return (
        <div  className={style.doctorr}>
            <img  src="https://img.freepik.com/free-vector/doctor-character-background_1270-84.jpg?w=826&t=st=1689966510~exp=1689967110~hmac=18cc30256d86cb625f8d575fd1e623c003df55c67abfbec1420537e345d098a4" alt="name" />
            <div style={{marginLeft:"20px"}}>

            <Heading as="h1" size="lg" mb={ 2}>{name}</Heading>
            <p size="md">📤 {email}</p>
            <p size="md">📞{phone}</p>

                <div className={ style.addressServices}>
            {/* Address Container */}
            <div  className={ style.addressBar}>
            <Heading size="md">{address.city}</Heading>
            <p>{address.state}, { address.country}</p>
            </div>
                    {/* ===================================================================     */}
                    
                    {/* Services Contaner */}
                    <div style={{}} className={style.servicesOfDoctor}>
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
            <div className={ style.slotsContainer}>
                    
            <Button colorScheme={slotsHidden?"blue":"red"} onClick={() => setSlotsHidden(!slotsHidden)}>{(slotsHidden)?"Show Available Slots":"Hide"}</Button>
                {!slotsHidden && <div className={ style.doctorSlots}>
                {availableSlots?.map((slot,ind) => {
                    return (
                        <Button key={ind} colorScheme='green' onClick={() => { handleScheduleAppointment(slot,); navigate(`/booking/${id}`) }}>{slot}</Button>
                        )
                    })}
            </div>}
        </div>
            </div>
        </div>)    
} 

export default DoctorCard