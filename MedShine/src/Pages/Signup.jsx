import React, { useState } from 'react';
import { Heading, Button } from '@chakra-ui/react';
import SignUpDoctor from '../Components/SignUpDoctor';
import SignUpPatient from '../Components/SignUpPatient';
import { withTheme } from '@emotion/react';

const Signup = () => {

    const [isDoctor, setIsDoctor] = useState(false);

    return (
        <div style={{backgroundColor:"#ADD3FF",height:"100vh",color:"#626FA7",paddingTop:"30px"}}>
        <div style={{display:"flex",margin:"auto",maxWidth:"500px",justifyContent:"space-between",padding:"10px"}}>
            <Heading size="lg">{isDoctor ? "Doctor Registration" : "Patient Registration"}</Heading>
                <Button colorScheme={isDoctor?"blue":"green" } onClick={() => setIsDoctor(!isDoctor)}>{isDoctor ? "Not a Doctor?" : "I am a Doctor!"}</Button>
        </div>
        { isDoctor?<SignUpDoctor toggle = { setIsDoctor } />: <SignUpPatient toggle={setIsDoctor} />}
        </div>
    )
};



export default Signup;
