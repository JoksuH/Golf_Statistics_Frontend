import React from 'react'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import HitMarker from './HitMarker'
import { sumScores, hitCounter } from './../../Utils/Helpers'

interface props {
  Coursename: string
  Pars: number[]
  Strokes: string[]
  Putts: string[]
  Fairways: string[]
  GIRs: string[]
  Penalties: string[]
  FWBunkers: string[]
  GreenBunkers: string[]
}

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(6),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    margin: 'auto',
    paddingBottom: '2vh',
    backgroundColor: theme.palette.success.light,
  },
  holenumbers: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'hsl(107, 100%, 87%)',
    borderRadius: '7px',
  },
  scorecard: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  holenumbercontainer: {
    height: '3vh',
    width: '2vw',
    border: '1px solid black',
    padding: '5px 5px 5px 5px',
    textAlign: 'center',
  },
  scorecontainer: {
    height: '3vh',
    width: '2vw',
    border: '1px solid black',
    padding: '5px 5px 5px 5px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconcontainer: {
    height: '3vh',
    width: '2vw',
    border: '1px solid black',
    padding: '5px 5px 5px 5px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scorecardinfo: {
    height: '3vh',
    width: '9vw',
    border: '1px solid black',
    padding: '5px 5px 5px 5px',
    textAlign: 'center',
  },
  holepaircontainer: {
    padding: '0px 0px 0px 0px',
  },
  holetext: {
    paddingLeft: '10px',
    margin: 'auto',
  },
  holepartext: {
    paddingLeft: '5px',
    paddingTop: '25px',
  },

  textfield: {
    marginTop: '25px',
    fontSize: '22px',
    textAlign: 'center',
  },
  enterpar: {
    fontSize: '22px',
    textAlign: 'center',
  },
  scorebogey: {
    height: '3vh',
    width: '2vw',
    border: '1px solid black',
    padding: '5px 5px 5px 5px',
    backgroundColor: 'darkblue',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scorebirdie: {
    height: '3vh',
    width: '2vw',
    border: '1px solid black',
    backgroundColor: 'red',
    padding: '5px 5px 5px 5px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreeagle: {
    height: '3vh',
    width: '2vw',
    border: '1px solid black',
    backgroundColor: 'orange',
    padding: '5px 5px 5px 5px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    '&:invalid': {
      border: 'red solid 2px',
    },
  },
}))

const ViewRound: React.FC<props> = ({ Coursename, Pars, Strokes, Putts, Fairways, GIRs, Penalties, FWBunkers, GreenBunkers }) => {
  const stringPars: string[] = Pars.map((par) => par.toString())

  const styling = useStyles()

  return (
    <Box className={styling.root}>
      <Typography variant="h4" className={styling.enterpar}>
        {Coursename}
      </Typography>
      <Box className={styling.holenumbers}>
        <Box className={styling.holepaircontainer}>
          <Box className={styling.scorecardinfo}>
            <Typography variant="h5" className={styling.holetext}>
              Hole
            </Typography>
          </Box>
          <Box className={styling.scorecardinfo}>
            <Typography variant="h5">Par</Typography>
          </Box>
          <Box className={styling.scorecardinfo}>
            <Typography variant="h5">Strokes</Typography>
          </Box>
          <Box className={styling.scorecardinfo}>
            <Typography variant="h5">Putts</Typography>
          </Box>
          <Box className={styling.scorecardinfo}>
            <Typography variant="h5">Fairway</Typography>
          </Box>

          <Box className={styling.scorecardinfo}>
            <Typography variant="h5">GIR</Typography>
          </Box>
          <Box className={styling.scorecardinfo}>
            <Typography variant="h5">Penalties</Typography>
          </Box>
          <Box className={styling.scorecardinfo}>
            <Typography variant="h5">Greenside Bunkers</Typography>
          </Box>
          <Box className={styling.scorecardinfo}>
            <Typography variant="h5">Fairway Bunkers</Typography>
          </Box>
        </Box>
        {Pars.map((number: number, index: number) => {
          return (
            <Box className={styling.holepaircontainer} key={number.toString() + index.toString()}>
              <Box className={styling.holepaircontainer}>
                <Box className={styling.holenumbercontainer}>
                  <Typography variant="h5">{index + 1}</Typography>
                </Box>
                <Box className={styling.holenumbercontainer}>
                  <Typography variant="h5">{number}</Typography>
                </Box>
              </Box>
              <Box className={styling.holepaircontainer}>
                {!Strokes[index] && <Box className={styling.iconcontainer}></Box>}
                {parseInt(Strokes[index]) > number && (
                  <Box className={styling.scorebogey}>
                    <Typography variant="h5" style={{ color: 'white' }}>
                      {Strokes[index]}
                    </Typography>
                  </Box>
                )}
                {parseInt(Strokes[index]) === number - 1 && (
                  <Box className={styling.scorebirdie}>
                    <Typography variant="h5" style={{ color: 'white' }}>
                      {Strokes[index]}
                    </Typography>
                  </Box>
                )}
                {parseInt(Strokes[index]) === number - 2 && (
                  <Box className={styling.scoreeagle}>
                    <Typography variant="h5">{Strokes[index]}</Typography>
                  </Box>
                )}
                {parseInt(Strokes[index]) === number && (
                  <Box className={styling.iconcontainer}>
                    <Typography variant="h5">{Strokes[index]}</Typography>
                  </Box>
                )}
                <Box className={styling.iconcontainer}>
                  <Typography variant="h5">{Putts[index]}</Typography>
                </Box>
                {number !== 3 ? (
                  <Box className={styling.iconcontainer}>
                    <HitMarker hitvalue={Fairways[index]} />
                  </Box>
                ) : (
                  <Box className={styling.holenumbercontainer}></Box>
                )}
                <Box className={styling.iconcontainer}>
                  <HitMarker hitvalue={GIRs[index]} />
                </Box>
                <Box className={styling.scorecontainer}>
                  <Typography variant="h5">{Penalties[index]}</Typography>
                </Box>
                <Box className={styling.scorecontainer}>
                  <Typography variant="h5">{GreenBunkers[index]}</Typography>
                </Box>
                <Box className={styling.scorecontainer}>
                  <Typography variant="h5">{FWBunkers[index]}</Typography>
                </Box>
              </Box>
            </Box>
          )
        })}
        <Box className={styling.holepaircontainer}>
          <Box className={styling.scorecardinfo}>
            <Typography variant="h5">Total</Typography>
          </Box>
          <Box className={styling.scorecardinfo}>
            <Typography variant="h5">{sumScores(stringPars)}</Typography>
          </Box>
          <Box className={styling.scorecardinfo}>
            <Typography variant="h5">{sumScores(Strokes)}</Typography>
          </Box>
          <Box className={styling.scorecardinfo}>
            <Typography variant="h5">{sumScores(Putts)}</Typography>
          </Box>
          <Box className={styling.scorecardinfo}>
            <Typography variant="h5">{hitCounter(Fairways, 'hit')}</Typography>
          </Box>

          <Box className={styling.scorecardinfo}>
            <Typography variant="h5">
              {hitCounter(GIRs, 'hit')} / {GIRs.length}{' '}
            </Typography>
          </Box>
          <Box className={styling.scorecardinfo}>
            <Typography variant="h5">{sumScores(Penalties)}</Typography>
          </Box>
          <Box className={styling.scorecardinfo}>
            <Typography variant="h5">{sumScores(GreenBunkers)}</Typography>
          </Box>
          <Box className={styling.scorecardinfo}>
            <Typography variant="h5">{sumScores(FWBunkers)}</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default ViewRound
