import { useContext } from 'react';
import SignUpDoctor from '../Components/SignUpDoctor';
import SignUpPatient from '../Components/SignUpPatient';
import {AuthContext} from '../AuthContext/AuthContextProvider';


const Signup = () => {

    const { isDoctor} = useContext(AuthContext);

    return (
        <div style={{ display:"flex",gap:"0px",backgroundColor:"lightblue",paddingBottom:"300px" }}>
        <div style={{ backgroundColor: "", color: "#626FA7", paddingTop: "30px",display:"flex",width:"1100px" }}>
        { isDoctor?<SignUpDoctor/>: <SignUpPatient/>}
            </div>
            <div style={{backgroundColor:"",padding:"100px 300px 0px 0px"}}>
                {!isDoctor
                    ? <img src="http://www.clipartbest.com/cliparts/KTn/X8B/KTnX8BLAc.gif" alt="gif" style={{ width: "500px", backgroundBlendMode: "", height: "500px", mixBlendMode: "multiply" }} />
                    : <img src="https://media.tenor.com/rk07qeKj1y0AAAAM/cool-sunglasses.gif" alt="gif" style={{ mixBlendMode: "multiply", width: "500px", height: "500px" }} />}
                
            </div>
        </div>
            
    )
};



export default Signup;
