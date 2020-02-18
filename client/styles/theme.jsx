import { amber, pink, red, green, blue } from '@material-ui/core/colors'
import { createMuiTheme } from '@material-ui/core/styles'

// It doesnt say you have to use createMuiTheme in the docs,
// but we couldnt get MUI+Theme to work without it - TM
export default createMuiTheme({
    palette: {
        primary: { main: blue[500] },
        secondary: { main: pink[500] },
        common: {
            gray: { main: '#383838', light: '#7F7F7F' },
            dark: { main: 'black' }
        },
        info: {
            main: blue[500]
        },
        warning: {
            main: amber[700]
        },
        error: {
            main: red[600]
        },
        success: {
            main: green[600]
        }
    }
})
