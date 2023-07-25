import Navbar from './Navbar'
import { Button,Drawer,  useDisclosure ,DrawerOverlay,DrawerBody,DrawerHeader,DrawerContent,DrawerCloseButton} from '@chakra-ui/react'
import Logo from "../Images/logox.png"
import React, { useContext } from 'react'
import ContactUs from '../Pages/ContactUs'
import { AuthContext } from '../AuthContext/AuthContextProvider'
import { useNavigate } from 'react-router-dom'
import BubbleSwitch from './BubbleSwitch'


export default function Header() { 

  const navigate=useNavigate();

  const { isAuth,logout,setIsDoctor,isDoctor} = useContext(AuthContext);

    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef();
    return (
        <div className="mainHeader">
        <div className="logoSection" onClick={() => { navigate('/')}}>
                <img src={ Logo} alt="" />
            </div>
        <Navbar />
        {!isAuth.type && <div style={{display:"flex",alignItems:"center"}} className='doctorOrNot'>
        <label>{"I am a Doctor___"}  </label>
        <BubbleSwitch isDoctor={isDoctor} setIsDoctor={setIsDoctor}/>
        </div>}

        {isAuth.isLoggedIn ?
          <Button ref={btnRef} colorScheme='blue' className="contactUs" onClick={logout}>Log out</Button>
          :
        <div className='contactSection'>
                <Button  ref={btnRef} colorScheme='blue' onClick={onOpen} >Contact Us</Button>
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
          }
        </div>
    )
}