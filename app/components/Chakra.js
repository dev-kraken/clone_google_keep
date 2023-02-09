// pages/_app.js
"use client"
import { ChakraProvider } from '@chakra-ui/react'
import theme from '../../theme' 
import "@fontsource/poppins/400.css"
function MyApp({ children }) {
  return (
    <ChakraProvider theme={theme}>
      {children}
    </ChakraProvider>
  )
}

export default MyApp