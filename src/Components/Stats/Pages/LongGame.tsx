import React, { useState, useEffect } from 'react'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import LineChart from './../LineChart'
import BarChart from './../BarChart'
import {sumScores, hitCounter} from './../../../Utils/Helpers'



const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',        
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        margin: 'auto',        
    },
}))

 interface propsData {
    Fir: string[]
  }



const LongGame: React.FC<propsData> = ({Fir}) => {

    const styling = useStyles()

    return (
        <Box className={styling.root}>
            {Fir && <p>Loading data, please wait a bit...</p>}
            {Fir && 
            <>
            <Box className={styling.row}>

            <LineChart dataArray = {Fir} title="GIR (7 round moving average)" average={true} fitData={true}/>
            </Box>
            <Box className={styling.row}>

            <LineChart dataArray = {Fir} title="Approach Distance (7 round moving average)" average={true} fitData={true}/>
            </Box>
            </>
            }

          
        </Box>
    )
}

export default LongGame