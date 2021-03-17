import React from 'react'
import Login from './Components/LoginPage/Login'
import NavBar from './Components/NavBar/NavBar'
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles'


const App = () => {
    return (
        <div>
            <NavBar />
            <Login />
        </div>
    )
}

export default App
