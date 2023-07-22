import React, { useState } from 'react';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    gender: '',
    phone: '',
    address: {
      city: '',
      state: '',
      country: '',
    },
    bloodType: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddressChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      address: {
        ...formData.address,
        [name]: value,
      },
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here, you can add your signup logic
    console.log(formData); // You can send this data to your backend for user registration
    // Reset the form fields after submission
    setFormData({
      name: '',
      email: '',
      age: '',
      gender: '',
      phone: '',
      address: {
        city: '',
        state: '',
        country: '',
      },
      bloodType: '',
    });
  };

  return (
    <div style={formStyle}>
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
          onChange={handleAddressChange}
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
  borderRadius: '5px',
  backgroundColor: "#ADD3FF",
  boxShadow: "rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset" 
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
