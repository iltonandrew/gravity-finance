import { createBreakpoints } from '@chakra-ui/theme-tools'
import { extendTheme } from '@chakra-ui/react'


const breakpoints = createBreakpoints({
    sm: '45em',
    md: '65em'
})

const theme = extendTheme({
    colors: {
        primary: {
            main: '#d5a741',
            light: '#FFFFFF'
        },
        secondary: {
            main: '#222f46',
            contrastText: '#000004',
        },
        error: {
            main: '#cc6363'
        },
        warning: {
            main: '#f9f224'
        },
        success: {
            main: '#60ff8a'
        },
        white: {
            main: '#ffffff'
        },
    },
    breakpoints
})

export default theme