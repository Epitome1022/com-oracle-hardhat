import { extendTheme, type ThemeConfig, type Colors } from '@chakra-ui/react'

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

const colors: Colors = {
  commune: {
    100: '#000000'
  }
}

// 3. extend the theme
const theme = extendTheme({ config, colors })

export default theme