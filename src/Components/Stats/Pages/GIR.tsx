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
    marginTop: '20px',
    padding: '20px 20px 20px 20px',
    borderRadius: '7px',
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
}))

interface propsData {
  pars: number[]
  fir: string[][]
  gir: string[][]
}

const GIRStats: React.FC<propsData> = ({ pars, fir, gir }) => {
  const [GIRHitPercentage, SetGIRHitPercentage] = useState<string[]>([])
  const [GIRHitPercentageFW, SetGIRHitPercentageFW] = useState<string[]>([])
  const [GIRHitPercentageOutFW, SetGIRHitPercentageOutFW] = useState<string[]>([])

  const [GIRHitPercentagePar3, SetGIRHitPercentagePar3] = useState<string[]>([])
  const [GIRHitPercentagePar4, SetGIRHitPercentagePar4] = useState<string[]>([])
  const [GIRHitPercentagePar5, SetGIRHitPercentagePar5] = useState<string[]>([])

  useEffect(() => {
    let parstot: number[] = pars
    let fIRtot: string[] = []
    let gIRtot: string[] = []

    for (let i = 0; i < fir.length; i++) {
      fIRtot = fIRtot.concat(fir[i])
      gIRtot = gIRtot.concat(gir[i])
    }

    countGIRHitsMisses(fIRtot, gIRtot)
    countGIRHitsPars(parstot, gIRtot)
  }, [pars, fir, gir])

  const countGIRHitsMisses = (firData: string[], girData: string[]) => {
    //Counts the amount of greens hit in regulation from fairway and out of it

    let girTotal: string[] = []
    let girFairway: string[] = []
    let girNoFairway: string[] = []

    let girTotCount: number = 0
    let girNoneCount: number = 0
    let girFairCount: number = 0
    let girnoFWCount: number = 0

    let girFWtries: number = 0
    let girNoFWtries: number = 0

    girData.forEach((value: string, index: number) => {
      if (value === 'hit' && firData[index] === 'hit') {
        girTotCount++
        girFairCount++
        girFWtries++
        // Remove not valid tries from index
        girTotal.push(((girTotCount * 100) / (index + 1 - girNoneCount)).toString())
        girFairway.push(((girFairCount * 100) / girFWtries).toString())
      } else if (value === 'hit' && firData[index] !== 'hit') {
        girTotCount++
        girnoFWCount++
        girNoFWtries++
        girTotal.push(((girTotCount * 100) / (index + 1 - girNoneCount)).toString())
        girNoFairway.push(((girnoFWCount * 100) / girNoFWtries).toString())
      } else if (value === 'NONE') {
        girNoneCount++
      } else if (value !== 'hit' && firData[index] !== 'hit') {
        girNoFWtries++
      } else if (value !== 'hit' && firData[index] === 'hit') {
        girFWtries++
      }
    })

    SetGIRHitPercentage(girTotal)
    SetGIRHitPercentageFW(girFairway)
    SetGIRHitPercentageOutFW(girNoFairway)
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

    girData.forEach((value: string, index: number) => {
      if (value === 'hit' && parsData[index] === 3) {
        par3HitCount++
        girPar3triesCount++
        par3hit.push(((par3HitCount * 100) / girPar3triesCount).toString())
      } else if (value === 'hit' && parsData[index] === 4) {
        par4HitCount++
        girPar4triesCount++
        par4hit.push(((par4HitCount * 100) / girPar4triesCount).toString())
      } else if (value === 'hit' && parsData[index] === 5) {
        par5HitCount++
        girPar5triesCount++
        par5hit.push(((par5HitCount * 100) / girPar5triesCount).toString())
      } else if (value !== 'hit') {
        if (parsData[index] === 3) girPar3triesCount++
        if (parsData[index] === 4) girPar4triesCount++
        if (parsData[index] === 5) girPar5triesCount++
      }
    })

    SetGIRHitPercentagePar3(par3hit)
    SetGIRHitPercentagePar4(par4hit)
    SetGIRHitPercentagePar5(par5hit)
  }

  const styling = useStyles()

  return (
    <Box className={styling.root}>
        <Typography align="center" variant="h4">
          Green in Regulation % (moving average)
        </Typography>

        <Box className={window.innerWidth > 1200 ? styling.row : styling.column}>
          <LineChart dataArray={GIRHitPercentage} title="GIR Total %" average={true} fitData={true} digits={2} last={7} />
          <LineChart dataArray={GIRHitPercentageFW} title="GIR from fairway %" average={true} fitData={true} digits={2} last={7} />
          <LineChart dataArray={GIRHitPercentageOutFW} title="GIR not fairway %" average={true} fitData={true} digits={2} last={7} />
        </Box>
      <Box className={styling.root}>
        <Typography align="center" variant="h4">
          Green in Regulation % per Par (moving average)
        </Typography>

        <Box className={window.innerWidth > 1200 ? styling.row : styling.column}>
          <LineChart dataArray={GIRHitPercentagePar3} title="Par 3" average={true} fitData={true} digits={2} last={15} />
          <LineChart dataArray={GIRHitPercentagePar4} title="Par 4" average={true} fitData={true} digits={2} last={15} />
          <LineChart dataArray={GIRHitPercentagePar5} title="Par 5" average={true} fitData={true} digits={2} last={15} />
        </Box>
      </Box>
    </Box>
  )
}

export default GIRStats
