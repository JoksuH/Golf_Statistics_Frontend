import React, { useState, useEffect } from 'react'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'
import LineChart from './../LineChart'
import { sumScores, hitCounter } from './../../../Utils/Helpers'

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
    pars?: string[][]
    holescores: string[][]
    putts: string[][]
    fir: string[][]
    gir: string[][]
    greenbunkers: string[][]
    penalties: string[][]
}

const MainStats: React.FC<propsData> = ({
    pars,
    holescores,
    putts,
    fir,
    gir,
    greenbunkers,
    penalties,
}) => {
    const [Scores, SetScores] = useState<string[]>([])
    const [Putts, SetPutts] = useState<string[]>([])
    const [FIR, SetFIR] = useState<string[]>([])
    const [GIR, SetGIR] = useState<string[]>([])
    const [Penalties, SetPenalties] = useState<string[]>([])
    const [GreenBunkers, SetGreenBunkers] = useState<string[]>([])

    let holescorestot: string[] = []
    let puttstot: string[] = []
    let fIRtot: string[] = []
    let gIRtot: string[] = []
    let penaltiestot: string[] = []
    let greenBunkerstot: string[] = []

    const styling = useStyles()

    useEffect(() => {
        for (let i = 0; i < holescores.length; i++) {
            holescorestot.push(sumScores(holescores[i]))
            puttstot.push(sumScores(putts[i]))
            fIRtot.push(hitCounter(fir[i], 'hit'))
            gIRtot.push(hitCounter(gir[i], 'hit'))
            penaltiestot.push(sumScores(penalties[i]))
            greenBunkerstot.push(sumScores(greenbunkers[i]))
        }
        SetScores(holescorestot)
        SetPutts(puttstot)
        SetFIR(fIRtot)
        SetGIR(gIRtot)
        SetPenalties(penaltiestot)
        SetGreenBunkers(greenBunkerstot)
    }, [holescores,putts,fir,gir,penalties,greenbunkers])

    return (
        <Box className={styling.root}>
            <Box className={styling.row}>
                <LineChart
                    dataArray={Scores}
                    title="Shots (7 round moving average)"
                    average={true}
                    />
                <LineChart
                    dataArray={Putts}
                    title="Putts (7 round moving average)"
                    average={true}
                />
                <LineChart
                    dataArray={GIR}
                    title="FIR (7 round moving average)"
                    average={true}
                />
            </Box>

            <Box className={styling.row}>
                <LineChart
                    dataArray={FIR}
                    title="GIR (7 round moving average)"
                    average={true}
                />
                <LineChart
                    dataArray={Penalties}
                    title="Penalties (7 round moving average)"
                    average={true}
                />
                <LineChart
                    dataArray={GreenBunkers}
                    title="Green Bunkers (7 round moving average)"
                    average={true}
                />
            </Box>
        </Box>
    )
}

export default MainStats
