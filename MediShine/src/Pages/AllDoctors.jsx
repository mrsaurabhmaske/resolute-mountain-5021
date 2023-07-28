import { useState,useEffect,useContext,useRef } from "react"
import DoctorCard from "../Components/DoctorCard"
import style from "./AllDoctors.module.css"
import { Button, Center } from "@chakra-ui/react"
import Loader from "../Components/Loader"
import { DebounceInput } from "react-debounce-input"
import { baseUrl } from "../api"
import {AuthContext} from "../AuthContext/AuthContextProvider"



    
    
function AllDoctors() {
    

    const {doctors, setDoctors} = useContext(AuthContext);
    const [inputValue, setInputValue] = useState("");
    const [loading, setLoading] = useState(false);

    const inputRef = useRef();

    const getDoctors = async (searching, sorting) => {
        setLoading(true);
        let URL = `${baseUrl}/doctors`; 
        if (searching && sorting) {
            URL += `?q=${searching}&_sort=fees&_order=${sorting}`;
        }
        else if (searching && !sorting) { 
            URL += `?q=${searching}`;
        }
        else if (sorting && !searching) {
            URL += `?_sort=fees&_order=${sorting}`;
        }
        try {
            let res = await fetch(URL);
            let data = await res.json();
            setDoctors(data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            alert("Something went wrong while fetching doctors data");
        }
    }

    const handleSearch  = (e) => {
        setInputValue(e.target.value);
    }

    useEffect(() => {
        getDoctors(inputValue, "");
    }, [inputValue]);

    
    return (
        loading?<Loader/>:
        <>
            <Center p={3} >
                <DebounceInput
                        placeholder="Search Doctors by Name, City or Speciality"
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
                
            <Center>

                <Button mr={5} colorScheme="green" onClick={() => getDoctors(inputValue,"asc")}>Fees: Low to High</Button>
                <Button colorScheme="green" onClick={() => getDoctors(inputValue,"desc")}>Fees: High to Low</Button>
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