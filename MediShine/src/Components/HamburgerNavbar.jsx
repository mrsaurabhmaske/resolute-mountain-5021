import { NavLink } from 'react-router-dom';
import { useContext,useRef,useState } from 'react';
import { AuthContext } from '../AuthContext/AuthContextProvider';
import {Heading,useDisclosure, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay } from '@chakra-ui/react';
import ContactUs from '../Pages/ContactUs';
import { HamburgerIcon,CloseIcon} from '@chakra-ui/icons';


function HamburgerNavbar() { 

    const { isAuth, isDoctor } = useContext(AuthContext);
    const [hamburger, setHamburger] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = useRef();

    const handleToggle = ()=>{
        setHamburger(false);
    }

    return (
    <div className='hamburger'>

            {hamburger
                ?
                <div>
                {isAuth.type === "doctor" ?
                    <Heading>Welcome, {isAuth.name}</Heading> :
                    <div className='navbar2'>
                        <NavLink to="/" className={({ isActive }) => (isActive ? 'activeLink' : 'inactiveLink')} onClick={handleToggle}>Home</NavLink>
                        <NavLink to="/about" className={({ isActive }) => (isActive ? 'activeLink' : 'inactiveLink')} onClick={handleToggle}>About Us</NavLink>
                        <NavLink to="/services" className={({ isActive }) => (isActive ? 'activeLink' : 'inactiveLink')} onClick={handleToggle}>Services</NavLink>
                {!isAuth.isLoggedIn && <NavLink to="/alldoctors" className={({ isActive }) => (isActive ? 'activeLink' : 'inactiveLink')} onClick={handleToggle}>Find a doctor</NavLink>}
                {isAuth?.type==="patient" && <NavLink to="/patientdashboard" className={({ isActive }) => (isActive ? 'activeLink' : 'inactiveLink')}>Dashboard</NavLink>}
                
                  <NavLink className='inactiveLink' onClick={() => { onOpen();handleToggle() } } ref={ btnRef}>Contact Us</NavLink>
                    <CloseIcon onClick={handleToggle}/>
                    </div>}
                </div>
                :
            <HamburgerIcon onClick={() => setHamburger(true)} w="20px" h="20px"/>
            }
                  <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Leave a message</DrawerHeader>
          <DrawerBody>
          <ContactUs/>                  
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>

    )
}

export default HamburgerNavbar;