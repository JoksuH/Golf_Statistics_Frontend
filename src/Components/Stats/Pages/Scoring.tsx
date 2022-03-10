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
}

const Scoring: React.FC<propsData> = ({ pars, scores }) => {
  const [ScorePar3s, SetScorePar3s] = useState<string[]>([])
  const [ScorePar4s, SetScorePar4s] = useState<string[]>([])
  const [ScorePar5s, SetScorePar5s] = useState<string[]>([])

  const [EaglePercentage, SetEaglePercentage] = useState<string[]>([])
  const [BirdiePercentage, SetBirdiePercentage] = useState<string[]>([])
  const [ParPercentage, SetParPercentage] = useState<string[]>([])
  const [BogeyPercentage, SetBogeyPercentage] = useState<string[]>([])
  const [DBBogeyPercentage, SetDBBogeyPercentage] = useState<string[]>([])
  const [TrBogeyPercentage, SetTrBogeyPercentage] = useState<string[]>([])

  useEffect(() => {
    let parstot: number[] = []
    let scorestot: string[] = []

    for (let i = 0; i < pars.length; i++) {
      parstot = parstot.concat(pars[i])
      scorestot = scorestot.concat(scores[i])
    }
    countScores(parstot, scorestot)
  }, [pars, scores])

  const countScores = (pars: number[], scores: string[]): void => {
    let par3resultsArr: string[] = []
    let par4resultsArr: string[] = []
    let par5resultsArr: string[] = []

    let eagleCount: number = 0
    let birdieCount: number = 0
    let parCount: number = 0
    let bogeyCount: number = 0
    let dbBogeyCount: number = 0
    let trBogeyCount: number = 0

    let eaglePercentageArr: string[] = []
    let birdiePercentageArr: string[] = []
    let parPercentageArr: string[] = []

    let bogeyPercentageArr: string[] = []
    let dbBogeyPercentageArr: string[] = []
    let trBogeyPercentageArr: string[] = []

    pars.forEach((value: number, index: number) => {
      const scoreRelativeToPar: string = (parseInt(scores[index]) - value).toString()

      if (value === 3) par3resultsArr.push(scores[index])
      if (value === 4) par4resultsArr.push(scores[index])
      if (value === 5) par5resultsArr.push(scores[index])

      if (scoreRelativeToPar === '-2') eagleCount++
      if (scoreRelativeToPar === '-1') birdieCount++
      if (scoreRelativeToPar === '0') parCount++
      if (scoreRelativeToPar === '1') bogeyCount++
      if (scoreRelativeToPar === '2') dbBogeyCount++
      if (scoreRelativeToPar === '3') trBogeyCount++

      eaglePercentageArr.push(((eagleCount * 100) / (index + 1)).toString())
      birdiePercentageArr.push(((birdieCount * 100) / (index + 1)).toString())
      parPercentageArr.push(((parCount * 100) / (index + 1)).toString())
      bogeyPercentageArr.push(((bogeyCount * 100) / (index + 1)).toString())
      dbBogeyPercentageArr.push(((dbBogeyCount * 100) / (index + 1)).toString())
      trBogeyPercentageArr.push(((trBogeyCount * 100) / (index + 1)).toString())
    })

    SetScorePar3s(par3resultsArr)
    SetScorePar4s(par4resultsArr)
    SetScorePar5s(par5resultsArr)

    SetEaglePercentage(eaglePercentageArr)
    SetBirdiePercentage(birdiePercentageArr)
    SetParPercentage(parPercentageArr)
    SetBogeyPercentage(bogeyPercentageArr)
    SetDBBogeyPercentage(dbBogeyPercentageArr)
    SetTrBogeyPercentage(trBogeyPercentageArr)
  }

  const styling = useStyles()

  return (
    <Box className={styling.root}>
      <Box className={window.innerWidth > 1200 ? styling.row : styling.column}>
        <Typography align="center" variant="h4">
          Scoring Relative To Par
        </Typography>
      </Box>
      <Box className={window.innerWidth > 1200 ? styling.row : styling.column}>
        <LineChart dataArray={ScorePar3s} title="Scoring on Par 3s" last={15} />
        <LineChart dataArray={ScorePar4s} title="Scoring on Par 4s" last={15} />
        <LineChart dataArray={ScorePar5s} title="Scoring on Par 5s" last={15} />
      </Box>
      <Box className={window.innerWidth > 1200 ? styling.row : styling.column}>
        <LineChart dataArray={EaglePercentage} title="Eagles (%)" perRound={false} last={10} />
        <LineChart dataArray={BirdiePercentage} title="Birdie (%)" perRound={false} last={10} />
        <LineChart dataArray={ParPercentage} title="Pars (%)" perRound={false} last={10} />
      </Box>
      <Box className={window.innerWidth > 1200 ? styling.row : styling.column}>
        <LineChart dataArray={BogeyPercentage} title="Bogeys (%)" perRound={false} last={10} />
        <LineChart dataArray={DBBogeyPercentage} title="Double Bogeys (%)" perRound={false} last={10} />
        <LineChart dataArray={TrBogeyPercentage} title="Triple Bogeys (%)" perRound={false} last={10} />
      </Box>
    </Box>
  )
}

export default Scoring
