import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { ChakraProvider } from '@chakra-ui/react'
import { ChatProvider } from '../Context/ChatProvider'

createRoot(document.getElementById('root')).render(
  <ChatProvider>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </ChatProvider>,
)
