import React, { useState, useEffect } from 'react'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { gql, useQuery } from '@apollo/client'
import LineChart from './LineChart'
import BarChart from './BarChart'
import {sumScores} from './../../Utils/Helpers'



const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'row',
        margin: 'auto',        
    },
}))

 interface Query {
    __typename: string
    roundMany: dataFields[]
  }

  interface dataFields {
    __typename: string
    holescores: string[]
    putts: string[]
    fir: string[]
    gir: string[]
    approachdistance: string[]
    penalties: string[]
    greenbunkers: string[]
    fwbunkers: string[]
  }



const GET_LATEST_ROUNDS = gql`
    query {
        roundMany(limit: 50) {
            holescores
            putts
            fir
            gir
            approachdistance
            penalties
            greenbunkers
            fwbunkers
        }
    }
`


const StatsPage = () => {

    const styling = useStyles()

    const [ScoreCard, SetScoreCard] = useState<string[]>([])
    const [Putts, SetPutts] = useState<string[]>([])
    const [FIR, SetFIR] = useState<string[]>([])
    const [GIR, SetGIR] = useState<string[]>([])
    const [ApproachDistance, SetApproachDistance] = useState<string[]>([])
    const [Penalties, SetPenalties] = useState<string[]>([])
    const [FairwayBunkers, SetFairwayBunkers] = useState<string[]>([])
    const [GreenBunkers, SetGreenBunkers] = useState<string[]>([])

    const { data, loading } = useQuery<Query>(GET_LATEST_ROUNDS)

    useEffect(() => {

        let holescores: string[] = []
        let putts: string[] = []
        let fIR: string[] = []
        let gIR: string[] = []
        let approachDistance: string[] = []
        let penalties: string[] = []
        let fairwayBunkers: string[] = []
        let greenBunkers: string[] = []



        data?.roundMany?.forEach(value => {
            holescores.push(sumScores(value.holescores))
            putts.push(sumScores(value.putts))
            fIR = fIR.concat(value.fir)
            gIR = gIR.concat(value.gir)
            approachDistance = approachDistance.concat(value.approachdistance)
            penalties.push(sumScores(value.penalties))
            fairwayBunkers.push(sumScores(value.greenbunkers))
            greenBunkers.push(sumScores(value.fwbunkers))
        })

        SetScoreCard(holescores)
        SetPutts(putts)
        SetFIR(fIR)
        SetGIR(gIR)
        SetApproachDistance(approachDistance)
        SetPenalties(penalties)
        SetFairwayBunkers(fairwayBunkers)
        SetGreenBunkers(greenBunkers)

    }, [data])

    return (
        <Box className={styling.root}>
            {loading && <p>Loading data, please wait a bit...</p>}
            {ScoreCard && 
            <>
            <LineChart dataArray = {ScoreCard} title="Shots (7 round moving average)" average={true} min={65} max={100}/>
            <BarChart dataArray = {ScoreCard} title="Strokes per Round"/>
            <LineChart dataArray = {Putts} title="Putts (7 round moving average)" average={true} min={25} max={45}/>
            <BarChart dataArray = {Putts} title="Putts per Round"/>

            </>
            }

          
        </Box>
    )
}

export default StatsPage

// Putts per Gir