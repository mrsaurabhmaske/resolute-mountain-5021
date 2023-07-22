import Navbar from './Navbar'
import { Button,Drawer,  useDisclosure ,DrawerOverlay,DrawerBody,DrawerFooter,DrawerHeader,DrawerContent,DrawerCloseButton} from '@chakra-ui/react'
import Logo from "../Images/logox.png"
import React, { useRef } from 'react'
import ContactUs from '../Pages/ContactUs'


export default function Header() { 

    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef();
    return (
        <div className="mainHeader">
            <div className="logoSection">
                <img src={ Logo} alt="" />
            </div>
            <Navbar />
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
        </div>
    )
}