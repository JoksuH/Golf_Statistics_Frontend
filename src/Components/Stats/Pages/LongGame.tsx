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
    fir: string[][]
    gir: string[][]
    approachdistances: string[][]
    fairwaybunkers: string[][]
    penalties: string[][]
}



const LongGameStats: React.FC<propsData> = ({ pars,
    holescores,
    fir,
    gir,
    approachdistances,
    penalties,
fairwaybunkers}) => {

    const [Scores, SetScores] = useState<string[]>([])
    const [Pars, SetPars] = useState<string[]>([])
    const [FIR, SetFIR] = useState<string[]>([])
    const [GIR, SetGIR] = useState<string[]>([])
    const [ApproachDistances, SetApproachDistances] = useState<string[]>([])
    const [FairwayBunkers, SetFairwayBunkers] = useState<string[]>([])

    useEffect(() => {
        let parstot: string[] = []
        let holescorestot: string[] = []
        let approachdistancstot: string[] = []
        let fIRtot: string[] = []
        let gIRtot: string[] = []
        let FwBunkerstot: string[] = []

        for (let i = 0; i < holescores.length; i++) {
            parstot = parstot.concat(pars[i])
            holescorestot = holescorestot.concat(holescores[i])
            approachdistancstot = approachdistancstot.concat(approachdistances[i])
            gIRtot = gIRtot.concat(gir[i])
            FwBunkerstot = FwBunkerstot.concat(fairwaybunkers[i])
        }
        SetPars(parstot)
        SetScores(holescorestot)
        SetFIR(fIRtot)
        SetGIR(gIRtot)
        SetApproachDistances(approachdistancstot)
        SetFairwayBunkers(FwBunkerstot)

    }, [pars, holescores, approachdistances, gir, fairwaybunkers])



    const styling = useStyles()

    return (
        <Box className={styling.root}>
            <Box className={styling.row}>

            <LineChart dataArray = {Scores} title="GIR (7 round moving average)" average={true} fitData={true}/>
            </Box>
            <Box className={styling.row}>

            <LineChart dataArray = {Scores} title="Approach Distance (7 round moving average)" average={true} fitData={true}/>
            </Box>


          
        </Box>
    )
}

export default LongGameStats