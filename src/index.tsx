import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/core/styles'

const theme = createMuiTheme({
    typography: {
        fontFamily: ['"Montserrat"', 'Open Sans'].join(','),
    },
})

ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <App />
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById('root')
)
