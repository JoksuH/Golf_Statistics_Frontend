import React, { useState, useEffect } from 'react'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import LineChart from './../LineChart'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
        backgroundColor: 'hsl(107, 100%, 87%)',
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        margin: 'auto',
    },
    toggle: {
        margin: '0 25px 0 25px',
    },
    toggletext: {
        fontSize: '17px',
        color: 'black',
    },
}))

interface propsData {
    pars: number[]
    scores: string[][]
    approachdistances: string[][]
}

const Scoring: React.FC<propsData> = ({ pars, scores, approachdistances }) => {
    const [ShotsFrom2550, SetShotsFrom2550] = useState<string[]>([])
    const [ShotsFrom5075, SetShotsFrom5075] = useState<string[]>([])
    const [ShotsFrom75100, SetShotsFrom75100] = useState<string[]>([])
    const [ShotsFrom100125, SetShotsFrom100125] = useState<string[]>([])
    const [ShotsFrom125150, SetShotsFrom125150] = useState<string[]>([])
    const [ShotsFrom150175, SetShotsFrom150175] = useState<string[]>([])

    useEffect(() => {
        let parstot: number[] = []
        let scorestot: string[] = []
        let approachdistancestot: string[] = []

        for (let i = 0; i < pars.length; i++) {
            parstot = parstot.concat(pars[i])
            scorestot = scorestot.concat(scores[i])
            approachdistancestot = approachdistancestot.concat(approachdistances[i])
        }

        let shotsFrom2550 = countShotsFromForChart(
            parstot,
            scorestot,
            approachdistancestot,
            25,
            49
        )
        let shotsFrom5075 = countShotsFromForChart(
            parstot,
            scorestot,
            approachdistancestot,
            50,
            74
        )
        let shotsFrom75100 = countShotsFromForChart(
            parstot,
            scorestot,
            approachdistancestot,
            75,
            99
        )
        let shotsFrom100125 = countShotsFromForChart(
            parstot,
            scorestot,
            approachdistancestot,
            100,
            124
        )
        let shotsFrom125150 = countShotsFromForChart(
            parstot,
            scorestot,
            approachdistancestot,
            125,
            149
        )
        let shotsFrom150175 = countShotsFromForChart(
            parstot,
            scorestot,
            approachdistancestot,
            150,
            174
        )

        SetShotsFrom2550(shotsFrom2550)
        SetShotsFrom5075(shotsFrom5075)
        SetShotsFrom75100(shotsFrom75100)
        SetShotsFrom100125(shotsFrom100125)
        SetShotsFrom125150(shotsFrom125150)
        SetShotsFrom150175(shotsFrom150175)
       
    }, [pars, scores, approachdistances])

    const countShotsFromForChart = (
        pars: number[],
        scores: string[],
        approachData: string[],
        mindistance: number,
        maxdistance: number
    ): string[] => {
        let resultsArr: string[] = []

        approachData.forEach((value: string, index: number) => {
            if (parseInt(value) <= maxdistance && parseInt(value) >= mindistance) {
                // shots taken to get into hole from a green in regulation try is 3 if par, 4 if bogey and 2 if birdie etc.
                const shotsToHole =
                    parseInt(scores[index]) - pars[index] + 3
                resultsArr.push(shotsToHole.toString())
            }
        })

        return resultsArr
    }

    const styling = useStyles()

    return (
        <Box className={styling.root}>
            <Box className={styling.root}>
                <Box className={styling.row}>
                    <Typography align="center" variant="h4">
                        Scoring By Distance
                    </Typography>
                </Box>
                <Box className={styling.row}>
                    <LineChart
                        dataArray={ShotsFrom2550}
                        title="Shots to Hole (25-50 m)"
                    />
                    <LineChart
                        dataArray={ShotsFrom5075}
                        title="Shots to Hole (50-75 m)"
                    />
                    <LineChart
                        dataArray={ShotsFrom75100}
                        title="Shots to Hole (75 - 100 m)"
                    />
                </Box>
                <Box className={styling.row}>
                    <LineChart
                        dataArray={ShotsFrom100125}
                        title="Shots to Hole  (100 - 125 m)"
                    />
                    <LineChart
                        dataArray={ShotsFrom125150}
                        title="Shots to Hole  (125 - 150 m)"
                    />
                    <LineChart
                        dataArray={ShotsFrom150175}
                        title="Shots to Hole  (150 - 175 m)"
                    />
                </Box>
            </Box>
        </Box>
    )
}

export default Scoring
