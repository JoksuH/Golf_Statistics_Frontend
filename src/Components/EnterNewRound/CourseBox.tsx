import React from 'react'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

interface props {
  name: string
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
    fontSize: '22px',
  },
  listitem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 'auto',
    cursor: 'pointer',
    backgroundColor: theme.palette.success.light,
    borderRadius: '7px',
    width: '30vw',
    height: window.innerWidth < 1000 ? '15vh' : '5vh',
    '&:hover': {
      backgroundColor: 'hsla(194, 3%, 88%, 1)',
    },
  },
}))

const CourseBox: React.FC<props> = ({ name, onClick }) => {
  const styling = useStyles()

  return (
    <Box className={styling.root} onClick={onClick}>
      <Box className={styling.listitem}>
        <Typography className={styling.coursename}>{name}</Typography>
      </Box>
    </Box>
  )
}

export default CourseBox
