// pages/_app.js
"use client"
import { ChakraProvider } from '@chakra-ui/react'
import theme from '../../theme' 

function MyApp({ children }) {
  return (
    <ChakraProvider theme={theme}>
      {children}
    </ChakraProvider>
  )
}

export default MyApp