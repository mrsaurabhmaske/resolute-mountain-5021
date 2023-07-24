import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { AuthContext } from '../AuthContext/AuthContextProvider'; 
import { useContext } from 'react';
import Loader from '../Components/Loader';

const ServicesAsPerId = {
  "1": "General Health Checkup",
  "2": "Allergy Management",
  "3": "Diabetes Management",
  "4": "Cardiology",
  "5": "Pediatrics",
  "6": "Gynecology",
  "7": "Orthopedics",
  "8": "Dermatology",
  "9": "Mental Health Counseling",
  "10": "Hypertension Management",
  "11": "Obesity Counseling",
  "12": "Acne Treatment",
  "13": "Sports Medicine",
  "14": "Asthma Management",
  "15": "Gastroenterology",
  "16": "High Cholesterol Management",
  "17": "Insomnia Treatment",
  "18": "Anemia Management",
  "19": "PCOS Management",
  "20": "Food Poisoning Treatment"
}

const DashboardContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 50px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-family: Arial, sans-serif;
  line-height: 1.6;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
  background-color: #edf3ff;
`;

const DashboardTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
  border-bottom: 1px solid #ccc;
  padding-bottom: 5px;
  text-align:center;
  font-size:30px;
  font-weight: bold;
`;

const AppointmentsTitle = styled.h3`
  font-size: 20px;
  margin-bottom: 10px;
  background-color:#fff5f5;
  padding:10px;
  border-radius:10px
`;

const AppointmentsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
  background-color:#d4ddfa
`;

const TableHeader = styled.th`
  background-color: #0e3182;
  font-weight: bold;
  padding: 10px;
  text-align: left;
  color:white;
  border:1px solid white
`;

const TableData = styled.td`
  border: 1px solid #ccc;
  padding: 10px;
  text-align: left;
`;

const SpecialtyTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
  background-color#ffdbdb;
`;

const SpecialtyHeader = styled.th`
  background-color: #870909;
  color:white;
  font-weight: bold;
  padding: 10px;
  text-align: left;
  border:1px solid white
`;

const SpecialtyData = styled.td`
  border: 1px solid #ccc;
  padding: 10px;
  text-align: left;
`;

const DoctorDashboard = () => {
    const [doctor, setDoctor] = useState({});
    const [loading, setLoading] = useState(false);

    
    const { isAuth} =   useContext(AuthContext);
    console.log(doctor,isAuth);
    
  const [appointments, setAppointments] = useState([
    { id: 1, patientName: 'Preeti Sharma', date: '2023-08-01', time: '10:00 AM',service:"General Health Checkup" },
    { id: 2, patientName: 'Alok Vats', date: '2023-07-29', time: '2:30 PM',service:"Diabetes Management" },
    { id: 3, patientName: 'Kimaya Arora', date: '2023-07-30', time: '11:45 AM',service:"Pediatrics" },
  ]);
    
    const getDoctorDetails = async () => {
        setLoading(true);
        try {
            let res = await fetch("https://medshine-data.onrender.com/doctors?doctorId="+isAuth.id);
            let data = await res.json();
            setDoctor(data[0]);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            alert("Something went wrong while fetching doctors data");
        }
    }

    useEffect(() => { getDoctorDetails()},[])

    return (
      loading?<Loader/>:
    <DashboardContainer>
      <DashboardTitle>Dashboard</DashboardTitle>
      <AppointmentsTitle>Upcoming Appointments:</AppointmentsTitle>
      <AppointmentsTable>
        <thead>
          <tr>
            <TableHeader>ID</TableHeader>
            <TableHeader>Patient Name</TableHeader>
            <TableHeader>Date</TableHeader>
            <TableHeader>Time</TableHeader>
            <TableHeader>Service</TableHeader>
                
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.id}>
              <TableData>{appointment.id}</TableData>
              <TableData>{appointment.patientName}</TableData>
              <TableData>{appointment.date}</TableData>
              <TableData>{appointment.time}</TableData>
              <TableData>{ appointment.service}</TableData>
            </tr>
          ))}
        </tbody>
      </AppointmentsTable>

      <h3>Specialities</h3>
      <SpecialtyTable>
        <thead>
          <tr>
                      <SpecialtyHeader>Sr.No</SpecialtyHeader>
                      <SpecialtyHeader>Specialty</SpecialtyHeader>
          </tr>
        </thead>
        <tbody>
                        {doctor?.serviceIds?.map((sid) => {
                            return (<tr key={ sid}>
                                <SpecialtyData>{sid}</SpecialtyData>
                                <SpecialtyData>{ServicesAsPerId[sid]}</SpecialtyData>
                            </tr>)
                        })}
                    </tbody>
      </SpecialtyTable>
    </DashboardContainer>
  );
};

export default DoctorDashboard;
