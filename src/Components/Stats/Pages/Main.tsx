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
    pars: string[][]
    holescores: string[][]
    putts: string[][],
    fir: string[][]
    gir: string[][]
    greenbunkers: string[][]
    penalties: string[][]
  }



const MainStats: React.FC<propsData> = ({pars, holescores, putts,fir, gir, greenbunkers, penalties}) => {

    const [Scores, SetScores] = useState<string[]>([])
    const [Pars, SetPars] = useState<string[]>([])
    const [Putts, SetPutts] = useState<string[]>([])
    const [FIR, SetFIR] = useState<string[]>([])
    const [GIR, SetGIR] = useState<string[]>([])
    const [Penalties, SetPenalties] = useState<string[]>([])
    const [GreenBunkers, SetGreenBunkers] = useState<string[]>([])

    
    let holescorestot: string[] = []
    let puttstot: string[] = []
    let fIRtot: string[]= []
    let gIRtot: string[]= []
    let penaltiestot: string[] = []
    let greenBunkerstot: string[] = []


    const styling = useStyles()

    useEffect(() => {
        for (let i = 0; i <holescores.length; i++) {
            holescorestot.push(sumScores(holescores[i]))
            puttstot.push(sumScores(putts[i]))
            fIRtot.push(hitCounter(fir[i], "hit"))
            gIRtot.push(hitCounter(gir[i], "hit"))
            penaltiestot.push(sumScores(penalties[i]))
            greenBunkerstot.push(sumScores(greenbunkers[i]))
        }
        SetScores(holescorestot)
        SetPutts(puttstot)
        SetFIR(fIRtot)
        SetGIR(gIRtot)
        SetPenalties(penaltiestot)
        SetGreenBunkers(greenBunkerstot)

    }, [])

    return (
        <Box className={styling.root}>
            <Box className={styling.row}>

<LineChart dataArray = {Scores} title="Shots (7 round moving average)" average={true} min={65} max={100}/>
<LineChart dataArray = {Putts} title="Putts (7 round moving average)" average={true} min={25} max={45}/>
<LineChart dataArray = {GIR} title="FIR (7 round moving average)" average={true} min={0} max={18}/>
</Box>

<Box className={styling.row}>
<LineChart dataArray = {FIR} title="GIR (7 round moving average)" average={true} min={0} max={14}/>
<LineChart dataArray = {Penalties} title="Penalties (7 round moving average)" average={true} min={0} max={15}/>
<LineChart dataArray = {GreenBunkers} title="Green Bunkers (7 round moving average)" average={true} min={0} max={15}/>
</Box>

          
        </Box>
    )
}

export default MainStats