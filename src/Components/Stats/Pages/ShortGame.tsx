import React, { useState, useEffect } from 'react'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'
import LineChart from './../LineChart'
import { sumScores } from './../../../Utils/Helpers'

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
    pars?: number[]
    holescores: string[][]
    putts: string[][]
    gir: string[][]
    greenbunkers: string[][]
}

const ShortGameStats: React.FC<propsData> = ({
    pars,
    holescores,
    putts,
    gir,
    greenbunkers,
}) => {
    const styling = useStyles()

    const [PuttsPerRound, SetPuttsPerRound] = useState<string[]>([])
    const [PuttsPerGIR, SetPuttsPerGIR] = useState<string[]>([])
    const [PuttsNoGIR, SetPuttsNoGIR] = useState<string[]>([])
    const [SandSaves, SetSandSaves] = useState<string[]>([])
    const [UpAndDowns, SetUpAndDowns] = useState<string[]>([])

    useEffect(() => {
        let holescorestot: string[] = []
        let puttstot: string[] = []
        let puttsperRound: string[] = []
        let gIRtot: string[] = []
        let greenBunkerstot: string[] = []

        for (let i = 0; i < holescores.length; i++) {
            holescorestot = holescorestot.concat(holescores[i])
            puttstot = puttstot.concat(putts[i])
            puttsperRound.push(sumScores(putts[i]))
            gIRtot = gIRtot.concat(gir[i])
            greenBunkerstot = greenBunkerstot.concat(greenbunkers[i])
        }
        calcputtsPerGIR(gIRtot, puttstot)
        calcSandSavesandUpDowns(greenBunkerstot, puttstot, gIRtot)
        SetPuttsPerRound(puttsperRound)
    }, [pars, holescores, putts, gir, greenbunkers])

    const calcputtsPerGIR = (girdata: string[], puttsdata: string[]) => {
        let girPutts: string[] = []
        let nogirPutts: string[] = []

        girdata.forEach((value: string, index: number) => {
            if (value === 'hit') {
                girPutts.push(puttsdata[index])
            } else {
                nogirPutts.push(puttsdata[index])
            }
        })

        SetPuttsPerGIR(girPutts)
        SetPuttsNoGIR(nogirPutts)
    }

    const calcSandSavesandUpDowns = (greenbunkers: string[], puttsdata: string[], girdata: string[]) => {

        let upandDowns: string[] = []
        let sandSaves: string[] = []


        greenbunkers.forEach((value: string, index: number) => {
            if (value === '1' && puttsdata[index] === '1') {
                //Push 100 to get full percentage values
                sandSaves.push('100')
            } 
            else if (value > '0' && puttsdata[index] !== '1') 
                {
                    sandSaves.push('0')
                }
            else if (value === '0' && puttsdata[index] === '1' && girdata[index] !== 'hit') 
                {
                    upandDowns.push('100')
                }
            else if (value === '0' && puttsdata[index] > '1' && girdata[index] !== 'hit') 
                {
                    upandDowns.push('0')
                }
        })

        SetSandSaves(sandSaves)
        SetUpAndDowns(upandDowns)
    }

    return (
        <Box className={styling.root}>
            <Box className={styling.row}>
                <LineChart
                    dataArray={PuttsPerGIR}
                    title="Putts Avg GIR (7 round moving average)"
                    average={true}
                    last={7}
                    perRound={true}
                />
                <LineChart
                    dataArray={PuttsNoGIR}
                    title="Putts Avg NO GIR (7 round moving average)"
                    average={true}
                    last={7}
                    perRound={true}
                />
                <LineChart
                    dataArray={PuttsPerRound}
                    title="Putts (7 round moving average)"
                    average={true}
                />
            </Box>

            <Box className={styling.row}>
                <LineChart
                    dataArray={SandSaves}
                    title="Greenside Sand Save % (moving average)"
                    average={true}
                    last={15}
                />
                   <LineChart
                    dataArray={UpAndDowns}
                    title="Up and Down % (moving average)"
                    average={true}
                    last={15}
                />
            </Box>
        </Box>
    )
}

export default ShortGameStats
