import React from 'react'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%',
    margin: 'auto',
  },
  holenumbers: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  holenumbercontainer: {
    border: '1px solid black',
    padding: '5px 15px 5px 15px',
    textAlign: 'center',
  },
  holepaircontainer: {
    padding: '5px 15px 5px 15px',
  },
  holetext: {
    paddingLeft: '10px',
    margin: 'auto',
    fontSize: '22px',
  },
  holepartext: {
    paddingLeft: '5px',
    paddingTop: '25px',
  },

  textfield: {
    marginTop: '25px',
    fontSize: '22px',
    textAlign: 'center',
  },
  enterpar: {
    fontSize: '22px',
    textAlign: 'center',
    textDecoration: 'italics',
  },
  input: {
    '&:invalid': {
      border: 'red solid 2px',
    },
  },
}))

interface sentProps {
  onParChanged: (event: React.ChangeEvent<HTMLInputElement>) => void
  onDistanceChangedWhite: (event: React.ChangeEvent<HTMLInputElement>) => void
  onDistanceChangedYellow: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const HolesForm: React.FC<sentProps> = ({ onParChanged, onDistanceChangedWhite, onDistanceChangedYellow }) => {
  const styling = useStyles()

  let holenumbers: string[] = []

  for (let i: number = 1; i < 19; i++) holenumbers.push(i.toString())

  return (
    <Box className={styling.root}>
      <Typography variant="h4" className={styling.enterpar}>
        Please enter the par and distance of each hole
      </Typography>
      <Box className={styling.holenumbers}>
        <Box className={styling.holepaircontainer}>
          <Typography variant="h6" className={styling.holetext}>
            Hole
          </Typography>
          <Box className={styling.textfield}>
            <Typography variant="h6">Par</Typography>
          </Box>
          <Box className={styling.textfield}>
            <Typography variant="h6">Distance White</Typography>
          </Box>
          <Box className={styling.textfield}>
            <Typography variant="h6">Distance Yellow</Typography>
          </Box>
        </Box>
        {holenumbers.map((number) => {
          return (
            <Box className={styling.holepaircontainer} key={number}>
              <Box className={styling.holenumbercontainer}>
                <Typography variant="h6">{number}</Typography>
              </Box>
              <Box className={styling.textfield}>
                <TextField size="small" id={number} variant="outlined" inputProps={{ maxLength: 1, pattern: '[0-7]', style: { textAlign: 'center', fontSize: '22px' } }} onChange={onParChanged} />
              </Box>
              <Box className={styling.textfield}>
                <TextField size="small" id={number} variant="outlined" inputProps={{ maxLength: 3, pattern: '[0-9]', style: { textAlign: 'center', fontSize: '22px' } }} onChange={onDistanceChangedWhite} />
              </Box>
              <Box className={styling.textfield}>
                <TextField size="small" id={number} variant="outlined" inputProps={{ maxLength: 3, pattern: '[0-9]', style: { textAlign: 'center', fontSize: '22px' } }} onChange={onDistanceChangedYellow} />
              </Box>
            </Box>
          )
        })}
      </Box>
    </Box>
  )
}

export default HolesForm
