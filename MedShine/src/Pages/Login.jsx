import {useContext, useState,useEffect } from 'react';
import { Heading,Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, useDisclosure, ModalCloseButton,Alert,AlertIcon } from '@chakra-ui/react';
import { useNavigate,Navigate } from 'react-router-dom';
import Loader from '../Components/Loader';
import {AuthContext} from '../AuthContext/AuthContextProvider';

const LoginForm = () => {
  const { isAuth, setIsAuth,doctors,setDoctors,patients,setPatients } = useContext(AuthContext);
  const navigate = useNavigate();
  const { onOpen,isOpen,onClose} = useDisclosure();
  const [loading, setLoading] = useState(false);
  const [inputError, setInputError] = useState(false);
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    userType: 'doctor',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = (event) => {
    event.preventDefault();

    if (formData.userType === 'doctor') {
      doctors.forEach((doctor) => { 
        if (doctor.email === formData.email && formData.password) {
          setIsAuth({
            id: doctor.id,
            name: doctor.name,
            email: doctor.email,
            isLoggedIn: true,
            type: "doctor"
          })
        }
        else { 
          setInputError(true);
          setTimeout(() => {
            setInputError(false);
          }, 2000);
        }
      })
    }

    else if (formData.userType === 'patient') {
      patients.forEach((patient) => { 
        if (patient.email === formData.email && formData.password) {
          setIsAuth({
            id: patient.id,
            name: patient.name,
            email: patient.email,
            isLoggedIn: true,
            type:"patient"
          })
        }
        else { 
          setInputError(true);
          setTimeout(() => {
            setInputError(false);
          }, 1500);
        }
      })
    }

  };

  const getDoctors = async () => {
    setLoading(true);
    try {
        let res = await fetch("https://medshine-data.onrender.com/doctors");
      let data = await res.json();
      console.log("Doctors", data);
        setLoading(false);
        setDoctors(data);
    } catch (error) {
        setLoading(false);
        alert("Something went wrong while fetching doctors data");
    }
  }

  const getPatients = async () => {
    setLoading(true);
    try {
        let res = await fetch("https://medshine-data.onrender.com/patients");
      let data = await res.json();
      console.log("Patients", data);
        setLoading(false);
        setPatients(data);
    } catch (error) {
        setLoading(false);
        alert("Something went wrong while fetching doctors data");
    }
  }

  useEffect(() => {
    onOpen();
    getDoctors();
    getPatients();
    
  }, [])

  return (isAuth.isLoggedIn && isAuth.type=="patient") ?(<Navigate to="/alldoctors"></Navigate>):(isAuth.isLoggedIn && isAuth.type=="doctor") ?(<Navigate to="/doctordashboard"></Navigate>):
    (loading ? <Loader /> :
      <div style={{textAlign:"center"}}>
        <Heading color="grey" pt={10} textAlign={"center"}>Please Login to proceed further...</Heading>
        <Button m={5} onClick={onOpen} colorScheme='blue'>Login</Button>
        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Please Login Continue</ModalHeader>
          <ModalCloseButton />
          <ModalBody>

            { inputError && <Alert status='error'>
    <AlertIcon />
    Please check your credentials!
  </Alert>}

    <div style={formStyle}>
      <Heading as="h2" size="lg" mb="10px" textAlign={"center"}>Login</Heading>
      <form onSubmit={handleLogin}>
        <label style={labelStyle} htmlFor="email">
          Email:
        </label>
        <input
          style={inputStyle}
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          />

        <label style={labelStyle} htmlFor="password">
          Password:
        </label>
        <input
          style={inputStyle}
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <label style={labelStyle} htmlFor="userType">
          Login As:
        </label>
        <select
          style={selectStyle}
          id="userType"
          name="userType"
          value={ formData.userType }
          onChange={handleChange}
        >
          <option value="doctor">Doctor</option>
          <option value="patient">Patient</option>
        </select>
<br />
        <label htmlFor="new">New to MediShine? <span style={{ textDecoration: "underline"}} onClick={()=>navigate("/signup")}>Create an account</span></label><br /><br />

        <button style={buttonStyle} type="submit">
          Login
        </button>
      </form>
    </div>
          </ModalBody>
        </ModalContent>
      </Modal>
</div>

  );
};

const formStyle = {
  maxWidth: '400px',
  margin: '0 auto',
  padding: '20px',
  border: '1px solid #ccc',
  borderRadius: '5px',
};

const labelStyle = {
  display: 'block',
  width: '100%',
  marginBottom: '10px',
};

const inputStyle = {
  display: 'block',
  width: '100%',
  marginBottom: '10px',
  padding: '5px',
  borderRadius: '5px',
  border: '1px solid #ccc',
};

const selectStyle = {
  display: 'block',
  width: '100%',
  marginBottom: '10px',
  padding: '5px',
  borderRadius: '5px',
  border: '1px solid #ccc',
};

const buttonStyle = {
  display: 'block',
  width: '100%',
  padding: '10px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

export default LoginForm;
