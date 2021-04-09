import React, { useState, useEffect } from 'react'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import BarChart from './../BarChart'
import ToggleButton from '@material-ui/lab/ToggleButton'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
        width: '100%',
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
    toggle: {
        margin: '0 25px 0 25px',
    },
    toggletext: {
        fontSize: '17px',
        color: 'black',
    },
}))

interface propsData {
    gir: string[][]
    approachdistances: string[][]
}

interface GIRmissesData {
    [key: string]: number | string
}

interface GirMissesArrData {
    [key: string]: number | string
}

const ApproachesbyDistanceStats: React.FC<propsData> = ({
    gir,
    approachdistances,
}) => {
    const [GirMissDirections2550, SetGirMissDirections2550] = useState<
        GirMissesArrData[]
    >([])
    const [GirMissLength2550, SetGirMissLength2550] = useState<GirMissesArrData[]>(
        []
    )
    const [GirMissDirections5075, SetGirMissDirections5075] = useState<
        GIRmissesData[]
    >([])
    const [GirMissLength5075, SetGirMissLength5075] = useState<GIRmissesData[]>([])
    const [GirMissDirections75100, SetGirMissDirections75100] = useState<
        GIRmissesData[]
    >([])
    const [GirMissLength75100, SetGirMissLength75100] = useState<GIRmissesData[]>([])
    const [GirMissDirections100125, SetGirMissDirections100125] = useState<
        GIRmissesData[]
    >([])
    const [GirMissLength100125, SetGirMissLength100125] = useState<GIRmissesData[]>(
        []
    )
    const [GirMissDirections125150, SetGirMissDirections125150] = useState<
        GIRmissesData[]
    >([])
    const [GirMissLength125150, SetGirMissLength125150] = useState<GIRmissesData[]>(
        []
    )
    const [GirMissDirections150175, SetGirMissDirections150175] = useState<
        GIRmissesData[]
    >([])
    const [GirMissLength150175, SetGirMissLength150175] = useState<GIRmissesData[]>(
        []
    )

    const [ToggleValue, SetToggleValue] = useState<string>('1000')

    useEffect(() => {
        let gIRtot: string[] = []
        let approachdistancestot: string[] = []

        for (let i = 0; i < gir.length; i++) {
            gIRtot = gIRtot.concat(gir[i])
            approachdistancestot = approachdistancestot.concat(approachdistances[i])
        }

        let girmisses2550 = countGirMissDirectionsForChart(
            gIRtot,
            approachdistancestot,
            25,
            49
        )
        let girmisses5075 = countGirMissDirectionsForChart(
            gIRtot,
            approachdistancestot,
            50,
            74
        )
        let girmisses75100 = countGirMissDirectionsForChart(
            gIRtot,
            approachdistancestot,
            75,
            99
        )
        let girmisses100125 = countGirMissDirectionsForChart(
            gIRtot,
            approachdistancestot,
            100,
            124
        )
        let girmisses125150 = countGirMissDirectionsForChart(
            gIRtot,
            approachdistancestot,
            125,
            149
        )
        let girmisses150175 = countGirMissDirectionsForChart(
            gIRtot,
            approachdistancestot,
            150,
            174
        )

        SetGirMissDirections2550(girmisses2550[0])
        SetGirMissLength2550(girmisses2550[1])
        SetGirMissDirections5075(girmisses5075[0])
        SetGirMissLength5075(girmisses5075[1])
        SetGirMissDirections75100(girmisses75100[0])
        SetGirMissLength75100(girmisses75100[1])
        SetGirMissDirections100125(girmisses100125[0])
        SetGirMissLength100125(girmisses100125[1])
        SetGirMissDirections125150(girmisses125150[0])
        SetGirMissLength125150(girmisses125150[1])
        SetGirMissDirections150175(girmisses150175[0])
        SetGirMissLength150175(girmisses150175[1])
    }, [ToggleValue, gir, approachdistances])

    const countGirMissDirectionsForChart = (
        girData: string[],
        approachData: string[],
        mindistance: number,
        maxdistance: number
    ): GirMissesArrData[][] => {
        let leftCount: number = 0
        let rightCount: number = 0
        let correctDirectionCount: number = 0
        let longCount: number = 0
        let correctLengthCount: number = 0
        let shortCount: number = 0

        let selectedGirData: string[] = []
        let selectedApproachData: string[] = []

        let validDistanceCounter: number = 0

        //Selections choosing the latest x rounds
        if (ToggleValue === '10' && girData.length > 10 * 18) {
            selectedGirData = girData.slice(girData.length - 10 * 18, girData.length)
            selectedApproachData = approachData.slice(
                approachData.length - 10 * 18,
                approachData.length
            )
        } else if (ToggleValue === '5' && girData.length > 5 * 18) {
            selectedGirData = girData.slice(girData.length - 5 * 18, girData.length)
            selectedApproachData = approachData.slice(
                approachData.length - 5 * 18,
                approachData.length
            )
        } else {
            selectedGirData = girData
            selectedApproachData = approachData
        }

        selectedGirData.forEach((value: string, index: number) => {
            switch (value) {
                //If gir try was not valid, shorten the data length to compensate
                case 'NONE':
                    break
                case 'left':
                    if (
                        parseInt(selectedApproachData[index]) <= maxdistance &&
                        parseInt(selectedApproachData[index]) >= mindistance
                    ) {
                        validDistanceCounter++
                        correctLengthCount++
                        leftCount++
                    }
                    break
                case 'right':
                    if (
                        parseInt(selectedApproachData[index]) <= maxdistance &&
                        parseInt(selectedApproachData[index]) >= mindistance
                    ) {
                        validDistanceCounter++
                        correctLengthCount++
                        rightCount++
                    }
                    break
                case 'hit':
                    if (
                        parseInt(selectedApproachData[index]) <= maxdistance &&
                        parseInt(selectedApproachData[index]) >= mindistance
                    ) {
                        validDistanceCounter++
                        correctLengthCount++
                        correctDirectionCount++
                    }
                    break
                case 'left short':
                    if (
                        parseInt(selectedApproachData[index]) <= maxdistance &&
                        parseInt(selectedApproachData[index]) >= mindistance
                    ) {
                        validDistanceCounter++
                        leftCount++
                        shortCount++
                    }
                    break
                case 'short':
                    if (
                        parseInt(selectedApproachData[index]) <= maxdistance &&
                        parseInt(selectedApproachData[index]) >= mindistance
                    ) {
                        validDistanceCounter++
                        shortCount++
                        correctDirectionCount++
                    }
                    break
                case 'right short':
                    if (
                        parseInt(selectedApproachData[index]) <= maxdistance &&
                        parseInt(selectedApproachData[index]) >= mindistance
                    ) {
                        validDistanceCounter++
                        rightCount++
                        shortCount++
                    }
                    break
                case 'left long':
                    if (
                        parseInt(selectedApproachData[index]) <= maxdistance &&
                        parseInt(selectedApproachData[index]) >= mindistance
                    ) {
                        validDistanceCounter++
                        leftCount++
                        longCount++
                    }
                    break
                case 'long':
                    if (
                        parseInt(selectedApproachData[index]) <= maxdistance &&
                        parseInt(selectedApproachData[index]) >= mindistance
                    ) {
                        validDistanceCounter++
                        longCount++
                        correctDirectionCount++
                    }
                    break
                case 'right long':
                    if (
                        parseInt(selectedApproachData[index]) <= maxdistance &&
                        parseInt(selectedApproachData[index]) >= mindistance
                    ) {
                        validDistanceCounter++
                        rightCount++
                        longCount++
                    }
                    break
            }
        })

        const missDirectionData = [
            { direction: 'Left', value: (leftCount / validDistanceCounter) * 100 },
            {
                direction: 'Correct',
                value: (correctDirectionCount / validDistanceCounter) * 100,
            },
            { direction: 'Right', value: (rightCount / validDistanceCounter) * 100 },
        ]
        const missLengthData = [
            { direction: 'Long', value: (longCount / validDistanceCounter) * 100 },
            {
                direction: 'Correct',
                value: (correctLengthCount / validDistanceCounter) * 100,
            },
            { direction: 'Short', value: (shortCount / validDistanceCounter) * 100 },
        ]

        return [missDirectionData, missLengthData]
    }

    const styling = useStyles()

    return (
        <Box className={styling.root}>
            <Box className={styling.root}>
            <Box className={window.innerWidth > 1200 ? styling.row : styling.column}>
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
                        aria-label="teebox selection">
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
                <Box className={window.innerWidth > 1200 ? styling.row : styling.column}>
                    <BarChart
                        data={GirMissDirections2550}
                        title="Left or Right? (25-50 m)"
                        width={400}
                    />
                    <BarChart
                        data={GirMissLength2550}
                        title="Long or Short?  (25-50 m)"
                        width={400}
                    />
                    <BarChart
                        data={GirMissDirections5075}
                        title="Left or Right? (50-75 m)"
                        width={400}
                    />
                    <BarChart
                        data={GirMissLength5075}
                        title="Long or Short?  (50-75 m)"
                        width={400}
                    />
                    <BarChart
                        data={GirMissDirections75100}
                        title="Left or Right? (75 - 100 m)"
                        width={400}
                    />
                    <BarChart
                        data={GirMissLength75100}
                        title="Long or Short?   (75 - 100 m)"
                        width={400}
                    />
                </Box>
                <Box className={window.innerWidth > 1200 ? styling.row : styling.column}>
                    <BarChart
                        data={GirMissDirections100125}
                        title="Left or Right?  (100 - 125 m)"
                        width={400}
                    />
                    <BarChart
                        data={GirMissLength100125}
                        title="Long or Short?   (100 - 125 m)"
                        width={400}
                    />
                    <BarChart
                        data={GirMissDirections125150}
                        title="Left or Right?  (125 - 150 m)"
                        width={400}
                    />
                    <BarChart
                        data={GirMissLength125150}
                        title="Long or Short?   (125 - 150 m)"
                        width={400}
                    />
                    <BarChart
                        data={GirMissDirections150175}
                        title="Left or Right?  (150 - 175 m)"
                        width={400}
                    />
                    <BarChart
                        data={GirMissLength150175}
                        title="Long or Short?   (150 - 175 m)"
                        width={400}
                    />
                </Box>
            </Box>
        </Box>
    )
}

export default ApproachesbyDistanceStats
