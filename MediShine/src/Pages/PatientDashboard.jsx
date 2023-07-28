import { useState, useEffect } from "react";
import "./PatientDashboard.css";
import { useContext } from "react";
import { AuthContext } from "../AuthContext/AuthContextProvider";
import { baseUrl } from "../api";
import { Button, Modal, ModalOverlay, useToast, ModalContent, ModalHeader, ModalBody, ModalCloseButton, ModalFooter, useDisclosure, Heading } from "@chakra-ui/react";
import Loader from "../Components/Loader";

const PatientDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);

    const { isAuth } = useContext(AuthContext);
    const { onOpen, isOpen, onClose } = useDisclosure();
    const toast = useToast();

  const getAppointments = async () => {
    setLoading(true);
    try {
      let res = await fetch(baseUrl + "/appointments?patientid=" + isAuth.id);
      let data = await res.json();
      console.log("Appointments", data);
      setLoading(false);
      setAppointments(data);
    } catch (error) {
      setLoading(false);
      alert("Something went wrong while fetching Appointments data");
    }
    };
    
    const handleDeleteAppointment = async (id) => { 
    setLoading(true);
    try {
      let res = await fetch(baseUrl + "/appointments/" + id, {
        method: "DELETE",
      });
      let data = await res.json();

      setLoading(false);
        getAppointments();
    } catch (error) {
      setLoading(false);
      alert("Something went wrong while deleting appointment");
    }
    };

  // Simulating fetching appointments from the backend
  useEffect(() => {
    getAppointments();
  }, []);

    return (
        <>{loading ? <Loader /> :
            <div className="patient-dashboard-container">
                <h2>Welcome to your Dashboard, <span>{isAuth.name}</span></h2>
                <h3>Your Appointments</h3>
                <div className="appointments-list">
                    {appointments.length === 0 ? (
                        <p>No appointments scheduled yet.</p>
                    ) : (
                        <ul>
                            {appointments?.map((appointment) => (
                                <li key={appointment.id} className="appointment-card">
                                    <div className="appointment-info">
                                        <strong>Doctor: <span className="span1">{appointment?.doctor?.name}</span></strong><br />
                                        <strong>Date: <span className="span2">{appointment?.appointmentDateTime}</span></strong><br />
                                        <strong>Category: <span className="span3">{appointment?.service?.title}</span></strong>
                                        {/* Add more appointment details as needed */}
                                    </div>
                                    <Button colorScheme="red" onClick={onOpen} >Cancel Appointment</Button>

                                    <Modal isOpen={isOpen} onClose={onClose}>
                                        <ModalOverlay />
                                        <ModalContent>
                                            <ModalHeader>Modal Title</ModalHeader>
                                            <ModalCloseButton />
                                            <ModalBody>
                                                <Heading size="ls">Are you sure you want to cancel the appointment?</Heading>
                                            </ModalBody>
                                            <ModalFooter>
                                                <Button colorScheme="blue" m={5} onClick={onClose}>No</Button>
                                                <Button colorScheme="red" onClick={() => {
                                                    onClose();
                                                    handleDeleteAppointment(appointment.id);
                                                    toast({
                                                        title: `Appointment with ${appointment?.doctor?.name} has been Cancelled!`,
                                                        status: "success",
                                                        duration: 2000,
                                                        isClosable: true
                                                    });
                                                }
                                                }>YES!</Button>
                                            </ModalFooter>
                                        </ModalContent>
                                    </Modal>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>} 
            </>
  );
};

export default PatientDashboard;
