import React from 'react'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import HitMarker from './HitMarker'

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(6),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%',
        margin: 'auto',
        paddingBottom: '2vh',
        backgroundColor: theme.palette.success.light,
    },
    holenumbers: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    scorecard: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    holenumbercontainer: {
        height: '4vh',
        width: '2vw',
        border: '1px solid black',
        padding: '5px 5px 5px 5px',
        textAlign: 'center',
    },
    iconcontainer: {
        height: '4vh',
        width: '2vw',
        border: '1px solid black',
        padding: '5px 5px 5px 5px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    scorecardinfo: {
        height: '4vh',
        width: '5vw',
        border: '1px solid black',
        padding: '5px 5px 5px 5px',
        textAlign: 'center',
    },
    holepaircontainer: {
        padding: '0px 0px 0px 0px',
    },
    holetext: {
        paddingLeft: '10px',
        margin: 'auto',
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
    },
    input: {
        '&:invalid': {
            border: 'red solid 2px',
        },
    },
}))

const ViewRound: React.FC = () => {
    const Pars: string[] = ['5', '3', '4', '4', '5', '4', '4', '3', '5','4', '4', '3', '5', '3', '4', '4', '4', '5']
    const Strokes: string[] = ['5', '4', '3', '2', '5', '4', '6', '3', '5','5', '4', '3', '2', '5', '4', '6', '3', '5']
    const Putts: string[] = ['2', '2', '3', '2', '2', '1', '1', '2', '1','2', '2', '1', '2', '3', '1', '2', '3', '2']
    const Fairways: string[] = ['hit', "null", 'hit', 'hit', 'left', 'right', 'hit', 'null', 'left','right', 'hit', 'null', 'right', 'null', 'left', 'right', 'hit', 'right']
    const GIRs: string[] = ['hit', "left long", 'hit', 'hit', 'right short', 'right long', 'hit', 'left', 'left','right', 'hit', 'left short', 'right', 'hit', 'left', 'right', 'hit', 'right']
    const Penalties: string[] = ['0', '0', '0', '0', '0', '1', '0', '0', '1','0', '0', '0', '0', '0', '1', '0', '0', '0']
    const Bunkers: string[] = ['0', '0', '0', '1', '0', '0', '0', '1', '0','0', '0', '1', '0', '0', '1', '0', '2', '0']




    const styling = useStyles()

    return (
        <Box className={styling.root}>
            <Typography variant="h4" className={styling.enterpar}>
                Espoo Ringside Golf
            </Typography>
            <Box className={styling.holenumbers}>
                <Box className={styling.holepaircontainer}>
                    <Box className={styling.scorecardinfo}>
                        <Typography variant="h6" className={styling.holetext}>
                            Hole
                        </Typography>
                    </Box>
                    <Box className={styling.scorecardinfo}>
                        <Typography variant="h6">Par</Typography>
                    </Box>
                    <Box className={styling.scorecardinfo}>
                        <Typography variant="h6">Strokes</Typography>
                    </Box>
                    <Box className={styling.scorecardinfo}>
                        <Typography variant="h6">Putts</Typography>
                    </Box>
                    <Box className={styling.scorecardinfo}>
                        <Typography variant="h6">Fairway</Typography>
                    </Box>

                    <Box className={styling.scorecardinfo}>
                        <Typography variant="h6">GIR</Typography>
                    </Box>
                    <Box className={styling.scorecardinfo}>
                        <Typography variant="h6">Penalties</Typography>
                    </Box>
                    <Box className={styling.scorecardinfo}>
                        <Typography variant="h6">Bunkers</Typography>
                    </Box>
                </Box>
                {Pars.map((number, index) => {
                    return (
                        <Box className={styling.holepaircontainer} key={number}>
                            <Box
                                className={styling.holepaircontainer}
                                key={number}
                            >
                                <Box className={styling.holenumbercontainer}>
                                    <Typography variant="h6">
                                        {index + 1}
                                    </Typography>
                                </Box>
                                <Box className={styling.holenumbercontainer}>
                                    <Typography variant="h6">
                                        {number}
                                    </Typography>
                                </Box>
                            </Box>
                            <Box
                                className={styling.holepaircontainer}
                                key={number}
                            >
                                <Box className={styling.holenumbercontainer}>
                                    <Typography variant="h6">
                                        {Strokes[index]}
                                    </Typography>
                                </Box>
                                <Box className={styling.holenumbercontainer}>
                                    <Typography variant="h6">
                                        {Putts[index]}
                                    </Typography>
                                </Box>
                                {number !== "3" ?
                                <Box className={styling.iconcontainer}>
                                        <HitMarker hitvalue={Fairways[index]}/>
                                </Box>
                                :
                                <Box className={styling.holenumbercontainer}>
                                </Box>
                                }
                                <Box className={styling.iconcontainer}>
                                        <HitMarker hitvalue={GIRs[index]}/>
                                </Box>
                                <Box className={styling.holenumbercontainer}>
                                    <Typography variant="h6">
                                        {Penalties[index]}
                                    </Typography>
                                </Box>
                                <Box className={styling.holenumbercontainer}>
                                    <Typography variant="h6">
                                        {Bunkers[index]}
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    )
                })}
            </Box>
        </Box>
    )
}

export default ViewRound
