import React from 'react'
import {useState} from 'react'
import HolesForm from './HolesForm'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        width: '60vw',
        margin: 'auto',
        backgroundColor: theme.palette.success.light
    },
    divider: {
       marginTop: '15px'
    },
    savebutton: {
        marginTop: '55px'
     },
    
}))

interface holePars {
    [hole: string]: number
  }
  

const AddNewCourse: React.FC = () => {

    const [CourseName, SetCourseName] = useState<string>('')
    const [HolePars, SetHolePars] = useState<holePars>({'1': 0, '2': 0,'3': 0, '4': 0, '5': 0,'6': 0, '7': 0, '8': 0,'9': 0, '10': 0, '11': 0,'12': 0, '13': 0, '14': 0,'15': 0, '16': 0, '17': 0,'18': 0})

    const handleParChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const par: number = parseInt(event.target.value)

        SetHolePars({...HolePars, [event.target.id]: par})
    }

    const handleCourseNameChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        SetCourseName(event.target.value)
    }

    const handleCourseSave = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {

        console.log(event)

    }

    const styling = useStyles()

    return (
        <Box className={styling.root}>
            <TextField label='Course Name' autoFocus onChange={handleCourseNameChange}/>
            <HolesForm onChanged={handleParChange}/>
            <Divider className={styling.divider}/>
            <Button color="primary" variant="contained" className='savebutton' onClick={event => handleCourseSave(event)}>Save Course</Button>
        </Box>
    )
}

export default AddNewCourse
