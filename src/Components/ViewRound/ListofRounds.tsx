import React from 'react'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        margin: 'auto',
    },
}))

/*
query {
    roundById(_id: "605b2b932c0f2127c85ef2c0") {
      course {
        name
        pars
      }
      }
  }
*/

const ListofRounds: React.FC<props> = () => {

    const styling = useStyles()

    return (
        <Box className={styling.root}>
           
        </Box>
    )
}

export default ListofRounds
