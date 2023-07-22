import React, { useState,useEffect } from 'react';
import { Heading, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, useDisclosure, ModalCloseButton } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const navigate = useNavigate();
  const { onOpen,isOpen,onClose} = useDisclosure();
  
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
    // Here, you can add your login logic
    console.log(formData); // You can send this data to your backend for authentication
    // Reset the form fields after submission
    setFormData({
      email: '',
      password: '',
      userType: 'doctor',
    });
  };

  useEffect(() => {onOpen()},[])

  return (
        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Please Login Continue</ModalHeader>
          <ModalCloseButton />
          <ModalBody>

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
          value={formData.userType}
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
