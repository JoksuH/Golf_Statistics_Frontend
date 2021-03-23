import React from 'react'
import {useState} from 'react'
import HolesForm from './HolesForm'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import { makeStyles } from '@material-ui/core/styles'
import { gql, useMutation } from '@apollo/client'

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
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
  
  const ADD_COURSE = gql`
 mutation courseCreateOnenew ($name: String!, $pars: [Float]!, $holedistances_white: [Float]!, $holedistances_yellow: [Float]!) {
    courseCreateOne(record: {name: $name, pars: $pars, holedistances_white: $holedistances_white, holedistances_yellow: $holedistances_yellow})
           {
             recordId
        }
    }
`;

     

const AddNewCourse: React.FC = () => {

    const [CourseName, SetCourseName] = useState<string>('')
    const [HolePars, SetHolePars] = useState<holePars>({'1': 0, '2': 0,'3': 0, '4': 0, '5': 0,'6': 0, '7': 0, '8': 0,'9': 0, '10': 0, '11': 0,'12': 0, '13': 0, '14': 0,'15': 0, '16': 0, '17': 0,'18': 0})
    const [HoleDistancesWhite, SetHoleDistancesWhite] = useState<holePars>({'1': 0, '2': 0,'3': 0, '4': 0, '5': 0,'6': 0, '7': 0, '8': 0,'9': 0, '10': 0, '11': 0,'12': 0, '13': 0, '14': 0,'15': 0, '16': 0, '17': 0,'18': 0})
    const [HoleDistancesYellow, SetHoleDistancesYellow] = useState<holePars>({'1': 0, '2': 0,'3': 0, '4': 0, '5': 0,'6': 0, '7': 0, '8': 0,'9': 0, '10': 0, '11': 0,'12': 0, '13': 0, '14': 0,'15': 0, '16': 0, '17': 0,'18': 0})


    const [addTodo, { data }] = useMutation(ADD_COURSE);


    const handleParChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const par: number = parseInt(event.target.value)

        SetHolePars({...HolePars, [event.target.id]: par})
    }

    const handleDistanceChangeWhite = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const distance: number = parseInt(event.target.value)

        SetHoleDistancesWhite({...HoleDistancesWhite, [event.target.id]: distance})
    }

    const handleDistanceChangeYellow = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const distance: number = parseInt(event.target.value)

        SetHoleDistancesYellow({...HoleDistancesYellow, [event.target.id]: distance})
    }



    const handleCourseNameChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        SetCourseName(event.target.value)
    }

    const handleCourseSave = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {

        const parArr = Object.keys(HolePars).map(hole => HolePars[hole])
        const distanceArrWhite = Object.keys(HolePars).map(hole => HoleDistancesWhite[hole])
        const distanceArrYellow = Object.keys(HolePars).map(hole => HoleDistancesYellow[hole])


        console.log(addTodo({variables: { name: CourseName, pars:parArr, holedistances_white: distanceArrWhite, holedistances_yellow: distanceArrYellow} }))
    }

    const styling = useStyles()

    return (
        <Box className={styling.root}>
            <TextField label='Course Name' autoFocus onChange={handleCourseNameChange}/>
            <HolesForm onParChanged={handleParChange} onDistanceChangedWhite={handleDistanceChangeWhite} onDistanceChangedYellow={handleDistanceChangeYellow}/>
            <Divider className={styling.divider}/>
            <Button color="primary" variant="contained" className='savebutton' onClick={event => handleCourseSave(event)}>Save Course</Button>
        </Box>
    )
}

export default AddNewCourse
