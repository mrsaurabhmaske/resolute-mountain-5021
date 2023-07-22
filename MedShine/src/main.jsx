import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import AuthContextProvider from './AuthContext/AuthContextProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <ChakraProvider>
            <AuthContextProvider>
                <App />
            </AuthContextProvider>
        </ChakraProvider>
    </BrowserRouter>
        )
