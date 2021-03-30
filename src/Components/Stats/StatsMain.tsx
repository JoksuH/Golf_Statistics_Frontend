import React, { useState, useEffect } from 'react'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { gql, useQuery } from '@apollo/client'
import LineChart from './LineChart'
import BarChart from './BarChart'
import { sumScores, hitCounter } from './../../Utils/Helpers'
import StatTabs from './Tabs'
import MainStats from './Pages/Main'
import ShortGameStats from './Pages/ShortGame'
import LongGameStats from './Pages/LongGame'

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
    course: courseData
}

interface courseData {
    pars: number[]
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
            course {
                pars
            }
        }
    }
`

const StatsPage = () => {
    const styling = useStyles()

    const [Scores, SetScores] = useState<string[][]>([])
    const [Pars, SetPars] = useState<number[]>([])
    const [Putts, SetPutts] = useState<string[][]>([])
    const [FIR, SetFIR] = useState<string[][]>([])
    const [GIR, SetGIR] = useState<string[][]>([])
    const [ApproachDistance, SetApproachDistance] = useState<string[][]>([])
    const [Penalties, SetPenalties] = useState<string[][]>([])
    const [FairwayBunkers, SetFairwayBunkers] = useState<string[][]>([])
    const [GreenBunkers, SetGreenBunkers] = useState<string[][]>([])
    const [ActivePage, SetActivePage] = useState<string>('Overview')
    const [SelectedTeeBox, SetSelectedTeeBox] = useState<string>('White')

    const { data, loading } = useQuery<Query>(GET_LATEST_ROUNDS)

    useEffect(() => {
        let holescores: string[][] = []
        let pars: number[] = []
        let putts: string[][] = []
        let fIR: string[][] = []
        let gIR: string[][] = []
        let approachDistance: string[][] = []
        let penalties: string[][] = []
        let fairwayBunkers: string[][] = []
        let greenBunkers: string[][] = []

        data?.roundMany?.forEach((value) => {
            holescores.push(value.holescores)
            putts.push(value.putts)
            fIR.push(value.fir)
            gIR.push(value.gir)
            approachDistance.push(value.approachdistance)
            penalties.push(value.penalties)
            fairwayBunkers.push(value.greenbunkers)
            greenBunkers.push(value.fwbunkers)
            pars = pars.concat(value.course.pars)
        })

        SetScores(holescores)
        SetPars(pars)
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

    const handleTeeBoxChange = (event: React.ChangeEvent<{}>): void => {
        const input = event.target as HTMLElement
        SetSelectedTeeBox(input.innerHTML)
    }

    return (
        <Box className={styling.root}>
            <StatTabs
                activePage={ActivePage}
                activeTee={SelectedTeeBox}
                onChangeTab={handleTabsChange}
                onChangeTee={handleTeeBoxChange}
            />
            {loading && <p>Loading data, please wait a bit...</p>}
            {(Scores && ActivePage==="Overview") && (
                <>
                    <MainStats
                        holescores={Scores}
                        putts={Putts}
                        fir={FIR}
                        gir={GIR}
                        greenbunkers={GreenBunkers}
                        penalties={Penalties}
                    />
                </>
            )}
            {(Scores && ActivePage==="Long Game") && (
                <>
                    <LongGameStats
                        pars={Pars}
                        holescores={Scores}
                        fir={FIR}
                        gir={GIR}
                        fairwaybunkers={FairwayBunkers}
                        penalties={Penalties}
                        approachdistances={ApproachDistance}
                    />
                </>
            )}
            {(Scores && ActivePage==="Short Game") && (
                <>
                    <ShortGameStats
                        holescores={Scores}
                        putts={Putts}
                        gir={GIR}
                        greenbunkers={GreenBunkers}
                    />
                </>
            )}
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
