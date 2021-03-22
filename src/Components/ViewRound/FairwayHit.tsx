import React from 'react'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import CheckIcon from '@material-ui/icons/Check'

interface props {
    fairwayvalue: string,
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        margin: 'auto',
    },
}))


const FairwayHit: React.FC<props> = ({fairwayvalue}) => {

    const styling = useStyles()

    return (
        <Box className={styling.root}>
            {fairwayvalue === "hit" && <CheckIcon />}
            {fairwayvalue === "left" && <ArrowBackIcon />}
            {fairwayvalue === "right" && <ArrowForwardIcon />}

           
        </Box>
    )
}

export default FairwayHit
