import { useEffect, useState } from 'react';
import { AuthContext } from '../AuthContext/AuthContextProvider';
import { useContext } from 'react';
import Loader from '../Components/Loader';
import { baseUrl } from '../api';
import './Dashboard.css';
import { Heading,Button,useToast} from '@chakra-ui/react';


const DoctorDashboard = () => {

  const { isAuth, allAppointments, setAllAppointments, patients, setPatients } = useContext(AuthContext);
  const toast = useToast();

  const [loading, setLoading] = useState(false);
  const [section, setSection] = useState("appointments");
  const [currentDoctor,setCurrentDoctor] = useState({});

  //Local state for relevant patients on the dashboard

  const [apvalues, setApvalues] = useState([]);

  // State for the currently selected patient and appointment
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  // Function to handle patient selection
  const handlePatientSelect = (patientId) => {
    const selectedPatient = patients.find((patient) => patient.id === patientId);
    setSelectedPatient(selectedPatient);
    setSelectedAppointment(null);
  };

  // Function to handle appointment selecti on
  const handleAppointmentSelect = (appointmentId) => {
    const selectedAppointment = allAppointments.find(
      (appointment) => appointment.id === appointmentId
    );
    setSelectedAppointment(selectedAppointment);
    setSelectedPatient(patients.find((patient) => patient.id === selectedAppointment.patientid));
  };

    const getPatients = async () => {
    setLoading(true);
    try {
      let res = await fetch(baseUrl + "/patients");
      let data = await res.json();
      console.log("Patients", data);
        setLoading(false);
        setPatients(data);
    } catch (error) {
        setLoading(false);
        alert("Something went wrong while fetching doctors data");
    }
  }

    const getAppointments = async () => {
    setLoading(true);
    try {
        let res = await fetch(baseUrl+"/appointments?doctorid="+isAuth.id);
      let data = await res.json();
      let values = data.map((app) => {
        return app.doctorid == isAuth.id ? app.patientid : false;
      });
      setApvalues(values);
      console.log("Appointments", data);
        setLoading(false);
        setAllAppointments(data);
    } catch (error) {
        setLoading(false);
        alert("Something went wrong while fetching Appointments data");
    }
  }

  const getCurrentDoctor = async () => {
    setLoading(true);
    try {
      let res = await fetch(baseUrl+"/doctors/"+isAuth.id);
      let data = await res.json();
      console.log("Current Doctor", data);
        setLoading(false);
        setCurrentDoctor(data);
    } catch (error) {
        setLoading(false);
        alert("Something went wrong while fetching Current Doctor data");
    }
  }

  const handleChange = (e) => {
    if (e.target.name == "city" || e.target.name == "state" || e.target.name == "country") {
      setCurrentDoctor(prev => ({ ...prev, address: { ...prev.address, [e.target.name]: e.target.value } }));
    }
    else {
      setCurrentDoctor(prev => { console.log(e.target); return { ...prev, [e.target.name]: e.target.value }});
    }
  }

  const updateDoctorData = async (e) => { 
    e.preventDefault();
    console.log(currentDoctor);
    try {
      let res = await fetch(baseUrl+"/doctors/"+isAuth.id, {
        method: "PATCH",
        body: JSON.stringify(currentDoctor),
        headers: {
          "Content-Type": "application/json"
        }
      });
      console.log(res)

        toast({
          title: "Profile Details Updated Successfully!",
          description: "Have a nice day!",
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
         setTimeout(() => {
           toast.closeAll();
         }, 2000);

    } catch (error) {
      console.log(error);
    }

    
  }

  useEffect(() => {
    getPatients();
    getAppointments();
    getCurrentDoctor();
  },[])

  return (
    <div>
      {/* Button Container*/}
      <div className="ButtonsContainer">
        <Button colorScheme={ section=="appointments"?"red":"teal"}  onClick={() => setSection("appointments")}>Appointments</Button>
        <Button colorScheme={ section=="edit"?"red":"teal"} onClick={() => setSection("edit")}>Edit Details</Button>
        <Button colorScheme={ section=="profile"?"red":"teal"} onClick={()=>setSection("profile")}>Profile</Button>
      </div>
      { /*Patient and Appointments Data Display*/}
      { section=="appointments" && <div className="dashboard-container">
          <div className="patient-list">
            <Heading>Patients</Heading>
            <ul>
              {patients.map((patient) => {
                if (apvalues.includes(patient.id)) {
                  return <li key={patient.id} onClick={() => handlePatientSelect(patient.id)}>
                    {patient.name}
                  </li>
                }
              })}
            </ul>
          </div>

          <div className="appointments">
            <Heading>Appointments</Heading>
            <ul>
              {allAppointments.map((appointment) => {
                if (appointment.patientid == selectedPatient?.id) {
                  return <li key={appointment.id} onClick={() => handleAppointmentSelect(appointment.id)}>
                    {"Scheduled for "}<span style={{color:"blue",textDecoration:"underline"}}>{appointment.appointmentDateTime}</span>
                  </li>
                }
              })}
            </ul>
          </div>
          {selectedPatient && (
            <div className="patient-details">
              <Heading>Patient Details</Heading>
              <p>Name: {selectedPatient.name}</p>
              <p>Age: {selectedPatient.age}</p>
              <p>Gender: {selectedPatient.gender}</p>
              <h3>Medical History</h3>
              <ul style={{ paddingLeft: "50px" }}>
                {selectedPatient?.medicalHistory.map((item, ind) => {
                  return <li key={ind}>{item}</li>
                })}
              </ul>
              <p>Lab Results: Pending</p>
              <p>Diagnosis:</p>
              <ul style={{ paddingLeft: "50px" }}>
                {selectedPatient?.healthConditions.map((item, ind) => {
                  return <li key={ind}>{item}</li>
                })}
              </ul>
              <p>Contact:</p>
              <ol style={{ paddingLeft: "30px" }}>
                <li>Email: {selectedPatient.email}</li>
                <li>Mobile: {selectedPatient.phone}</li>
              </ol>
              <Button colorScheme='red' style={{ borderRadius: "20px", position: "absolute", bottom: "0" }} onClick={() => { setSelectedPatient(null); setSelectedAppointment(null) }}>X</Button>
            </div>
          )}
          {selectedAppointment && (
            <div className="appointment-details">
              <Heading>Appointment Details</Heading>
              <p>Date and Time: {selectedAppointment.appointmentDateTime}</p>
              <h3>Patient Information</h3>
              <p>Name: {selectedPatient?.name}</p>
              <p>Age: {selectedPatient?.age}</p>
              <p>Gender: {selectedPatient?.gender}</p>
              <p>Diagnosis:</p>
              <ul style={{ paddingLeft: "50px" }}>
                {selectedPatient?.healthConditions?.map((item, ind) => {
                  return <li key={ind}>{item}</li>
                })}
              </ul>
              <p>Lab Results: Pending</p>

              <Button colorScheme='red' style={{ borderRadius: "20px", position: "absolute", bottom: "0" }} onClick={() => { setSelectedAppointment(null) }}>X</Button>
            </div>
          )}
      </div>}
      { /*Section End*/}

      { /*Section Edit Doctor Profile*/}
      {section == "edit" && <div className='form-container'>
        <form onSubmit={updateDoctorData}>
          <Heading>Edit Your Profile</Heading>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name='name' value={currentDoctor.name} onChange={handleChange}/>

          <label htmlFor="email">Email:</label>
          <input type="text" id="email" name='email' value={currentDoctor.email} onChange={handleChange} />

          <label>Available Slots</label>
          <input type="datetime-local" name="date" id="date"  />

          <label htmlFor="phone">Mobile Number:</label>
          <input type="number" name="phone" id="phone" value={"874656568"} onChange={() => { console.log("phone number ")}}/>

          <label htmlFor="fees">Fees:</label>
          <input type="number" name="fees" id="fees" value={currentDoctor.fees} onChange={handleChange} />

          <label htmlFor="address">City:</label>
          <input type="text" name="city" id="city" value={currentDoctor.address.city} onChange={handleChange} />

          <label htmlFor="address">State:</label>
          <input type="text" name="state" id="state" value={currentDoctor.address.state}  onChange={handleChange} />

          <label htmlFor="address">Country:</label>
          <input type="text" name="country" id="country" value={currentDoctor.address.country} onChange={handleChange} />
          <br />

          <Button type="submit" colorScheme='green'>Submit</Button>

        </form>
      </div>}
      { /*Section End*/}

      { /*Section Profile*/}
      {section == "profile" &&     <div className='profile-container'>
        <Heading textAlign={"center"} color={"black"} >My Profile</Heading>
      <img style={{ width:"200px",height:"200px",margin:"10px auto",borderRadius:"50%",border:"4px solid white"}} src="https://img.freepik.com/free-vector/doctor-character-background_1270-84.jpg?w=826&t=st=1689966510~exp=1689967110~hmac=18cc30256d86cb625f8d575fd1e623c003df55c67abfbec1420537e345d098a4" alt="name" />
      <p>Name:    <span>{currentDoctor.name} </span></p>
      <p>Email:   <span>{currentDoctor.email}</span></p>
      <p>Phone:   <span>{currentDoctor.phone}</span></p>
      <p>Address: <span>{currentDoctor.address.city}, {currentDoctor.address.state}, {currentDoctor.address.country}</span></p>
      <p>Available Slots:</p>
      <ul>
        {currentDoctor.availableSlots.map((slot, index) => (
          <li key={index}>{slot}</li>
        ))}
      </ul>
      <p><strong>Fees:</strong> ${currentDoctor.fees}</p>
    </div>}

      </div>
  );
};

export default DoctorDashboard;

