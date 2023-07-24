import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../AuthContext/AuthContextProvider';
import { Heading} from '@chakra-ui/react';


function Navbar() { 

    const {isAuth,isDoctor } = useContext(AuthContext);


    return (
        isAuth.type === "doctor" ?
        <Heading>Welcome, {isAuth.name}</Heading>:
        <div className='navbar'>
            <NavLink to="/" className={({ isActive }) => (isActive ? 'activeLink' : 'inactiveLink')}>Home</NavLink>
            <NavLink to="/about" className={({ isActive }) => (isActive ? 'activeLink' : 'inactiveLink')}>About Us</NavLink>
            <NavLink to="/services" className={({ isActive }) => (isActive ? 'activeLink' : 'inactiveLink')}>Services</NavLink>
                {!isDoctor ?<NavLink to="/alldoctors" className={({ isActive }) => (isActive ? 'activeLink' : 'inactiveLink')}>Find a doctor</NavLink>
                :<NavLink to={"/login"} className={({ isActive }) => (isActive ? 'activeLink' : 'inactiveLink')}>Login as Doctor</NavLink>}

        </div>

    )
}

export default Navbar;