import { Heading, Button } from '@chakra-ui/react'
import { useState } from 'react'

function DoctorCard({ name, email, phone, address, serviceIds, availableSlots,fees }) {
    
    const [slotsHidden, setSlotsHidden] = useState(true);

    return (
        <div style={{ padding: "20px", borderRadius: "20px",display:"flex",boxShadow:" rgba(0, 0, 0, 0.24) 0px 3px 8px",margin:"10px"}}>
            <img style={{ width:"25%",height:"250px"}} src="https://img.freepik.com/free-vector/doctor-character-background_1270-84.jpg?w=826&t=st=1689966510~exp=1689967110~hmac=18cc30256d86cb625f8d575fd1e623c003df55c67abfbec1420537e345d098a4" alt="name" />
            <div style={{marginLeft:"20px"}}>

                <Heading as="h1" size="lg" mb={ 2}>{name}</Heading>
            <Heading size="md" mb={2}>Email: {email}</Heading>
            <Heading size="md" mb={3}>Contact No: {phone}</Heading>
                Address:
            <div style={{padding:"10px",borderRadius:"10px",display:"flex",gap:"20px",backgroundColor:"white"}}>
            <h3>City: {address.city}</h3>
            <h3>State: {address.state}</h3>
            <h3>Country: {address.country}</h3>
                </div>
                <p style ={{ margin: "10px" }}>Fees: { fees}</p>
            <Button colorScheme="blue" onClick={() => setSlotsHidden(!slotsHidden)}>Show Available Slots</Button>
                {!slotsHidden && <div style={{ backgroundColor: "", padding: "10px", borderRadius: "10px", margin: "10px" }}>
                {availableSlots?.map((slot,ind) => {
                    return (
                        <div key={ind } style={{marginBottom:"10px"}}> 
                            <Button p={2} colorScheme='green'>Book for ({ slot})</Button>
                        </div>
                    )
                })}
            </div>}

            </div>
        </div>)    
} 

export default DoctorCard