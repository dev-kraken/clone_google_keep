"use client";
import { extendTheme, ThemeConfig } from "@chakra-ui/react"
import "@fontsource/poppins"
// 2. Add your color mode config
const config : ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
}

// 3. extend the theme
const theme = extendTheme({ config,
  fonts: {
    heading: `'Open Sans', sans-serif`,
    body: `'Poppins', sans-serif`,
  }, })

export default theme