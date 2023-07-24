import { useState } from 'react';
import { Heading, Button } from '@chakra-ui/react';
import {useContext} from 'react';
import {AuthContext} from '../AuthContext/AuthContextProvider';


const Signup = () => {

  const { isDoctor,setIsDoctor } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    gender: '',
    phone: '',
    address: {
      city: '',
      state: 'Maharashtra',
      country: 'India',
    },
    bloodType: 'O+ve',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "city") {
      setFormData({ ...formData, address: {...formData.address, city: value} });
    }
    else { 
      setFormData({ ...formData, [name]: value });
    }
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
        try {
      let res = await fetch("https://medshine-data.onrender.com/patients", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json"
        }
      });
      console.log(res)

    } catch (error) {
      console.log("I am the Error===>",error)
    }

    // Reset the form fields after submission
    // setFormData({
    //   name: '',
    //   email: '',
    //   age: '',
    //   gender: '',
    //   phone: '',
    //   address: {
    //     city: '',
    //     state: 'Maharashtra',
    //     country: 'India',
    //   },
    //   bloodType: '',
    // });
  };

  return (
    <div style={formStyle}>

        <div style={{display:"flex",margin:"auto",maxWidth:"500px",justifyContent:"space-between",padding:"10px"}}>
          <Heading size="lg">{isDoctor ? "Doctor Registration" : "Patient Registration"}</Heading>
          <Button colorScheme={isDoctor?"blue":"green" } onClick={() => setIsDoctor(!isDoctor)}>{isDoctor ? "Not a Doctor?" : "I am a Doctor!"}</Button>
        </div>

      <form onSubmit={handleSubmit}>
        <label style={labelStyle} htmlFor="name">
          Name:
        </label>
        <input
          style={inputStyle}
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

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

        <label style={labelStyle} htmlFor="age">
          Age:
        </label>
        <input
          style={inputStyle}
          type="number"
          id="age"
          name="age"
          value={formData.age}
          onChange={handleChange}
          required
        />

        <label style={labelStyle} htmlFor="gender">
          Gender:
        </label>
        <input
          style={inputStyle}
          type="text"
          id="gender"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          required
        />

        <label style={labelStyle} htmlFor="phone">
          Phone:
        </label>
        <input
          style={inputStyle}
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <label style={labelStyle} htmlFor="city">
          City:
        </label>
        <input
          style={inputStyle}
          type="text"
          id="city"
          name="city"
          value={formData.address.city}
          onChange={handleChange}
          required
        />

        <label style={labelStyle} htmlFor="bloodType">
          Blood Type:
        </label>
        <input
          style={inputStyle}
          type="text"
          id="bloodType"
          name="bloodType"
          value={formData.bloodType}
          onChange={handleChange}
          required
        />

        <button style={buttonStyle} type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
};

const formStyle = {
  maxWidth: '450px',
  margin: '0 auto',
  padding: '30px',
  borderRadius: '20px',
  backgroundImage: "linear-gradient(-225deg, #473B7B 0%, #3584A7 51%, #30D2BE 100%)",
  color:"white"
};

const labelStyle = {
  display: 'block',
  width: '100%',
  marginBottom: '10px',
  fontWeight: 'bolder',
  color:"white"
};

const inputStyle = {
  display: 'block',
  width: '100%',
  marginBottom: '10px',
  padding: '5px',
  borderRadius: '5px',
  border: '1px solid #ccc',
  color:"black"
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

export default Signup;
