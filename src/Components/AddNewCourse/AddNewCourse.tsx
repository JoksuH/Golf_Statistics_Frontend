import React from 'react'
import HolesForm from './HolesForm'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import Divider from '@material-ui/core/Divider'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        width: '60vw',
        margin: 'auto'
    },
    divider: {
       marginTop: '15px'
    },
    
}))


const AddNewCourse = () => {

    const styling = useStyles()

    return (
        <Box className={styling.root}>
            <TextField label='Course Name' />
            <HolesForm />
            <Divider className={styling.divider}/>
        </Box>
    )
}

export default AddNewCourse
