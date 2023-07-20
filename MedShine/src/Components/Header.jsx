import Navbar from './Navbar'
import { Button } from '@chakra-ui/react'
import Logo from "../Images/logo.png"

export default function Header() { 
    return (
        <div className="mainHeader">
            <div className="logoSection">
                <img src={ Logo} alt="" />
            </div>
            <Navbar />
            <div className='contactSection'>
                <Button colorScheme='blue'>Contact Us</Button>
            </div>
        </div>
    )
}