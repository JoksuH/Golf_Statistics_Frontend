import React, { useState, useEffect } from 'react'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import LineChart from './../LineChart'
import BarChart from './../BarChart'
import { sumScores, hitCounter } from './../../../Utils/Helpers'
import ToggleButton from '@material-ui/lab/ToggleButton'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'

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
    holescores: string[][]
    fir: string[][]
    gir: string[][]
    approachdistances: string[][]
}

interface GIRmissesData {
    [key: string]: number | string
}

const ApproachesStats: React.FC<propsData> = ({
    pars,
    holescores,
    fir,
    gir,
    approachdistances,
}) => {
    const [Scores, SetScores] = useState<string[]>([])
    const [Pars, SetPars] = useState<number[]>([])
    const [FIR, SetFIR] = useState<string[]>([])
    const [FIRMissLeft, SetFIRMissLeft] = useState<string[]>([])
    const [FIRHit, SetFIRHit] = useState<string[]>([])
    const [FIRMissRight, SetFIRMissRight] = useState<string[]>([])

    const [GIR, SetGIR] = useState<string[]>([])
    const [GIRMissesAllDirections, SetGIRMissesAllDirections] = useState<
        GIRmissesData[]
    >([])
    const [GirMissDirections, SetGirMissDirections] = useState<GIRmissesData[]>(
        []
    )
    const [GirMissLength, SetGirMissLength] = useState<GIRmissesData[]>([])

    const [ApproachDistances, SetApproachDistances] = useState<string[]>([])
    const [ToggleValue, SetToggleValue] = useState<string>('1000')

    useEffect(() => {
        let parstot: number[] = []
        let holescorestot: string[] = []
        let approachdistancestot: string[] = []
        let fIRtot: string[] = []
        let gIRtot: string[] = []
        let FwBunkerstot: string[] = []
        let penaltiestot: string[] = []

        for (let i = 0; i < holescores.length; i++) {
            parstot = parstot.concat(pars[i])
            holescorestot = holescorestot.concat(holescores[i])
            approachdistancestot = approachdistancestot.concat(
                approachdistances[i]
            )
            fIRtot = fIRtot.concat(fir[i])
            gIRtot = gIRtot.concat(gir[i])
        }
        SetPars(parstot)
        SetScores(holescorestot)
        SetFIR(fIRtot)
        SetGIR(gIRtot)
        SetApproachDistances(approachdistancestot)
        countGirMissDirectionsForBarChart(gIRtot)
    }, [pars, holescores, approachdistances, fir, gir, ToggleValue])

    const countGirMissDirectionsForBarChart = (girData: string[]) => {
        let hitCount: number = 0

        let leftCount: number = 0
        let rightCount: number = 0
        let correctDirectionCount: number = 0

        let longLeftCount: number = 0
        let longCount: number = 0
        let longRightCount: number = 0

        let correctLengthCount: number = 0

        let shortLeftCount: number = 0
        let shortCount: number = 0
        let shortRightCount: number = 0

        let leftTotal: number = 0
        let rightTotal: number = 0
        let longTotal: number = 0
        let shortTotal: number = 0

        let selectedGirData: string[] = []
        let dataLength: number = 0

        //Selections choosing the latest x rounds
        if (ToggleValue === '10' && girData.length > 10 * 18) {
            selectedGirData = girData.slice(
                girData.length - 10 * 18,
                girData.length
            )
            dataLength = 10 * 18
        } else if (ToggleValue === '5' && girData.length > 5 * 18) {
            selectedGirData = girData.slice(
                girData.length - 5 * 18,
                girData.length
            )
            dataLength = 5 * 18
        } else {
            selectedGirData = girData
            dataLength = girData.length
        }

        selectedGirData.forEach((value: string) => {
            switch (value) {
                //If gir try was not valid, shorten the data length to compensate
                case 'NONE':
                    dataLength--
                    break
                case 'left':
                    leftCount++
                    leftTotal++
                    correctLengthCount++
                    break
                case 'right':
                    rightCount++
                    rightTotal++
                    correctLengthCount++
                    break
                case 'hit':
                    hitCount++
                    correctDirectionCount++
                    correctLengthCount++
                    break
                case 'left short':
                    shortLeftCount++
                    leftTotal++
                    shortTotal++
                    break
                case 'short':
                    shortCount++
                    correctDirectionCount++
                    shortTotal++
                    break
                case 'right short':
                    shortRightCount++
                    rightTotal++
                    shortTotal++
                    break
                case 'left long':
                    longLeftCount++
                    leftTotal++
                    longTotal++
                    break
                case 'long':
                    longCount++
                    correctDirectionCount++
                    longTotal++
                    break
                case 'right long':
                    longRightCount++
                    longTotal++
                    rightTotal++
                    break
            }
        })

        console.log(dataLength)
        const readyFormattedAllData = [
            { direction: 'left', value: (leftCount / dataLength) * 100 },
            { direction: 'right', value: (rightCount / dataLength) * 100 },
            { direction: 'hit', value: (hitCount / dataLength) * 100 },
            {
                direction: 'left long',
                value: (longLeftCount / dataLength) * 100,
            },
            { direction: 'long', value: (longCount / dataLength) * 100 },
            {
                direction: 'right long',
                value: (longRightCount / dataLength) * 100,
            },
            {
                direction: 'left short',
                value: (shortLeftCount / dataLength) * 100,
            },
            { direction: 'short', value: (shortCount / dataLength) * 100 },
            {
                direction: 'right short',
                value: (shortRightCount / dataLength) * 100,
            },
        ]

        console.log(readyFormattedAllData)
        const missDirectionData = [
            { direction: 'Left', value: (leftTotal / dataLength) * 100 },
            { direction: 'Correct', value: (correctDirectionCount / dataLength) * 100 },
            { direction: 'Right', value: (rightTotal / dataLength) * 100 },
        ]
        const missLengthData = [
            { direction: 'Long', value: (longTotal / dataLength) * 100 },
            { direction: 'Correct', value: (correctLengthCount / dataLength) * 100 },
            { direction: 'Short', value: (shortTotal / dataLength) * 100 },
        ]

        SetGIRMissesAllDirections(readyFormattedAllData)
        SetGirMissDirections(missDirectionData)
        SetGirMissLength(missLengthData)
    }

    const countGIRHitsMisses = (firData: string[], girData: string[]) => {
        //Counts the amount of greens hit in regulation from fairway and out of it

        let girTotal: string[] = []
        let girFairway: string[] = []
        let girNoFairway: string[] = []

        let girTotCount: number = 0
        let girFairCount: number = 0
        let girnoFWCount: number = 0

        let girFWtries: number = 0
        let girNoFWtries: number = 0

        girData.forEach((value: string, index: number) => {
            if (value === 'hit' && firData[index] === 'hit') {
                girTotCount++
                girFairCount++
                girFWtries++
                girTotal.push((girTotCount / (index + 1)).toString())
                girFairway.push((girFairCount / girFWtries).toString())
            } else if (value === 'hit' && firData[index] !== 'hit') {
                girTotCount++
                girnoFWCount++
                girNoFWtries++
                girTotal.push((girTotCount / (index + 1)).toString())
                girNoFairway.push((girnoFWCount / girNoFWtries).toString())
            } else if (value !== 'hit' && firData[index] !== 'hit') {
                girNoFWtries++
            } else if (value !== 'hit' && firData[index] === 'hit') {
                girFWtries++
            }
        })
    }
    const styling = useStyles()

    return (
        <Box className={styling.root}>
            <Box className={styling.root}>
                <Box className={styling.row}>
                    <Typography align="center" variant="h4">
                        Gir Approach Misses
                    </Typography>
                    <ToggleButtonGroup
                        className={styling.toggle}
                        value={ToggleValue}
                        exclusive
                        onChange={(
                            event: React.MouseEvent<HTMLElement, MouseEvent>,
                            value: string
                        ) => SetToggleValue(value)}
                        aria-label="teebox selection"
                    >
                        <ToggleButton value="1000" aria-label="all teeboxes">
                            <Typography className={styling.toggletext}>
                                All Rounds
                            </Typography>
                        </ToggleButton>
                        <ToggleButton value="10" aria-label="yellow teebox">
                            <Typography className={styling.toggletext}>
                                Last 10
                            </Typography>
                        </ToggleButton>
                        <ToggleButton value="5" aria-label="white teebox">
                            <Typography className={styling.toggletext}>
                                Last 5
                            </Typography>
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Box>
                <Box className={styling.row}>
                    <BarChart
                        data={GirMissDirections}
                        title="Left or Right?"
                        width={400}
                    />
                    <BarChart
                        data={GirMissLength}
                        title="Long or Short?"
                        width={400}
                    />
                </Box>
            </Box>
            <Box className={styling.root}>
                <Box className={styling.root}>
                    <Typography align="center" variant="h4">
                        Gir Approach Misses (all directions)
                    </Typography>

                    <Box className={styling.row}>
                        <BarChart
                            data={GIRMissesAllDirections}
                            title="Approach Direction %"
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default ApproachesStats
