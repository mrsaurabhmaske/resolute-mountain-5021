import style from "./Fancy.module.css"
import { useToast } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../AuthContext/AuthContextProvider";


function Fancy({ time}) {

    const toast = useToast();
    const navigate = useNavigate();
    const { setAppointment} = useContext(AuthContext);

    return (<button className={style.button + " " + style.type1} onClick={() => {
        toast({
            title: 'Booking Slot for ' + time,
            description: "Taking you to Payments Page",
            status: 'success',
            duration: 9000,
            isClosable: true,
        });
        setTimeout(() => {
            navigate("/payments")
        }, 1000);
        setAppointment({
            patientid: null,
            doctorid: null,
            service: {
                id: null,
                title: "",
                description: ""
            },
            appointmentDateTime: ""
    })

    }} ></button>) 
}

export default Fancy