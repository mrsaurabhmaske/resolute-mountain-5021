import { useState } from 'react';
import { useToast} from "@chakra-ui/react"

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add your form submission logic here
    // e.g., send the formData to a server-side endpoint
    console.log(formData);
  };

  const formStyle = {
    maxWidth: '400px',
    margin: '50px auto',
    padding: '30px',
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

  const textareaStyle = {
    display: 'block',
    width: '100%',
    height: '100px',
    resize: 'vertical',
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

  const toast = useToast();

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

        <label style={labelStyle} htmlFor="message">
          Message:
        </label>
        <textarea
          style={textareaStyle}
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
        ></textarea>

        <button type="submit" style={buttonStyle}
          onClick={() => toast({
              title: 'Thank you for contacting us!',
              description: " We'll get back to you as soon as possible",
              status: 'success',
              duration: 9000,
              isClosable: true,
            })
      }>
          Submit
        </button>
      </form>
    </div>
  );
};

export default ContactUs;
