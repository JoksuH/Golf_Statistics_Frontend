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

theme.typography.h6 = {
  fontFamily: ['"Montserrat"', 'Open Sans'].join(','),
  fontWeight: 500,
  '@media (max-width:1100px)': {
    fontSize: '14px',
  },
}

const client = new ApolloClient({
  uri: 'https://golf-statistics-2021.herokuapp.com/api',
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
