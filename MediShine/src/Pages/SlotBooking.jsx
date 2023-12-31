import { Heading, Button } from '@chakra-ui/react';     
import { useContext ,useState, useEffect} from 'react';
import { AuthContext } from '../AuthContext/AuthContextProvider';
import { useParams } from 'react-router-dom';
import style from './SlotBooking.module.css';
import Fancy from '../Components/Fancy';
import { ServicesAsPerId } from '../api';
    
function SlotBooking() { 
        
    const { appointment, setAppointment, doctors, patients } = useContext(AuthContext);
    const [currentDoctor, setCurrentDoctor] = useState({});
    const [currentPatient, setCurrentPatient] = useState({});
    // console.log("isAuth:", isAuth);
    console.log("appointment: ", appointment);
    // console.log(currentPatient,currentDoctor)

    const { id } = useParams();

    const handleChange = (event) => {
        const { value } = event.target;
        setAppointment({ ...appointment, service: {id: value,title:ServicesAsPerId[value],description:ServicesAsPerId[value]} });
    }
    
    useEffect(() => { 
        
    fetch(`https://medshine-data.onrender.com/doctors/${id}`)
            .then(res => res.json())
            .then(data => {
                setCurrentDoctor(data);
            })
        
        fetch(`https://medshine-data.onrender.com/patients/${appointment.patientid}`)
            .then(res => res.json())
            .then(data => {
                setCurrentPatient(data);
            })

    }, [])
    
    return (
        <div className={ style.main}>
            <Heading size="lg">Booking a Slot with <span>{currentDoctor.name}</span></Heading>
            <div className={ style.details}>
                <table className={ style.table}>
                    <thead>
                        <tr>
                        <td>Doctor</td>
                        <td>Email</td>
                        <td>Phone</td>
                        <td>Date / Time</td>
                        <td>Fees</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td>{currentDoctor.name}</td>
                        <td>{currentDoctor.email}</td>
                        <td>{currentDoctor.phone}</td>
                        <td>{appointment.appointmentDateTime}</td>
                        <td>Rs. { currentDoctor.fees}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <br />
            <hr />
            
            <Heading size="lg">Patient Details</Heading>

            <div className={ style.details}>
                <table className={ style.table}>
                    <thead>
                        <tr>
                            <td>Name</td>
                            <td>Contact</td>
                            <td>Service</td>
                            <td>Medical history</td>
                            <td>Conditions</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{currentPatient.name}</td>
                            <td>{currentPatient.email}<br/>{currentDoctor.phone}</td>
                            <td><select name="availedService" id="availedService" onChange={handleChange}>
                                {currentDoctor?.serviceIds?.map((sid) => { 
                                    return <option key={ sid} value={sid}>{ServicesAsPerId[sid]}</option>
                                })}</select></td>
                            <td>
                                {currentPatient?.medicalHistory?.map((m,ii) => { 
                                    return <p key={ ii}>{m}</p>
                                })}</td>
                            <td>{currentPatient?.healthConditions?.map((m,ii) => { 
                                    return <p key={ ii}>{m}</p>
                            })}</td>
                            </tr>
                    </tbody>
                </table>
            </div>
            <br />

            <Fancy time={ appointment.appointmentDateTime} />

        </div>
    )
}

export default SlotBooking