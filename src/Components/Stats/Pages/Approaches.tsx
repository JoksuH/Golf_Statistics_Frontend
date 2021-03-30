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
        backgroundColor: 'hsl(107, 100%, 87%)'
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
    fir: string[][]
    gir: string[][]
    approachdistances: string[][]
    fairwaybunkers: string[][]
    penalties: string[][]
}



const ApproachesStats: React.FC<propsData> = ({ pars,
    holescores,
    fir,
    gir,
    approachdistances,
    penalties,
fairwaybunkers}) => {

    const [Scores, SetScores] = useState<string[]>([])
    const [Pars, SetPars] = useState<string[]>([])
    const [FIR, SetFIR] = useState<string[]>([])
    const [FIRMissLeft, SetFIRMissLeft] = useState<string[]>([])
    const [FIRHit, SetFIRHit] = useState<string[]>([])
    const [FIRMissRight, SetFIRMissRight] = useState<string[]>([])

    const [GIR, SetGIR] = useState<string[]>([])
    const [GIRHitPercentage, SetGIRHitPercentage] = useState<string[]>([])
    const [GIRHitPercentageFW, SetGIRHitPercentageFW] = useState<string[]>([])
    const [GIRHitPercentageOutFW, SetGIRHitPercentageOutFW] = useState<string[]>([])

    const [ApproachDistances, SetApproachDistances] = useState<string[]>([])
    const [FairwayBunkers, SetFairwayBunkers] = useState<string[]>([])
    const [Penalties, SetPenalties] = useState<string[]>([])




    useEffect(() => {
        let parstot: string[] = []
        let holescorestot: string[] = []
        let approachdistancestot: string[] = []
        let fIRtot: string[] = []
        let gIRtot: string[] = []
        let FwBunkerstot: string[] = []
        let penaltiestot: string[] = []


        for (let i = 0; i < holescores.length; i++) {
            parstot = parstot.concat(pars[i])
            holescorestot = holescorestot.concat(holescores[i])
            approachdistancestot = approachdistancestot.concat(approachdistances[i])
            fIRtot = fIRtot.concat(fir[i])            
            gIRtot = gIRtot.concat(gir[i])
            FwBunkerstot = FwBunkerstot.concat(fairwaybunkers[i])
            penaltiestot = penaltiestot.concat(penalties[i])

        }
        SetPars(parstot)
        SetScores(holescorestot)
        SetFIR(fIRtot)
        SetGIR(gIRtot)
        SetApproachDistances(approachdistancestot)
        SetFairwayBunkers(FwBunkerstot)
        SetPenalties(penaltiestot)
        countFairwayHitsMisses(fIRtot)
        countGIRHitsMisses(fIRtot, gIRtot)

    }, [pars, holescores, approachdistances, fir, gir, fairwaybunkers])

    const countFairwayHitsMisses = (firData: string[]) => {

        let leftmiss: string[] = []
        let hit: string[] = []
        let rightmiss: string[] = []

        let leftCount: number = 0
        let hitCount: number = 0
        let rightCount: number = 0

        firData.forEach((value: string, index: number) => {
            if (value === "left") {
                leftCount++
                leftmiss.push((leftCount/(index+1)).toString())
            }
            if (value === "hit") {
                hitCount++
                hit.push((hitCount/(index+1)).toString())
            }
            if (value === "right") {
                rightCount++
                rightmiss.push((rightCount/(index+1)).toString())
            }

        })

        SetFIRMissLeft(leftmiss)
        SetFIRHit(hit)
        SetFIRMissRight(rightmiss)

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
            if (value === "hit" && firData[index] === "hit") {
                girTotCount++
                girFairCount++
                girFWtries++
                girTotal.push((girTotCount/(index+1)).toString())
                girFairway.push((girFairCount/girFWtries).toString())
            }
            else if (value === "hit" && firData[index] !== "hit") {
                girTotCount++
                girnoFWCount++
                girNoFWtries++
                girTotal.push((girTotCount/(index+1)).toString())
                girNoFairway.push((girnoFWCount/girNoFWtries).toString())
            }
            else if (value !== "hit" && firData[index] !== "hit") {
                girNoFWtries++
            }
            else if (value !== "hit" && firData[index] === "hit") {
                girFWtries++
            }

        })

        SetGIRHitPercentage(girTotal)
        SetGIRHitPercentageFW(girFairway)
        SetGIRHitPercentageOutFW(girNoFairway)


    }
    const styling = useStyles()

    return (
        <Box className={styling.root}>
            <Box className={styling.root}>

            <Typography align="center" variant="h4">Fairway Driving (moving average)</Typography>            
            
            <Box className={styling.row}>
            <LineChart dataArray = {FIRMissLeft} title="Miss left" average={true} fitData={true} digits={2} last={15}/>
            <LineChart dataArray = {FIRHit} title="Hit" average={true} fitData={true} digits={2} last={15} />
            <LineChart dataArray = {FIRMissRight} title="Miss right" average={true} fitData={true} digits={2}last={15} />

            </Box>
            </Box>
            <Box className={styling.root}>

            <Typography align="center" variant="h4">Green in Regulation % (moving average)</Typography>            

            <Box className={styling.row}>
            <LineChart dataArray = {GIRHitPercentage} title="GIR Total" average={true} fitData={true} digits={2} last={15}/>
            <LineChart dataArray = {GIRHitPercentageFW} title="GIR from fairway" average={true} fitData={true} digits={2} last={15} />
            <LineChart dataArray = {GIRHitPercentageOutFW} title="GIR not fairway" average={true} fitData={true} digits={2}last={15} />

</Box>
</Box>


          
        </Box>
    )
}

export default ApproachesStats