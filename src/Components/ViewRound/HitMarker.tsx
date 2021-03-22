import React from 'react'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import CheckIcon from '@material-ui/icons/Check'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'
import CallMadeIcon from '@material-ui/icons/CallMade'
import CallReceivedIcon from '@material-ui/icons/CallReceived'
import CallMissedIcon from '@material-ui/icons/CallMissed'
import TrendingDownIcon from '@material-ui/icons/TrendingDown'

interface props {
    hitvalue: string,
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        margin: 'auto',
        lineHeight: 2,
        fontSize: 20
    },
}))


const HitMarker: React.FC<props> = ({hitvalue}) => {

    const styling = useStyles()

    return (
        <Box className={styling.root}>
            {hitvalue === "hit" && <CheckIcon />}
            {hitvalue === "left" && <ArrowBackIcon color="secondary"/>}
            {hitvalue === "right" && <ArrowForwardIcon  color="secondary"/>}
            {hitvalue === "long" && <ArrowUpwardIcon  color="secondary"/>}
            {hitvalue === "short" && <ArrowDownwardIcon  color="secondary"/>}
            {hitvalue === "right long" && <CallMadeIcon  color="secondary"/>}
            {hitvalue === "right short" && <TrendingDownIcon  color="secondary"/>}
            {hitvalue === "left short" && <CallReceivedIcon  color="secondary"/>}
            {hitvalue === "left long" && <CallMissedIcon  color="secondary"/>}

        </Box>
    )
}

export default HitMarker
