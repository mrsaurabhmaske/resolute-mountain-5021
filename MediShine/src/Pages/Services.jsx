import { Heading, Center,Button } from '@chakra-ui/react'
import { DebounceInput } from "react-debounce-input"
import style from "./Services.module.css"
import { useNavigate} from 'react-router-dom';
import Loader from '../Components/Loader'; 
import { useContext,useState,useEffect,useRef } from 'react'
import { AuthContext } from '../AuthContext/AuthContextProvider';
import { baseUrl } from '../api';

function Services() { 

    const navigate = useNavigate();

    const { services, setServices } = useContext(AuthContext);
    const [inputValue, setInputValue] = useState("");
    const [loading,setLoading] = useState(false);

    const inputRef = useRef();

    const getServices = async () => {
        setLoading(true);
        try {
            let res = await fetch(baseUrl+"/services?q="+inputValue);
            let data = await res.json();
            // console.log(data);
            setServices(data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            alert("Something went wrong while fetching services data");
        }
    }
    const handleSearch  = (e) => {
        setInputValue(e.target.value);
    }

    useEffect(() => { 
        getServices();
    }, [inputValue])

    return (loading?<Loader/>:
        <div className={style.main}>
            <Heading as="h1" pt={5} className={style.heading}>Offered Services</Heading>
            <Center p={3} >
                <DebounceInput
                        placeholder="Search for Services..."
                        minLength={1}
                        debounceTimeout={1000}
                        onChange={handleSearch}
                        value={inputValue}
                        inputRef={inputRef}
                        autoFocus
                        style={{
                            width: "500px",
                    padding:"10px 30px",borderRadius:"30px",boxShadow:"rgba(0, 0, 0, 0.16) 0px 1px 4px"}}
                />    
            </Center>
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