import React, { useState, useEffect } from 'react'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'
import LineChart from './../LineChart'
import { sumScores } from './../../../Utils/Helpers'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
        marginTop: '20px',
        padding: '20px 20px 20px 20px',
        borderRadius: '7px',
        backgroundColor: 'hsl(107, 100%, 87%)',

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
        let upandDownCounter: number = 0
        let upandDownTryCounter: number = 0
        let sandSavesCounter: number = 0
        let sandSavesTryCounter: number = 0




        greenbunkers.forEach((value: string, index: number) => {
            if (value === '1' && puttsdata[index] === '1') {
                //Push 100 to get full percentage values
                sandSavesCounter++
                sandSavesTryCounter++
                sandSaves.push(String(sandSavesCounter*100/sandSavesTryCounter))
            } 
            // in case of multiple sandshots or putts
            else if (value > '0' && puttsdata[index] !== '1') 
                {
                    sandSavesTryCounter++
                    sandSaves.push(String(sandSavesCounter*100/sandSavesTryCounter))

                }
            else if (value === '0' && puttsdata[index] === '1' && girdata[index] !== 'hit') 
                {
                    upandDownCounter++
                    upandDownTryCounter++
                    upandDowns.push(String(upandDownCounter*100/upandDownTryCounter))
                }
            else if (value === '0' && puttsdata[index] > '1' && girdata[index] !== 'hit') 
                {
                    upandDownTryCounter++
                    upandDowns.push(String(upandDownCounter*100/upandDownTryCounter))
                }

        })


        SetSandSaves(sandSaves)
        SetUpAndDowns(upandDowns)
    }

    return (
        <Box className={styling.root}>
                            <Box className={styling.row}>
                    <Typography align="center" variant="h4">
                        Short Game
                    </Typography>
                </Box>

            <Box className={window.innerWidth > 1200 ? styling.row : styling.column}>
                <LineChart
                    dataArray={PuttsPerGIR}
                    title="Putts Avg GIR"
                    average={true}
                    last={7}
                />
                <LineChart
                    dataArray={PuttsNoGIR}
                    title="Putts Avg NO GIR"
                    average={true}
                    last={7}
                />
                <LineChart
                    dataArray={PuttsPerRound}
                    title="Putts Per Round"
                    average={true}
                />
            </Box>

            <Box className={window.innerWidth > 1200 ? styling.row : styling.column}>
                <LineChart
                    dataArray={SandSaves}
                    title="Greenside Sand Save %"
                    average={true}
                    last={7}
                />
                   <LineChart
                    dataArray={UpAndDowns}
                    title="Up and Down %"
                    average={true}
                    last={7}
                />
            </Box>
        </Box>
    )
}

export default ShortGameStats
