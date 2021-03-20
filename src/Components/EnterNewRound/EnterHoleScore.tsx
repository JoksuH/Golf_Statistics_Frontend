import React from 'react'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormLabel from '@material-ui/core/FormLabel'
import Button from '@material-ui/core/Button'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'

interface props {
    onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '60vw',
        margin: 'auto',
        height: '100%',
        backgroundColor: theme.palette.success.light,
        borderRadius: '7px',

    },
    coursename: {
        fontSize: '22px',
    },
    radios: {
        marginTop: '3vh',
        marginBottom: '2vw',
        fontSize: '25px'
    },
    row: {
        marginTop: theme.spacing(4),
        display: 'flex',
        flexDirection: 'row',
        width: '40vw',
        justifyContent: 'space-between',
        margin: 'auto',
    },
}))

const CourseBox: React.FC<props> = ({ onClick }) => {
    const styling = useStyles()

    return (
        <Box className={styling.root}>
            <Typography style={{marginBottom: '3vh', fontSize: '25px'}}>Hole 1 - Par 4</Typography>
                <TextField
                    size="small"
                    variant="standard"
                    label="Score"
                    inputProps={{
                        maxLength: 1,
                        pattern: '[0-7]',
                        style: {
                            textAlign: 'center',
                            fontSize: '22px',
                            width: '55px',
                        },
                    }}
                />
                <TextField
                    size="small"
                    variant="standard"
                    label="Putts"
                    inputProps={{
                        maxLength: 1,
                        pattern: '[0-7]',
                        style: {
                            textAlign: 'center',
                            fontSize: '22px',
                            width: '55px',
                        },
                    }}
                />
                      <FormLabel component="legend" className={styling.radios}>FIR</FormLabel>
                <RadioGroup aria-label="Fairway hit" name="fir" row>
                    <FormControlLabel
                        value="left"
                        control={<Radio />}
                        label="Miss left"
                        labelPlacement="top"
                    />
                    <FormControlLabel
                        value="hit"
                        control={<Radio />}
                        label="Hit"
                        labelPlacement="top"
                    />
                    <FormControlLabel
                        value="right"
                        control={<Radio />}
                        label="Miss right"
                        labelPlacement="top"
                    />
                </RadioGroup >
                <FormLabel component="legend" className={styling.radios}>GIR</FormLabel>
                <RadioGroup aria-label="green in regulation" name="gir" row>
                <FormControlLabel
                        value="left"
                        control={<Radio />}
                        label="Miss left"
                        labelPlacement="top"
                    />
                    <FormControlLabel
                        value="hit"
                        control={<Radio />}
                        label="Hit"
                        labelPlacement="top"
                    />
                    <FormControlLabel
                        value="right"
                        control={<Radio />}
                        label="Miss right"
                        labelPlacement="top"
                    />
                    <FormControlLabel
                        value="short"
                        control={<Radio />}
                        label="Miss short"
                        labelPlacement="top"
                    />
                    <FormControlLabel
                        value="long"
                        control={<Radio />}
                        label="Miss long"
                        labelPlacement="top"
                    />
                </RadioGroup>
                <Box className={styling.row}>
                <TextField
                    size="small"
                    variant="standard"
                    value={0}
                    helperText="Penalties / OB"
                    inputProps={{
                        maxLength: 1,
                        pattern: '[0-7]',
                        style: {
                            textAlign: 'center',
                            fontSize: '22px',
                            width: '10vw',
                        },
                    }}
                    InputLabelProps={{ shrink: true }} 
                />
                <TextField
                    size="small"
                    variant="standard"
                    value={0}
                    helperText="Fairway Bunker Shots!"
                    inputProps={{
                        maxLength: 1,
                        pattern: '[0-7]',
                        style: {
                            textAlign: 'center',
                            fontSize: '22px',
                            width: '10vw',
                        },
                    }}
                    InputLabelProps={{ shrink: true }} 
                />
                <TextField
                    size="small"
                    variant="standard"
                    value={0}
                    helperText="Greenside Bunker Shots"
                    inputProps={{
                        maxLength: 1,
                        pattern: '[0-7]',
                        style: {
                            textAlign: 'center',
                            fontSize: '22px',
                            width: '10vw',
                        },
                    }}
                    InputLabelProps={{ shrink: true }} 
                />
                </Box>
                <Box className={styling.row}>
                <Button variant="contained" color="secondary">Previous Hole</Button>
                <Button variant="contained" color="secondary">Next Hole</Button>
                </Box>

        </Box>
    )
}

export default CourseBox

/*
- score
- putts
- fir   => checkbox or miss where? left right
- gir	=> checkbox or miss where? long short, left right
- sand shots => number (can be empty to mean 0)
- 1st putt distance on gir  => ask this if gir checked
- Ob / penalties
*/
