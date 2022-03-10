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

const ApproachesStats: React.FC<propsData> = ({ pars, holescores, fir, gir, approachdistances }) => {
  const [GIRMissesAllDirections, SetGIRMissesAllDirections] = useState<GIRmissesData[]>([])
  const [GirMissDirections, SetGirMissDirections] = useState<GIRmissesData[]>([])
  const [GirMissLength, SetGirMissLength] = useState<GIRmissesData[]>([])

  const [ToggleValue, SetToggleValue] = useState<string>('1000')

  useEffect(() => {
    let gIRtot: string[] = []

    for (let i = 0; i < holescores.length; i++) {
      gIRtot = gIRtot.concat(gir[i])
    }
    countGirMissDirectionsForBarChart(gIRtot)
  }, [ToggleValue])

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
      selectedGirData = girData.slice(girData.length - 10 * 18, girData.length)
      dataLength = 10 * 18
    } else if (ToggleValue === '5' && girData.length > 5 * 18) {
      selectedGirData = girData.slice(girData.length - 5 * 18, girData.length)
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

    const missDirectionData = [
      { direction: 'Left', value: (leftTotal / dataLength) * 100 },
      {
        direction: 'Correct Direction',
        value: (correctDirectionCount / dataLength) * 100,
      },
      { direction: 'Right', value: (rightTotal / dataLength) * 100 },
    ]
    const missLengthData = [
      { direction: 'Long', value: (longTotal / dataLength) * 100 },
      {
        direction: 'Right Distance',
        value: (correctLengthCount / dataLength) * 100,
      },
      { direction: 'Short', value: (shortTotal / dataLength) * 100 },
    ]

    SetGIRMissesAllDirections(readyFormattedAllData)
    SetGirMissDirections(missDirectionData)
    SetGirMissLength(missLengthData)
  }

  const styling = useStyles()

  return (
    <Box className={styling.root}>
      <Box className={window.innerWidth > 1200 ? styling.row : styling.column}>
        <Typography align="center" variant="h4">
          Gir Approach Misses
        </Typography>
        <ToggleButtonGroup className={styling.toggle} value={ToggleValue} exclusive onChange={(event: React.MouseEvent<HTMLElement, MouseEvent>, value: string) => SetToggleValue(value)} aria-label="teebox selection">
          <ToggleButton value="1000" aria-label="all teeboxes">
            <Typography className={styling.toggletext}>All Rounds</Typography>
          </ToggleButton>
          <ToggleButton value="10" aria-label="yellow teebox">
            <Typography className={styling.toggletext}>Last 10</Typography>
          </ToggleButton>
          <ToggleButton value="5" aria-label="white teebox">
            <Typography className={styling.toggletext}>Last 5</Typography>
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
      <Box className={window.innerWidth > 1200 ? styling.row : styling.column}>
        <BarChart data={GirMissDirections} title="Left or Right?" width={500} />
        <BarChart data={GirMissLength} title="Long or Short?" width={500} />
      </Box>
      <BarChart data={GIRMissesAllDirections} title="Approach Direction %" />
    </Box>
  )
}

export default ApproachesStats
