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
}))

interface propsData {
    fir: string[][]
    gir: string[][]
    fairwaybunkers: string[][]
    penalties: string[][]
}

const DrivingStats: React.FC<propsData> = ({
    fir,
    gir,
    penalties,
    fairwaybunkers,
}) => {
    const [FIRMissLeft, SetFIRMissLeft] = useState<string[]>([])
    const [FIRHit, SetFIRHit] = useState<string[]>([])
    const [FIRMissRight, SetFIRMissRight] = useState<string[]>([])

    const [GIRNoTryPercentage, SetGIRNoTryPercentage] = useState<string[]>([])

    const [
        FairwayBunkersHitPercentage,
        SetFairwayBunkersHitPercentage,
    ] = useState<string[]>([])
    const [PenaltiesPercentage, SetPenaltiesPercentage] = useState<string[]>([])

    useEffect(() => {
        let fIRtot: string[] = []
        let gIRtot: string[] = []
        let FwBunkerstot: string[] = []
        let penaltiestot: string[] = []

        for (let i = 0; i < fir.length; i++) {
            fIRtot = fIRtot.concat(fir[i])
            gIRtot = gIRtot.concat(gir[i])
            FwBunkerstot = FwBunkerstot.concat(fairwaybunkers[i])
            penaltiestot = penaltiestot.concat(penalties[i])
        }
        countFairwayHitsMisses(fIRtot)
        countGIRHitsMisses(gIRtot)
        SetFairwayBunkersHitPercentage(countLargerthanZero(FwBunkerstot))
        SetPenaltiesPercentage(countLargerthanZero(penaltiestot))
    }, [fir, gir, fairwaybunkers, penalties])

    const countFairwayHitsMisses = (firData: string[]) => {
        let leftmiss: string[] = []
        let hit: string[] = []
        let rightmiss: string[] = []

        let leftCount: number = 0
        let hitCount: number = 0
        let rightCount: number = 0

        //Values are times 100 to get percentage values

        firData.forEach((value: string, index: number) => {
            if (value === 'left') {
                leftCount++
                leftmiss.push(((leftCount * 100) / (index + 1)).toString())
            }
            if (value === 'hit') {
                hitCount++
                hit.push(((hitCount * 100) / (index + 1)).toString())
            }
            if (value === 'right') {
                rightCount++
                rightmiss.push(((rightCount * 100) / (index + 1)).toString())
            }
        })

        SetFIRMissLeft(leftmiss)
        SetFIRHit(hit)
        SetFIRMissRight(rightmiss)
    }

    const countLargerthanZero = (Data: string[]) => {
        let dataArr: string[] = []

        let hitCount: number = 0

        Data.forEach((value: string, index: number) => {
            if (value > '0') {
                hitCount++
                dataArr.push(((hitCount * 100) / (index + 1)).toString())
            }
        })

        return dataArr
    }

    const countGIRHitsMisses = (girData: string[]) => {
        //Counts the amount of greens hit in regulation from fairway and out of it

        let girNoTry: string[] = []

        let girNoneCount: number = 0

        girData.forEach((value: string, index: number) => {
            if (value === 'NONE') {
                girNoneCount++
                girNoTry.push(((girNoneCount * 100) / (index + 1)).toString())
            }
        })

        SetGIRNoTryPercentage(girNoTry)
    }

    const styling = useStyles()

    return (
        <Box className={styling.root}>
            <Box className={styling.root}>
                <Typography align="center" variant="h4">
                    Driving Accuracy % (moving average)
                </Typography>

                <Box className={styling.row}>
                    <LineChart
                        dataArray={FIRMissLeft}
                        title="Miss left %"
                        average={true}
                        fitData={true}
                        digits={2}
                        last={15}
                    />
                    <LineChart
                        dataArray={FIRHit}
                        title="Hit %"
                        average={true}
                        fitData={true}
                        digits={2}
                        last={15}
                    />
                    <LineChart
                        dataArray={FIRMissRight}
                        title="Miss right %"
                        average={true}
                        fitData={true}
                        digits={2}
                        last={15}
                    />
                </Box>
            </Box>
            <Box className={styling.root}>
                <Typography align="center" variant="h4">
                    Driving Misses % (moving average)
                </Typography>

                <Box className={styling.row}>
                    <LineChart
                        dataArray={PenaltiesPercentage}
                        title="Penalties %"
                        average={true}
                        fitData={true}
                        digits={2}
                        last={15}
                    />
                    <LineChart
                        dataArray={GIRNoTryPercentage}
                        title="No GIR try %"
                        average={true}
                        fitData={true}
                        digits={2}
                        last={15}
                    />
                    <LineChart
                        dataArray={FairwayBunkersHitPercentage}
                        title="Fairway bunker hit %"
                        average={true}
                        fitData={true}
                        digits={2}
                        last={15}
                    />
                </Box>
            </Box>
        </Box>
    )
}

export default DrivingStats
