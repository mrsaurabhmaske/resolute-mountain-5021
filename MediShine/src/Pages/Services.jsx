import { Heading } from '@chakra-ui/react'
import style from "./Services.module.css"
import { useNavigate} from 'react-router-dom';
import Loader from '../Components/Loader'; 
import { useContext,useState,useEffect } from 'react'
import { AuthContext } from '../AuthContext/AuthContextProvider';
import { baseUrl } from '../api';

function Services() { 

    const navigate = useNavigate();

    const { services,setServices} = useContext(AuthContext);
    const [loading,setLoading] = useState(false);
    const getServices = async () => {
        setLoading(true);
        try {
            let res = await fetch(baseUrl+"/services");
            let data = await res.json();
            // console.log(data);
            setServices(data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            alert("Something went wrong while fetching services data");
        }
    }

    useEffect(() => { 
        getServices();
    }, [])

    return (loading?<Loader/>:
        <div className={style.main}>
            <Heading as="h1" pt={5} className={ style.heading}>Offered Services</Heading>
            <div className={ style.services}>
                {services.map((s) => { 
                    return <div key={s.id} className={style.service} onClick={()=> navigate(`/services/${s.id}`)}>
                        <Heading as="h4">{s.title}</Heading>
                        <p>{ s.description}</p>
                    </div>
                })}
            </div>
        </div>
    )
}

export default Services