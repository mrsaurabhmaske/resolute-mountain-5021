import { Heading, Button } from '@chakra-ui/react'
import { Link } from 'react-router-dom';
import Doc1 from '../Images/doctor1.jpg';
import Doc2 from '../Images/doctor2.jpg';
import Doc3 from '../Images/doctor3.jpg';
import Doc4 from '../Images/doctor4.jpg';
import Doc5 from '../Images/doctor5.jpg';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../AuthContext/AuthContextProvider';

const features1 = [
    {
        id: 1,
        title: "Specialized Service",
        description: "Wide range of specialized medical services by experienced doctors.",
        image: "https://cdn-icons-png.flaticon.com/128/3957/3957535.png"
    },
    {
        id: 2,
        title: "24/7 Proper Care",
        description: "Round-the-clock care and support for your healthcare needs.",
        image: "https://cdn-icons-png.flaticon.com/128/2059/2059694.png"
    },
    {
        id: 3,
        title: "Get Result Online",
        description: "Access your medical test results securely online.",
        image: "https://cdn-icons-png.flaticon.com/128/2376/2376100.png"
    }
];

const features2 = [
    {
        id: 1,
        title: "Counselling",
        description: "Professional counselling services for emotional support and stress management, empowering you to thrive in life's challenges.",
        image: "https://cdn-icons-png.flaticon.com/128/3957/3957535.png"
    },
    {
        id: 2,
        title: "Diagnosis",
        description: "Accurate medical diagnosis to guide effective treatment plans, ensuring personalized care for your health needs.",
        image: "https://cdn-icons-png.flaticon.com/128/2059/2059694.png"
    },
    {
        id: 3,
        title: "Emergency Care",
        description: "Immediate and responsive medical care for critical situations, providing expert support during times of urgency.",
        image: "https://cdn-icons-png.flaticon.com/128/2376/2376100.png"
    }
];

const topDoctors = [
    {
        id: 1,
        image: Doc1,
        name: "Dr. Rakesh Sharma",
        speciality: "Cardiologist"
    },
    {
        id: 2,
        image: Doc2,
        name: "Dr. Neha Singh",
        speciality: "Pediatrician"
    },
    {
        id: 3,
        image: Doc3,
        name: "Dr. Priyank Patel",
        speciality: "Dermatologist"
    },
    {
        id: 4,
        image: Doc4,
        name: "Dr. Sneha Gupta",
        speciality: "Orthopedic Surgeon"
    },
    {
        id: 5,
        image: Doc5,
        name: "Dr. Siddharth Verma",
        speciality: "Psychiatrist"
    },
];


function Home() { 
    const { isAuth, isDoctor, appointment } = useContext(AuthContext); 
    console.log(appointment)
    const navigate = useNavigate();

    return (
        <div className='home'>

            <div className='sectionOne'>
                <div className="homeLeft">
                    <Heading as="h1" >We help patients live a healthy, longer life.</Heading>
                    <p style={{fontSize:"20px",margin:"30px 20px 30px 20px"}}>We value your time so we set up all your accounts billing and costs through one payment that we take out Of the box</p>
                    <Button m="40px" colorScheme='blue' onClick={() => { (isAuth?.type === "doctor") ? navigate("/doctordashboard") : (isAuth?.type === "patient") ? navigate("/alldoctors") : navigate("/login") }}>{isAuth.type==="doctor"?"Go to Dashoard":(isAuth?.type==="patient")?"Make Appointment":(isDoctor?"Login as Doctor":"Make an Appointent")}</Button>
                </div>

                <div className='homeRight'>
                    <img src="https://img.freepik.com/free-photo/smiling-young-female-doctor-wearing-medical-robe-with-stethoscope-crossing-hands-isolated-orange-background_141793-118910.jpg?w=900&t=st=1689868147~exp=1689868747~hmac=651eaa1c9bb3fbe07f5213dcc5a3589ffba53ec8c537f6a5f35700e94a9b8f6c" alt="Doctor" />
                </div>
            </div>

            <div className='sectionTwo'>
                {features1.map((f) => { 
                    return (<div key={ f.id} className="homeFeature">
                        <div className='titleAndImage'>
                            <img src={ f.image} alt={ f.title} />
                            <p>{f.title}</p>
                        </div>
                        <div className='featureDescription'>
                            { f.description}
                        </div>
                    </div>)
                })}
            </div>

            <div className='sectionThree'>
                <div className='sectionThreeLeft'>
                    <img src="https://img.freepik.com/free-photo/photo-young-female-doctor-make-okaysign-blue_496169-2165.jpg?w=996&t=st=1689868064~exp=1689868664~hmac=87f92806d24de8737592749e18a6e4d83e1e1c83be47c734ed100fd93fd5b366" alt="Doctor" />
                </div>

                <div className="sectionThreeRight">
                    <Heading as="h1">Affordable Health Care Solutions</Heading>
                    <p style={{fontSize:"20px",margin:"30px 20px 30px 20px"}}>We value your time so we set up all your accounts billing and costs through one payment that we take out Of the box</p>
                    <div className="features2">
                        <div className='feature2'>
                            <img src="https://cdn-icons-png.flaticon.com/128/1828/1828640.png" alt="" />
                            <Heading as="h5" size="md">450+ Happy Patients</Heading>
                        </div>

                        <div className='feature2'>
                            <img src="https://cdn-icons-png.flaticon.com/128/1828/1828640.png" alt="" />
                            <Heading as="h5" size="md">300+ Hospital Rooms</Heading>
                        </div>

                        <div className='feature2'>
                            <img src="https://cdn-icons-png.flaticon.com/128/1828/1828640.png" alt="" />
                            <Heading as="h5" size="md">100+ Expert Doctors</Heading>
                        </div>
                    </div>
                </div>
            </div>

            <div className='sectionFour'>

                <div className='sectionFourTop'>
                    <div><Heading as="h1">Other Services that We Offer</Heading></div>
                    <div><p>To facilitate medical services through health care facilities, especially for people who are difficult to reach or have difficulty accessing health care facilities</p></div>
                </div>

                <div className='sectionFourBottom'>
                    {features2.map((f) => { 
                    return (<div key={ f.id} className="homeFeature2">
                            <div className='titleAndImage2'>
                                <img src={ f.image} alt={ f.title} />
                                <p>{f.title}</p>
                            </div>
                            <div className='featureDescription2'>
                                { f.description}
                        </div>
                        <Link to="/services">Learn More</Link>
                        </div>)
                    })}
                </div>
            </div>

            <div className='sectionFive'>
                <div className="sectionFiveLeft">
                    <Heading as="h1">Trust your health! Get Advice from the specialists.</Heading>
                    <p style={{fontSize:"20px",margin:"30px 20px 30px 20px"}}>We value your time so we set up all your accounts billing and costs through one payment that we take out Of the box</p>
                    <Button m="20px" colorScheme='blue'>Learn More</Button>
                </div>

                <div className="sectionFiveRight">
                    <img src="https://img.freepik.com/free-photo/smiling-young-female-doctor-wearing-medical-robe-with-stethoscope-points-side-isolated-orange-background-with-copy-space_141793-118932.jpg?w=900&t=st=1689878207~exp=1689878807~hmac=636ffe9c0b73c6739ee6a030b18bd97aa608aa1c762b1ddf0f552d2b0c29be58" alt="Doctor" />
                </div>
            </div>

            <div className='sectionSix'>
                <Heading as="h1">Our Dedicated Doctors</Heading>
                <div className='doctorsContainer'>
                    {topDoctors.map((d) => { 
                        return (<div key={d.id} className="doctor">
                            <img src={ d.image} alt={`Doctor${d.id}`} />
                            <p className="doctorsname">{d.name}</p>
                            <p>{d.speciality}</p>
                        </div>)
                    })}
                </div>
            </div>
        
        </div>
)
}

export default Home