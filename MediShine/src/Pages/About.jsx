
import doctorbg from '../Images/doctorbg.jpg';

const About = () => {
  const websiteCreatedBy = 'Saurabh Maske';
  const socialMediaLinks = {
    twitter: 'https://twitter.com/your_twitter_handle',
    facebook: 'https://facebook.com/your_facebook_page',
    instagram: 'https://instagram.com/your_instagram_profile',
    linkedin: 'https://linkedin.com/in/your_linkedin_profile',
  };

  return (
  
    // <Slide  direction='bottom' in={isOpen} style={{ zIndex: 10 }}>


    <div style={ mainStyle} className='AbountPageMain'>
    <div style={containerStyle}>
      <h2 style={sectionTitleStyle}>About Us</h2>
      <p>
        Welcome to our Medicare Website! We are dedicated to providing comprehensive and reliable information about Medicare
        and healthcare coverage options. Our goal is to empower individuals to make informed decisions about their health and
        well-being.
        </p>
        <br/>
        
      <p>
        At <strong>MediShine.com</strong>, our mission is to simplify the complexities of Medicare, making it accessible and easy to
        understand for everyone. We aim to be your trusted source for up-to-date information and expert guidance on Medicare
        plans and benefits.
        </p>
        <br />
      <p>
        Our team of experienced professionals is committed to serving you with the highest level of care and support. We believe
        that everyone deserves quality healthcare and the right resources to navigate the Medicare system effectively.
        </p>  
        <br />
        <hr/>
        
<br />
          <h3 style={sectionTitleStyle}>Website Credits: <span style={ {fontSize:"30px",backgroundColor:"white",color:"rgb(34, 101, 189)",fontWeight:"bold",padding:"5px 10px",borderRadius:"20px"}}>{websiteCreatedBy}</span></h3>
        <hr/>


      <h3 style={sectionTitleStyle}>Connect with Us</h3>
      <ul style={socialLinksStyle}>
        <li>
          <a href={socialMediaLinks.twitter} target="_blank" rel="noopener noreferrer">
            Twitter
          </a>
        </li>
        <li>
          <a href={socialMediaLinks.facebook} target="_blank" rel="noopener noreferrer">
            Facebook
          </a>
        </li>
        <li>
          <a href={socialMediaLinks.instagram} target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
        </li>
        <li>
          <a href={socialMediaLinks.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        </li>
        </ul>
        <br />
        <hr/>

      <h3 style={sectionTitleStyle}>Description</h3>
      <p>
        MediShine.com aims to provide a user-friendly platform for individuals to
        understand Medicare and access relevant information about healthcare coverage options. The website
        serves as an educational resource, helping users make informed decisions about their health.
      </p>
      </div>
      </div>
      // </Slide>
  );
};
const mainStyle = {
  backgroundImage: "url(" + doctorbg + ")",
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  height: "100%",
  padding: "20px",
  transition: "all 0.3s ease-in-out"
  }

const containerStyle = {
  maxWidth: '700px',
  padding: '20px 20px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  fontFamily: 'Arial, sans-serif',
  lineHeight: '1.6',
  color:"white"
};

const sectionTitleStyle = {
  fontSize: '24px',
  marginBottom: '10px',
  paddingBottom: '5px',
};

const socialLinksStyle = {
  listStyle: 'none',
  padding: '0',
};



export default About;
