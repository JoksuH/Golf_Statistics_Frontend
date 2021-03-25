import React from 'react'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

interface props {
name: string,
score: string[]
index: number
onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'start',
        width: '60vw',
        margin: 'auto',
    },
    coursename: {
        fontSize: '22px'
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
        height: '8vh',
        "&:hover" : {
            backgroundColor: 'hsla(194, 3%, 88%, 1)',

        }
     },

}))


const RoundListItem: React.FC<props> = ({name, score, onClick, index}) => {

    const styling = useStyles()

    const totalScore = score.reduce((accumulator: string, curVal: string)  => (Number(accumulator) + Number(curVal)).toString())

    return (
        <Box className={styling.listitem} onClick={onClick} id={index.toString()}>
            <Typography className={styling.coursename}>
                {name}
            </Typography>
            <Typography className={styling.coursename}>
                {totalScore}
            </Typography>
        </Box>
    )
}

export default RoundListItem
