import { useContext, useState } from 'react';
import { Heading, Button } from '@chakra-ui/react';
import { AuthContext } from '../AuthContext/AuthContextProvider';
import { baseUrl } from '../api';



const SignUpDoctor = () => {
  console.log(baseUrl)

  const { isDoctor,setIsDoctor } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    serviceIds: [],
  });

  const serviceOptions = [
    "General Health Checkup",
    "Allergy Management",
    "Diabetes Management",
    "Cardiology",
    "Pediatrics",
    "Gynecology",
    "Orthopedics",
    "Dermatology",
    "Mental Health Counseling",
    "Hypertension Management",
    "Obesity Counseling",
    "Acne Treatment",
    "Sports Medicine",
    "Asthma Management",
    "Gastroenterology",
    "High Cholesterol Management",
    "Insomnia Treatment",
    "Anemia Management",
    "PCOS Management",
    "Food Poisoning Treatment",
  ];

  const handleChange = (event) => {
    const { name, value } = event.target;
    if(name==="city"){
      setFormData({ ...formData, address: {...formData.address, city: value} });
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleServiceChange = (event) => {
    const { options } = event.target;
    const selectedServices = [];

    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedServices.push(options[i].value);
      }
    }
    setFormData({ ...formData, serviceIds: selectedServices });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let res = await fetch("https://medshine-data.onrender.com/doctors", {
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
    //   phone: '',
    //   address: '',
    //   serviceIds: [],
    // });
  };

  return (
    <div style={formStyle} >

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

        <label style={labelStyle} htmlFor="services">
          Services:
        </label>
        <select
          style={selectStyle}
          id="serviceIds"
          name="serviceIds"
          multiple
          value={formData.serviceIds}
          onChange={handleServiceChange}
          required
        >
          {serviceOptions.map((service, index) => (
            <option key={index} value={index+1}>
              {service}
            </option>
          ))}
        </select>

        <button style={buttonStyle} type="submit">
          Register
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
  backgroundImage: " linear-gradient(to top, #37ecba 0%, #72afd3 100%)",
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
  color: "black",
  fontSize:"20px"
};

const selectStyle = {
  display: 'block',
  width: '100%',
  marginBottom: '10px',
  padding: '5px',
  borderRadius: '5px',
  border: '1px solid #ccc',
  color: "black",
  backgroundColor: "lightblue",
  fontWeight:"bolder"
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

export default SignUpDoctor;
