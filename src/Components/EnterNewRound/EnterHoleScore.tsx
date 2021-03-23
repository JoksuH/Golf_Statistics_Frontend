import React, {useEffect, useState} from 'react'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormLabel from '@material-ui/core/FormLabel'
import FormGroup from '@material-ui/core/FormGroup'
import Button from '@material-ui/core/Button'
import Radio from '@material-ui/core/Radio'
import Checkbox from '@material-ui/core/Checkbox'
import RadioGroup from '@material-ui/core/RadioGroup'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'

interface props {
    HoleNumber: number
    Par: number
    onSave: (data: string[]) => void
    onClickPrev: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

interface GIRObject {
    [key:string]: boolean
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
        marginBottom: theme.spacing(4),
        display: 'flex',
        flexDirection: 'row',
        width: '40vw',
        justifyContent: 'space-between',
        margin: 'auto',
    },
}))

const EnterHoleScore: React.FC<props> = ({HoleNumber, Par, onSave, onClickPrev}) => {
    const styling = useStyles()

    const [Score, SetScore] = useState<string>("")
    const [Putts, SetPutts] = useState<string>("")
    const [FIR, SetFIR] = useState<string>("")
    const [GIR, SetGIR] = useState<{[key:string]: boolean}>({hit: false, left: false, right:false, long: false, short:false})
    const [Penalties, SetPenalties] = useState<string>("0")
    const [FairwayBunkers, SetFairwayBunkers] = useState<string>("0")
    const [GreenBunkers, SetGreenBunkers] = useState<string>("0")

    useEffect(() => {
        SetScore("")
        SetPutts("")
        SetFIR("")
        SetGIR({hit: false, left: false, right:false, long: false, short:false})
        SetPenalties("0")
        SetFairwayBunkers("0")
        SetGreenBunkers("0")
      
    },[HoleNumber])

    const handleScoreEnter = (event: React.ChangeEvent<HTMLInputElement>): void => {
        SetScore(event.target.value)

    }

    const handlePuttsEnter = (event: React.ChangeEvent<HTMLInputElement>): void => {
        SetPutts(event.target.value)
    }

    const handleFIRSelection = (event: React.ChangeEvent<HTMLInputElement>, value: string): void=> {
        SetFIR(event.target.value)

    }

    const handleGIRSelection = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean): void => {

        let objectcopy = {...GIR}
        objectcopy[event.target.name] = checked
        SetGIR(objectcopy)

    }

    const handleFairwayBunkersEnter = (event: React.ChangeEvent<HTMLInputElement>): void => {
        SetFairwayBunkers(event.target.value)

    }

    const handleGreenBunkersEnter = (event: React.ChangeEvent<HTMLInputElement>): void => {
        SetGreenBunkers(event.target.value)
    }

    const handlePenaltiesEnter = (event: React.ChangeEvent<HTMLInputElement>): void => {
        SetPenalties(event.target.value)

    }

    
    const handleNextHoleClicked = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {

        let letDataArray: string[] = []
        letDataArray.push(Score)
        letDataArray.push(Putts)
        letDataArray.push(FIR)
        letDataArray.push(getGIRstring(GIR))
      

        letDataArray.push(Penalties)
        letDataArray.push(FairwayBunkers)
        letDataArray.push(GreenBunkers)

        onSave(letDataArray)
    }

    const getGIRstring = (data: GIRObject): string => {

        if (data['hit'] = true)
            return 'hit'

        let stringGirValues = ""

         Object.keys(data).forEach(key => {
            if (data[key] === true) stringGirValues += key + " "
        })

        return (stringGirValues)

    }

    return (
        <Box className={styling.root}>
            <Typography style={{marginBottom: '2vh', fontSize: '25px'}}>Hole {HoleNumber} - Par {Par}</Typography>
                <TextField
                    size="small"
                    variant="standard"
                    label="Score"
                    value={Score}
                    onChange={handleScoreEnter}
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
                    value={Putts}
                    onChange={handlePuttsEnter}
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
                {Par !== 3 &&
                <>
                      <FormLabel component="legend" className={styling.radios}>FIR</FormLabel>
                <RadioGroup aria-label="Fairway hit" name="fir" row onChange={handleFIRSelection} value={FIR}>
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
                </>
                }
                <FormLabel component="legend" className={styling.radios}>GIR</FormLabel>
                <FormGroup aria-label="green in regulation" row> 
                <FormControlLabel
                        value="hit"
                        control={<Checkbox onChange={handleGIRSelection} name="hit" checked={GIR['hit']} disabled={Object.keys(GIR).some(value => (GIR[value] === true) &&  (GIR['hit'] === false) )}/>}
                        label="Hit"
                        labelPlacement="top"
                />
                <FormControlLabel
                        value="left"
                        control={<Checkbox onChange={handleGIRSelection} name="left" checked={GIR['left']} disabled={GIR['hit'] || GIR['right']}/>}
                        label="Miss left"
                        labelPlacement="top"
                    />
                   
                    <FormControlLabel
                        value="right"
                        control={<Checkbox onChange={handleGIRSelection} name="right" checked={GIR['right']} disabled={GIR['hit'] || GIR['left']} />}
                        label="Miss right"
                        labelPlacement="top"
                    />
                    <FormControlLabel
                        value="short"
                        control={<Checkbox onChange={handleGIRSelection} name="short" checked={GIR['short']} disabled={GIR['hit'] || GIR['long']}/>}
                        label="Miss short"
                        labelPlacement="top"
                    />
                    <FormControlLabel
                        value="long"
                        control={<Checkbox onChange={handleGIRSelection} name="long" checked={GIR['long']} disabled={GIR['hit'] || GIR['short'] }/>}
                        label="Miss long"
                        labelPlacement="top"
                    />
                </FormGroup>
                <Box className={styling.row}>
                <TextField
                    size="small"
                    variant="standard"
                    value={Penalties}
                    onChange={handlePenaltiesEnter}
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
                    value={FairwayBunkers}
                    helperText="Fairway Bunker Shots"
                    onChange={handleFairwayBunkersEnter}
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
                    value={GreenBunkers}
                    helperText="Greenside Bunker Shots"
                    onChange={handleGreenBunkersEnter}
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
                <Button variant="contained" color="secondary" onClick={onClickPrev}>Previous Hole</Button>
                <Button variant="contained" color="secondary" onClick={handleNextHoleClicked}>Next Hole</Button>
                </Box>

        </Box>
    )
}

export default EnterHoleScore

/*
- score
- putts
- fir   => checkbox or miss where? left right
- gir	=> checkbox or miss where? long short, left right
- sand shots => number (can be empty to mean 0)
- 1st putt distance on gir  => ask this if gir checked
- Ob / penalties
*/