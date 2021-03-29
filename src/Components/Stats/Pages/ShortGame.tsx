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
    gir: string[][]
    greenbunkers: string[][]
  }



const ShortGameStats: React.FC<propsData> = ({pars, holescores, putts, gir, greenbunkers}) => {

    const styling = useStyles()

    const [Scores, SetScores] = useState<string[]>([])
    const [Pars, SetPars] = useState<string[]>([])
    const [Putts, SetPutts] = useState<string[]>([])
    const [PuttsPerRound, SetPuttsPerRound] = useState<string[]>([])
    const [PuttsPerGIR, SetPuttsPerGIR] = useState<string[]>([])
    const [PuttsNoGIR, SetPuttsNoGIR] = useState<string[]>([])
    const [FIR, SetFIR] = useState<string[]>([])
    const [GIR, SetGIR] = useState<string[]>([])
    const [GreenBunkers, SetGreenBunkers] = useState<string[]>([])


    useEffect(() => {

        let parstot: string[] = []
        let holescorestot: string[] = []
        let puttstot: string[] = []
        let puttsperRound: string[] = []
        let fIRtot: string[]= []
        let gIRtot: string[]= []
        let greenBunkerstot: string[] = []
    

        for (let i = 0; i <holescores.length; i++) {
            parstot = parstot.concat((pars[i]))
            holescorestot = holescorestot.concat((holescores[i]))
            puttstot = puttstot.concat((putts[i]))
            puttsperRound.push(sumScores(putts[i]))
            gIRtot = gIRtot.concat((gir[i]))
            greenBunkerstot = greenBunkerstot.concat((greenbunkers[i]))
        }
        SetPars(parstot)
        SetScores(holescorestot)
        SetPutts(puttstot)
        SetPuttsPerRound(puttsperRound)
        SetFIR(fIRtot)
        SetGIR(gIRtot)
        SetGreenBunkers(greenBunkerstot)
        calcputtsPerGIR()

    }, [])

    const calcputtsPerGIR = () => {

        let girPutts: string[] = []
        let nogirPutts: string[] = []

        GIR.forEach((value: string, index: number) => {

            if ( value === "hit") {
                console.log('hitted')
                girPutts.push(Putts[index])
            }
            else {
                nogirPutts.push(Putts[index])
            }

        })

        SetPuttsPerGIR(girPutts)
        SetPuttsNoGIR(nogirPutts)

    }


    return (
        <Box className={styling.root}>

            <LineChart dataArray = {PuttsPerGIR} title="Putts Avg GIR (7 round moving average)" average={true} />
            <LineChart dataArray = {PuttsNoGIR} title="Putts Avg NO GIR (7 round moving average)" average={true} />
            <LineChart dataArray = {PuttsPerRound} title="Putts (7 round moving average)" average={true} />


          
        </Box>
    )
}

export default ShortGameStats