import React from 'react';
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: theme.palette.success.light,
    },
    
}))
const NavBar = () => {

    const classes = useStyles()

  return (
    <Box className={classes.root}>
        <p>NavBar is here</p>
        <p>NavBar is here</p>
        <p>NavBar is here</p>
    </Box>
  );
}

export default NavBar;
