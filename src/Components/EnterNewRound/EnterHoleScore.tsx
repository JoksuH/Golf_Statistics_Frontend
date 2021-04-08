import React, { useEffect, useRef, useState } from 'react'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormLabel from '@material-ui/core/FormLabel'
import FormGroup from '@material-ui/core/FormGroup'
import Button from '@material-ui/core/Button'
import Radio from '@material-ui/core/Radio'
import Checkbox from '@material-ui/core/Checkbox'
import Grid from '@material-ui/core/Grid'
import RadioGroup from '@material-ui/core/RadioGroup'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import InputAdornment from '@material-ui/core/InputAdornment'

interface props {
    HoleNumber: number
    Par: number
    onSave: (data: string[]) => void
    onClickPrev: (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => void
}

interface GIRObject {
    [key: string]: boolean
}

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        padding: '5vh 5vh 5vh 5vh',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '40vw',
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
        fontSize: '25px',
        alignSelf: 'center',
    },
    row: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        display: 'flex',
        flexDirection: 'row',
        width: '40vw',
        justifyContent: 'space-evenly'
    },
    column: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        display: 'flex',
        width: '40vw',
        flexDirection: 'column',
        justifyContent: 'center',

    },
}))

const EnterHoleScore: React.FC<props> = ({
    HoleNumber,
    Par,
    onSave,
    onClickPrev,
}) => {
    const styling = useStyles()

    const [Score, SetScore] = useState<string>('')
    const [Putts, SetPutts] = useState<string>('')
    const [FIR, SetFIR] = useState<string>('')
    const [GIR, SetGIR] = useState<{ [key: string]: boolean }>({
        hit: false,
        left: false,
        right: false,
        long: false,
        short: false,
        NONE: false,
    })
    const [ApproachDistance, SetApproachDistance] = useState<
        string | undefined
    >(undefined)
    const [Penalties, SetPenalties] = useState<string>('')
    const [FairwayBunkers, SetFairwayBunkers] = useState<string>('')
    const [GreenBunkers, SetGreenBunkers] = useState<string>('')

    useEffect(() => {
        SetScore('')
        SetPutts('')
        SetFIR('')
        SetGIR({
            hit: false,
            left: false,
            right: false,
            long: false,
            short: false,
            NONE: false,
        })
        SetApproachDistance('')
        SetPenalties('')
        SetFairwayBunkers('')
        SetGreenBunkers('')

        inputScore.current?.focus()

    }, [HoleNumber])

    const inputScore = useRef<HTMLDivElement | null>(null)
    const inputPutts = useRef<HTMLDivElement | null>(null)
    const inputHiddenFir = useRef<HTMLDivElement | null>(null)
    const inputHiddenGir = useRef<HTMLDivElement | null>(null)
    const inputApproachDistance = useRef<HTMLDivElement | null>(null)
    const inputPenalties = useRef<HTMLDivElement | null>(null)
    const inputfwBunkers = useRef<HTMLDivElement | null>(null)
    const inputgreenBunkers = useRef<HTMLInputElement | null>(null)
    const inputNextHoleButton = useRef<HTMLButtonElement | null>(null)


    const handleScoreEnter = (
        event: React.ChangeEvent<HTMLInputElement>
    ): void => {
        SetScore(event.target.value)
        inputPutts.current?.focus()
    }

    const handleFirEnter = (
        event: React.ChangeEvent<HTMLInputElement>
    ): void => {
        switch (event.target.value) {
            case '4':
                SetFIR('left')
                inputHiddenGir.current?.focus()
                break
            case '5':
                SetFIR('hit')
                inputHiddenGir.current?.focus()
                break
            case '6':
                SetFIR('right')
                inputHiddenGir.current?.focus()
                break
        }
        event.target.value = ""
    }
    const handleGirEnter = (
        event: React.ChangeEvent<HTMLInputElement>
    ): void => {
        console.log(event.target.value)
        switch (event.target.value) {
            case '1':
                SetGIR({ ...GIR, left: true, short: true })
                break
            case '2':
                SetGIR({ ...GIR, short: true })
                break
            case '3':
                SetGIR({ ...GIR, right: true, short: true })
                break
            case '4':
                SetGIR({ ...GIR, left: true })
                break
            case '5':
                SetGIR({ ...GIR, hit: true })
                break
            case '6':
                SetGIR({ ...GIR, right: true })
                break
            case '7':
                SetGIR({ ...GIR, left: true, long: true })
                break
            case '8':
                SetGIR({ ...GIR, long: true })
                break
            case '9':
                SetGIR({ ...GIR, right: true, long: true })
                break
            case '0':
                SetGIR({ ...GIR, NONE: true })
                break
        }
        event.target.value = ""
        inputApproachDistance.current?.focus()
    }

    const handlePuttsEnter = (
        event: React.ChangeEvent<HTMLInputElement>
    ): void => {
        SetPutts(event.target.value)
        // Move the focus directly to GIR if no FIR question present
        Par !== 3 ? inputHiddenFir.current?.focus() : inputHiddenGir.current?.focus()
        event.target.value = ""

    }

    const handleFIRSelection = (
        event: React.ChangeEvent<HTMLInputElement>
    ): void => {
        SetFIR(event.target.value)
    }

    const handleGIRSelection = (
        event: React.ChangeEvent<HTMLInputElement>,
        checked: boolean
    ): void => {
        let objectcopy = { ...GIR }
        objectcopy[event.target.name] = checked
        SetGIR(objectcopy)
    }

    const handleFairwayBunkersEnter = (
        event: React.ChangeEvent<HTMLInputElement>
    ): void => {
        SetFairwayBunkers(event.target.value)
        inputgreenBunkers.current?.focus()

    }

    const handleApproachDistanceEnter = (
        event: React.ChangeEvent<HTMLInputElement>
    ): void => {
        if (event.target.value[event.target.value.length-1] === undefined)
            inputPenalties.current?.focus()
        else
        SetApproachDistance(event.target.value)
    }

    const handleGreenBunkersEnter = (
        event: React.ChangeEvent<HTMLInputElement>
    ): void => {
        SetGreenBunkers(event.target.value)
        inputNextHoleButton.current?.click()
    }

    const handlePenaltiesEnter = (
        event: React.ChangeEvent<HTMLInputElement>
    ): void => {
        SetPenalties(event.target.value)
        inputfwBunkers.current?.focus()
    }

    const handleNextHoleClicked = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ): void => {
        //Collects data to single array to pass to parent component

        let letDataArray: string[] = []
        letDataArray.push(Score)
        letDataArray.push(Putts)
        // Push NONE to Fir value if par 3 to match array lengths later
        if (Par === 3) letDataArray.push('NONE')
        else letDataArray.push(FIR)
        letDataArray.push(getGIRstring(GIR))
        if (ApproachDistance && !GIR['NONE'])
            letDataArray.push(ApproachDistance)
        else letDataArray.push('NONE')
        letDataArray.push(Penalties)
        letDataArray.push(FairwayBunkers)
        console.log(GreenBunkers)
        if (inputgreenBunkers.current?.value)  letDataArray.push(inputgreenBunkers.current.value)


        onSave(letDataArray)
    }

    const getGIRstring = (data: GIRObject): string => {
        if (data['hit'] === true) return 'hit'

        let stringGirValues = ''

        Object.keys(data).forEach((key) => {
            if (data[key] === true) stringGirValues += key + ' '
        })

        return stringGirValues.trimEnd()
    }

    return (
        <Box className={styling.root}>
            <Typography style={{ marginBottom: '2vh', fontSize: '25px' }}>
                Hole {HoleNumber} - Par {Par}
            </Typography>
            <TextField
                size="small"
                variant="outlined"
                label="Score"
                inputRef={inputScore}
                value={Score}
                autoFocus={true}
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
                inputRef={inputPutts}
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
            {Par !== 3 && (
                <Box className={styling.row}>
                        <FormLabel
                            component="legend"
                            className={styling.radios}
                        >
                            FIR
                        </FormLabel>
                        <RadioGroup
                            aria-label="Fairway hit"
                            name="fir"
                            row
                            onChange={handleFIRSelection}
                            value={FIR}
                        >
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
                        </RadioGroup>

                    <TextField
                        inputRef={inputHiddenFir}
                        onChange={handleFirEnter}
                        type="number"
                        inputProps={{
                            maxLength: 1,
                            pattern: '[0-7]',
                            style: {
                                fontSize: '0px',
                                width: '0px',
                            },
                        }}
                    />
                </Box>
            )}
            <Box className={styling.column}>
                <FormLabel component="legend" className={styling.radios}>
                    GIR
                </FormLabel>

                <Grid container alignContent="center" alignItems="center" wrap="nowrap" spacing={2}>
                    <FormGroup
                        aria-label="green in regulation"
                        row
                        style={{width: '100%', flexWrap: window.innerWidth < 1000 ? "wrap" : "nowrap"}}
                    >
                        <Grid item xs={4}>
                        <FormControlLabel
                            value="hit"
                            control={
                                <Checkbox
                                    onChange={handleGIRSelection}
                                    name="hit"
                                    size="small"
                                    checked={GIR['hit']}
                                    disabled={Object.keys(GIR).some(
                                        (value) =>
                                            GIR[value] === true &&
                                            GIR['hit'] === false
                                    )}
                                />
                            }
                            label="Hit"
                            labelPlacement="top"
                        />
                        </Grid>                        <Grid item xs={4}>

                        <FormControlLabel
                            value="left"
                            control={
                                <Checkbox
                                    onChange={handleGIRSelection}
                                    name="left"
                                    size="small"
                                    checked={GIR['left']}
                                    disabled={
                                        GIR['hit'] ||
                                        GIR['right'] ||
                                        GIR['NONE']
                                    }
                                />
                            }
                            label="Miss left"
                            labelPlacement="top"
                        />
                        </Grid>                        <Grid item xs={4}>


                        <FormControlLabel
                            value="right"
                            control={
                                <Checkbox
                                    onChange={handleGIRSelection}
                                    name="right"
                                    size="small"
                                    checked={GIR['right']}
                                    disabled={
                                        GIR['hit'] || GIR['left'] || GIR['NONE']
                                    }
                                />
                            }
                            label="Miss right"
                            labelPlacement="top"
                        />                        </Grid>                        <Grid item xs={4}>


                        <FormControlLabel
                            value="short"
                            control={
                                <Checkbox
                                    onChange={handleGIRSelection}
                                    size="small"
                                    name="short"
                                    checked={GIR['short']}
                                    disabled={
                                        GIR['hit'] || GIR['long'] || GIR['NONE']
                                    }
                                />
                            }
                            label="Miss short"
                            labelPlacement="top"
                        />                        </Grid>                        <Grid item xs={4}>


                        <FormControlLabel
                            value="long"
                            control={
                                <Checkbox
                                    onChange={handleGIRSelection}
                                    name="long"
                                    size="small"
                                    checked={GIR['long']}
                                    disabled={
                                        GIR['hit'] ||
                                        GIR['short'] ||
                                        GIR['NONE']
                                    }
                                />
                            }
                            label="Miss long"
                            labelPlacement="top"
                        />                        </Grid>                        <Grid item xs={4}>


                        <FormControlLabel
                            value="NONE"
                            control={
                                <Checkbox
                                    onChange={handleGIRSelection}
                                    name="NONE"
                                    size="small"
                                    checked={GIR['NONE']}
                                    disabled={Object.keys(GIR).some(
                                        (value) =>
                                            GIR[value] === true &&
                                            GIR['NONE'] === false
                                    )}
                                />
                            }
                            label="No try"
                            labelPlacement="top"
                        />                        </Grid>

                    </FormGroup>
                    <TextField
                        size="small"
                        variant="standard"
                        helperText="Approach Distance"
                        inputRef={inputApproachDistance}
                        type="number"
                        value={ApproachDistance}
                        disabled={GIR['NONE']}
                        onChange={handleApproachDistanceEnter}
                        InputProps={{
                            disableUnderline: true,
                            endAdornment: (
                                <InputAdornment position="end">
                                    (m)
                                </InputAdornment>
                            ),
                        }}
                        inputProps={{
                            maxLength: 3,
                            pattern: '[0-9]',
                            style: {
                                textAlign: 'center',
                                fontSize: '22px',
                                width: window.innerWidth < 1500 ? '35vw' : '10vw',
                            },
                        }}
                        InputLabelProps={{ shrink: true }}
                    />
                    </Grid>
                    <TextField
                        inputRef={inputHiddenGir}
                        onChange={handleGirEnter}
                        type="number"
                        inputProps={{
                            maxLength: 1,
                            pattern: '[0-9]',
                            style: {
                                fontSize: '0px',
                                width: '0px',
                                height: '0px'
                            },
                        }}
                        InputProps={{
                            disableUnderline: true,
                        }}


                    />
                    
                </Box>
            <Box className={styling.row}>
                <TextField
                    size="small"
                    variant="standard"
                    value={Penalties}
                    inputRef={inputPenalties}
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
                    inputRef={inputfwBunkers}
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
                    inputRef={inputgreenBunkers}
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
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={onClickPrev}
                >
                    Previous Hole
                </Button>
                {HoleNumber === 18 ? (
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleNextHoleClicked}
                        startIcon={<CloudUploadIcon />}
                    >
                        Save Round
                    </Button>
                ) : (
                    <Button
                        variant="contained"
                        color="secondary"
                        ref={inputNextHoleButton}
                        onClick={handleNextHoleClicked}
                    >
                        Next Hole
                    </Button>
                )}
            </Box>
        </Box>
    )
}

export default EnterHoleScore
