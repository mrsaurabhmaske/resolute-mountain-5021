import React, { useState } from 'react';

const SignUpDoctor = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    services: [],
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
    setFormData({ ...formData, services: selectedServices });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here, you can add your doctors registration logic
    console.log(formData); // You can send this data to your backend for registration
    // Reset the form fields after submission
    setFormData({
      name: '',
      email: '',
      phone: '',
      city: '',
      services: [],
    });
  };

  return (
    <div style={formStyle} >
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
          value={formData.city}
          onChange={handleChange}
          required
        />

        <label style={labelStyle} htmlFor="services">
          Services:
        </label>
        <select
          style={selectStyle}
          id="services"
          name="services"
          multiple
          value={formData.services}
          onChange={handleServiceChange}
          required
        >
          {serviceOptions.map((service, index) => (
            <option key={index} value={service}>
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
  borderRadius: '5px',
  backgroundColor: "#ADD3FF",
  boxShadow: "rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset",
};

const labelStyle = {
  display: 'block',
  width: '100%',
  marginBottom: '10px',
  fontWeight: 'bolder',
  color:"#626FA7"
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

export default SignUpDoctor;
