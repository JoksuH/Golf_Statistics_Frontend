import React, { useState, useEffect } from 'react'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'
import LineChart from './../LineChart'
import { sumScores, hitCounter } from './../../../Utils/Helpers'
import { Typography } from '@material-ui/core'

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
        marginTop: '20px',
        padding: '20px 20px 20px 20px',
        borderRadius: '7px',
        backgroundColor: 'hsl(107, 100%, 85%)',

    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        margin: 'auto',
    },
    column: {
        display: 'flex',
        flexDirection: 'column',
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
           <Typography align="center" variant="h4"> Overview (per Round) </Typography>
            <Box className={window.innerWidth > 1200 ? styling.row : styling.column}>
                <LineChart
                    dataArray={Scores}
                    title="Shots"
                    average={true}
                    />
                <LineChart
                    dataArray={Putts}
                    title="Putts"
                    average={true}
                />
                <LineChart
                    dataArray={GIR}
                    title="FIR"
                    average={true}
                />
            </Box>

            <Box className={window.innerWidth > 1200 ? styling.row : styling.column}>
                <LineChart
                    dataArray={FIR}
                    title="GIR"
                    average={true}
                />
                <LineChart
                    dataArray={Penalties}
                    title="Penalties"
                    average={true}
                />
                <LineChart
                    dataArray={GreenBunkers}
                    title="Green Bunkers"
                    average={true}
                />
            </Box>
        </Box>
    )
}

export default MainStats
