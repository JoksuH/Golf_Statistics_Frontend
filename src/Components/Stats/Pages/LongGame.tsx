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
    column: {
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
    },
}))

interface propsData {
    pars: number[]
    holescores: string[][]
    fir: string[][]
    gir: string[][]
    approachdistances: string[][]
    fairwaybunkers: string[][]
    penalties: string[][]
}



const LongGameStats: React.FC<propsData> = ({ pars,
    holescores,
    fir,
    gir,
    approachdistances,
    penalties,
fairwaybunkers}) => {

    const [Scores, SetScores] = useState<string[]>([])
    const [Pars, SetPars] = useState<number[]>([])
    const [FIR, SetFIR] = useState<string[]>([])
    const [FIRMissLeft, SetFIRMissLeft] = useState<string[]>([])
    const [FIRHit, SetFIRHit] = useState<string[]>([])
    const [FIRMissRight, SetFIRMissRight] = useState<string[]>([])

    const [GIR, SetGIR] = useState<string[]>([])
    const [GIRNoTryPercentage, SetGIRNoTryPercentage] = useState<string[]>([])
    const [GIRHitPercentage, SetGIRHitPercentage] = useState<string[]>([])
    const [GIRHitPercentageFW, SetGIRHitPercentageFW] = useState<string[]>([])
    const [GIRHitPercentageOutFW, SetGIRHitPercentageOutFW] = useState<string[]>([])

    const [GIRHitPercentagePar3, SetGIRHitPercentagePar3] = useState<string[]>([])
    const [GIRHitPercentagePar4, SetGIRHitPercentagePar4] = useState<string[]>([])
    const [GIRHitPercentagePar5, SetGIRHitPercentagePar5] = useState<string[]>([])


    const [ApproachDistances, SetApproachDistances] = useState<string[]>([])
    const [FairwayBunkers, SetFairwayBunkers] = useState<string[]>([])
    const [FairwayBunkersHitPercentage, SetFairwayBunkersHitPercentage] = useState<string[]>([])
    const [Penalties, SetPenalties] = useState<string[]>([])
    const [PenaltiesPercentage, SetPenaltiesPercentage] = useState<string[]>([])





    useEffect(() => {
        let parstot: number[] = pars
        let holescorestot: string[] = []
        let approachdistancestot: string[] = []
        let fIRtot: string[] = []
        let gIRtot: string[] = []
        let FwBunkerstot: string[] = []
        let penaltiestot: string[] = []


        for (let i = 0; i < holescores.length; i++) {
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
        countGIRHitsPars(parstot, gIRtot)
        SetFairwayBunkersHitPercentage(countLargerthanZero(FwBunkerstot))
        SetPenaltiesPercentage(countLargerthanZero(penaltiestot))

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

    const countLargerthanZero = (Data: string[]) => {

        let dataArr: string[] = []

        let hitCount: number = 0

        Data.forEach((value: string, index: number) => {
            if (value > "0") {
                hitCount++
                dataArr.push((hitCount/(index+1)).toString())
            }

        })

        return dataArr

    }
    
    const countGIRHitsMisses = (firData: string[], girData: string[]) => {

        //Counts the amount of greens hit in regulation from fairway and out of it

        let girTotal: string[] = []
        let girFairway: string[] = []
        let girNoFairway: string[] = []
        let girNoTry : string[] = []

        let girTotCount: number = 0
        let girNoneCount: number = 0
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
            else if (value === "NONE") {
                girNoneCount++
                girNoTry.push((girNoneCount/(index+1)).toString())

            }
            else if (value !== "hit"  && firData[index] !== "hit") {
                girNoFWtries++
            }
            else if (value !== "hit" && firData[index] === "hit") {
                girFWtries++
            }

        })

        SetGIRHitPercentage(girTotal)
        SetGIRHitPercentageFW(girFairway)
        SetGIRHitPercentageOutFW(girNoFairway)
        SetGIRNoTryPercentage(girNoTry)


    }

    const countGIRHitsPars = (parsData: number[], girData: string[]) => {

        let par3hit: string[] = []
        let par4hit: string[] = []
        let par5hit: string[] = []

        let par3HitCount: number = 0
        let par4HitCount: number = 0
        let par5HitCount: number = 0

        let girPar3triesCount: number = 0
        let girPar4triesCount: number = 0
        let girPar5triesCount: number = 0

        console.log(parsData)

        girData.forEach((value: string, index: number) => {
            if (value === "hit" && parsData[index] === 3) {
                console.log("here")
                par3HitCount++
                girPar3triesCount++
                par3hit.push((par3HitCount/(girPar3triesCount)).toString())
            }
            else if (value === "hit" && parsData[index] === 4) {
                par4HitCount++
                girPar4triesCount++
                par4hit.push((par4HitCount/(girPar4triesCount)).toString())
            }
            else if (value === "hit" && parsData[index] === 5)  {
                par5HitCount++
                girPar5triesCount++
                par5hit.push((par5HitCount/(girPar5triesCount)).toString())     
            }
            else if (value !== "hit") {
            if (parsData[index] === 3)    girPar3triesCount++      
            if (parsData[index] === 4)    girPar4triesCount++        
            if (parsData[index] === 5)    girPar5triesCount++        
}

        })

        SetGIRHitPercentagePar3(par3hit)
        SetGIRHitPercentagePar4(par4hit)
        SetGIRHitPercentagePar5(par5hit)


    }

    const styling = useStyles()

    return (
        <Box className={styling.root}>
            <Box className={styling.root}>

            <Typography align="center" variant="h4">Fairway Driving (moving average)</Typography>            
            
            <Box className={window.innerWidth > 1200 ? styling.row : styling.column}>
            <LineChart dataArray = {FIRMissLeft} title="Miss left %" average={true} fitData={true} digits={2} last={15}/>
            <LineChart dataArray = {FIRHit} title="Hit %" average={true} fitData={true} digits={2} last={15} />
            <LineChart dataArray = {FIRMissRight} title="Miss right %" average={true} fitData={true} digits={2}last={15} />

            </Box>
            </Box>
            <Box className={styling.root}>

                <Typography align="center" variant="h4">Driving Misses (moving average)</Typography>            

                <Box className={window.innerWidth > 1200 ? styling.row : styling.column}>
                <LineChart dataArray = {PenaltiesPercentage} title="Penalties %" average={true} fitData={true} digits={2} last={15}/>
                <LineChart dataArray = {GIRNoTryPercentage} title="No GIR try %" average={true} fitData={true} digits={2} last={15} />
                <LineChart dataArray = {FairwayBunkersHitPercentage} title="Fairway bunker hit %" average={true} fitData={true} digits={2}last={15} />

                </Box>
                </Box>
            <Box className={styling.root}>

            <Typography align="center" variant="h4">Green in Regulation % (moving average)</Typography>            

            <Box className={window.innerWidth > 1200 ? styling.row : styling.column}>
            <LineChart dataArray = {GIRHitPercentage} title="GIR Total %" average={true} fitData={true} digits={2} last={15}/>
            <LineChart dataArray = {GIRHitPercentageFW} title="GIR from fairway %" average={true} fitData={true} digits={2} last={15} />
            <LineChart dataArray = {GIRHitPercentageOutFW} title="GIR not fairway %"  average={true} fitData={true} digits={2}last={15} />

</Box>
</Box>
<Box className={styling.root}>

            <Typography align="center" variant="h4">Green in Regulation % per Par (moving average)</Typography>            

            <Box className={window.innerWidth > 1200 ? styling.row : styling.column}>
            <LineChart dataArray = {GIRHitPercentagePar3} title="Par 3" average={true} fitData={true} digits={2} last={15}/>
            <LineChart dataArray = {GIRHitPercentagePar4} title="Par 4" average={true} fitData={true} digits={2} last={15} />
            <LineChart dataArray = {GIRHitPercentagePar5} title="Par 5" average={true} fitData={true} digits={2} last={15} />

            </Box>
            </Box>



          
        </Box>
    )
}

export default LongGameStats