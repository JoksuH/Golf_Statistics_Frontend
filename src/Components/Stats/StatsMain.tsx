import React, { useState, useEffect } from 'react'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { gql, useQuery } from '@apollo/client'
import LineChart from './LineChart'
import BarChart from './BarChart'
import {sumScores, hitCounter} from './../../Utils/Helpers'
import StatTabs from './Tabs'



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
    const [ActivePage, SetActivePage] = useState<string>("Main")

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
            fIR.push(hitCounter(value.fir))
            gIR.push(hitCounter(value.gir))
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

    const handleTabsChange = (event: React.ChangeEvent<{}>): void => {

        const input = event.target as HTMLElement
        SetActivePage(input.innerHTML)

    }

    return (
        <Box className={styling.root}>
            <StatTabs activePage={ActivePage} onChange={handleTabsChange}/>
            {loading && <p>Loading data, please wait a bit...</p>}
            {ScoreCard && 
            <>
            <Box className={styling.row}>

            <LineChart dataArray = {ScoreCard} title="Shots (7 round moving average)" average={true} min={65} max={100}/>
            <LineChart dataArray = {Putts} title="Putts (7 round moving average)" average={true} min={25} max={45}/>
            <LineChart dataArray = {GIR} title="FIR (7 round moving average)" average={true} min={0} max={18}/>
            <LineChart dataArray = {FIR} title="GIR (7 round moving average)" average={true} min={0} max={14}/>
            </Box>
            <Box className={styling.row}>

            <LineChart dataArray = {Penalties} title="Penalties (7 round moving average)" average={true} min={0} max={15}/>
            <LineChart dataArray = {FairwayBunkers} title="Fairway Bunkers (7 round moving average)" average={true} min={0} max={15}/>
            <LineChart dataArray = {GreenBunkers} title="Green Bunkers (7 round moving average)" average={true} min={0} max={15}/>
            <LineChart dataArray = {ApproachDistance} title="Approach Distance (7 round moving average)" average={true} min={0} max={200}/>
            </Box>
            </>
            }

          
        </Box>
    )
}

export default StatsPage

// Putts per Gir
// Avg gir hit percentage per meter of approach distance
// split approach distance into groups (25 meters?) and see progression of greens hit
// Gir misses
// fir misses
// When bunker how affects score or putts in greenside bunker
// scoring from different aprroac distances