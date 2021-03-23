import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/core/styles'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

const theme = createMuiTheme({
    typography: {
        fontFamily: ['"Montserrat"', 'Open Sans'].join(','),
    },
})

const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache(),
})

ReactDOM.render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <ThemeProvider theme={theme}>
                <App />
            </ThemeProvider>
        </ApolloProvider>
    </React.StrictMode>,
    document.getElementById('root')
)
