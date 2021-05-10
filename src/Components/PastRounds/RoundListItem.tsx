import React from 'react'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

interface props {
    name: string
    score: string[]
    date: string
    index: number
    onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const useStyles = makeStyles((theme) => ({

    coursename: {
        fontSize: '22px',
        textAlign: 'center'
    },
    scoredate: {
        display: 'flex',
        flexDirection: 'row',
        width: '30%',
        justifyContent: 'space-between',
    },
    scoredatemobile: {
        display: 'flex',
        flexDirection: 'row',
        width: '90%',
        justifyContent: 'space-between',
    },
    listitem: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        border: '1px solid black',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 'auto',
        cursor: 'pointer',
        backgroundColor: theme.palette.success.light,
        borderRadius: '7px',
        width: '30vw',
        '&:hover': {
            backgroundColor: 'hsla(194, 3%, 88%, 1)',
        },
    },
    listitemmobile: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        border: '1px solid black',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 'auto',
        cursor: 'pointer',
        backgroundColor: theme.palette.success.light,
        borderRadius: '7px',
        width: '90%',
        '&:hover': {
            backgroundColor: 'hsla(194, 3%, 88%, 1)',
        },
    },
}))

const RoundListItem: React.FC<props> = ({ name, score, date, onClick, index }) => {
    const styling = useStyles()

    //Calculate the total score to show from hole scores
    const totalScore = score.reduce((accumulator: string, curVal: string) =>
        (Number(accumulator) + Number(curVal)).toString()
    )

    return (
        <Box
            className={window.innerWidth > 1200 ? styling.listitem : styling.listitemmobile}
            onClick={onClick}
            id={index.toString()}
        >
            <Typography className={styling.coursename} id={index.toString()} >{name}</Typography>
           <Box className={window.innerWidth > 1200 ? styling.scoredate : styling.scoredatemobile}>
            <Typography className={styling.coursename} id={index.toString()}>{totalScore}</Typography>
            <Typography className={styling.coursename} id={index.toString()}>{date.split('T')[0]}</Typography>

            </Box>
        </Box>
    )
}

export default RoundListItem
