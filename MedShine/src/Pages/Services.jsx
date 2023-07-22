import { Heading } from '@chakra-ui/react'
import style from "./Services.module.css"
import { useNavigate} from 'react-router-dom';

import { useContext,useEffect } from 'react'
import { AuthContext } from '../AuthContext/AuthContextProvider';

function Services() { 

    const navigate = useNavigate();

    const { services,setServices} = useContext(AuthContext);

    const getServices = async () => {
        try {
            let res = await fetch("https://medshine-data.onrender.com/services");
            let data = await res.json();
            console.log(data);
            setServices(data);
        } catch (error) {
            alert("Comething went wrong while fetching services data");
        }
    }

    useEffect(() => { 
        getServices();
    }, [])

    return (
        <div className={style.main}>
            <Heading as="h1" pt={5} className={ style.heading}>Offered Services</Heading>
            <div className={ style.services}>
                {services.map((s) => { 
                    return <div key={s.serviceId} className={style.service} onClick={()=> navigate(`/services/${s.serviceId}`)}>
                        <Heading as="h4">{s.title}</Heading>
                        <p>{ s.description}</p>
                    </div>
                })}
            </div>
        </div>
    )
}

export default Services