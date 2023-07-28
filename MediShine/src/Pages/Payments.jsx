import './Payments.css'
import {  useNavigate } from "react-router-dom";
import { useToast, Heading } from '@chakra-ui/react';
import { useState,useContext } from "react";
import { baseUrl } from "../api";
import { AuthContext } from '../AuthContext/AuthContextProvider';


function Payments() { 

  const toast = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  const { appointment, setAppointment } = useContext(AuthContext);
  console.log(appointment)

  const handleFinalSubmit = async () => { 
    setLoading(true);
    try {
      let res = await fetch(baseUrl + "/appointments", {
        method: "POST",
        body: JSON.stringify(appointment),
        headers: {
          "Content-Type": "application/json",
        }
      })
      let data = await res.json();
      setAppointment({
        "patientid": null,
        "doctorid": null,
        "service": {
            "id": null,
            "title": "",
            "description": ""
        },
        "appointmentDateTime": "",
        "doctor": {
            "doctorid": null,
            "name": "",
            "email": "",
            "phone": "",
            "fees": null
        },
        "patient": {
            "patientid": null,
            "name": "",
            "email": ""
        }
    });
    } catch (error) {
        console.log(error);
    }
  }

    return (   
<main id="main">
    <Heading pl="5">Please Enter </Heading><Heading pl="5">Your Details</Heading>
  <section id="right">
                <form  onSubmit={(e) => {
            e.preventDefault();
            handleFinalSubmit();
                    toast({
                        title: "Payment Successful",
                        description: "Have a nice day!",
                        status: 'success',
                        duration: 9000,
                        isClosable: true,
                    });
                    setTimeout(() => {
                        toast.closeAll();
                        navigate("/")
                    }, 2000);
                }}>
                
      <div id="form-card" className="form-field">
        <label htmlFor="cc-number">Card number:</label>
        <input
          id="cc-number"
          type="text"
          maxLength={ 16}
          placeholder="1111 2222 3333 4444"
          required=""
        />
      </div>
      <div id="form-date" className="form-field">
        <label htmlFor="expiry-month">Expiry date:</label>
        <div id="date-val">
          <select id="expiry-month" required="">
            <option
              id="trans-label_month"
              value=""
              default="default"
              selected="selected"
            >
              Month
            </option>
            <option value={1}>01</option>
            <option value={2}>02</option>
            <option value={3}>03</option>
            <option value={4}>04</option>
            <option value={5}>05</option>
            <option value={6}>06</option>
            <option value={7}>07</option>
            <option value={8}>08</option>
            <option value={9}>09</option>
            <option value={10}>10</option>
            <option value={11}>11</option>
            <option value={12}>12</option>
          </select>
          <select id="expiry-year" required="">
            <option
              id="trans-label_year"
              value=""
              default=""
              selected="selected"
            >
              Year
            </option>
            <option value={2023}>23</option>
            <option value={2024}>24</option>
            <option value={2025}>25</option>
            <option value={2026}>26</option>
            <option value={2027}>27</option>
            <option value={2028}>28</option>
            <option value={2029}>29</option>
            <option value={2030}>30</option>
            <option value={2031}>31</option>
            <option value={2032}>32</option>
            <option value={2033}>33</option>
            <option value={2034}>34</option>
            <option value={2035}>35</option>
            <option value={2036}>36</option>
            <option value={2037}>37</option>
            <option value={2038}>38</option>
            <option value={2039}>39</option>
            <option value={2040}>40</option>
            <option value={2041}>41</option>
            <option value={2042}>42</option>
            <option value={2043}>43</option>
            <option value={2044}>44</option>
            <option value={2045}>45</option>
            <option value={2046}>46</option>
            <option value={2047}>47</option>
          </select>
        </div>
      </div>
      <div id="form-sec-code" className="form-field">
        <label htmlFor="sec-code">Security code:</label>
        <input type="password" maxLength={3} placeholder={123} required="" />
      </div>
            <button type="submit">Make Payment</button>
    </form>
  </section>
</main>
    );
}

export default Payments;
