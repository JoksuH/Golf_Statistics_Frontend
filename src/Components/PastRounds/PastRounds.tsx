import React, { useState } from 'react'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import ListofRounds from './ListofRounds'
import ViewRound from './../ViewRound/ViewRound'
import ViewRoundMobile from './../ViewRound/ViewRoundMobile'


const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(6),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%',
        margin: 'auto',
        paddingBottom: '2vh',
        backgroundColor: theme.palette.success.light,
    },
}))

const PastRounds: React.FC = () => {
    const styling = useStyles()

    const [SelectedRound, SetSelectedRound] = useState<any | undefined>(
        undefined
    )

    const handleRoundSelect = (data: any): void => {
        SetSelectedRound(data)
    }

    const resetSelection = () => {
        SetSelectedRound(undefined)
    }

    return (
        <Box className={styling.root}>
            {SelectedRound === undefined ? (
                <ListofRounds onClick={handleRoundSelect} />
            ) : (
                <> {window.innerWidth < 1200 ?                     
                <ViewRoundMobile
                    Coursename={SelectedRound.course.name}
                    Pars={SelectedRound.course.pars}
                    Strokes={SelectedRound.holescores}
                    Putts={SelectedRound.putts}
                    Fairways={SelectedRound.fir}
                    GIRs={SelectedRound.gir}
                    Penalties={SelectedRound.penalties}
                    FWBunkers={SelectedRound.fwbunkers}
                    GreenBunkers={SelectedRound.greenbunkers}
                />
                    : 
                    <ViewRound
                        Coursename={SelectedRound.course.name}
                        Pars={SelectedRound.course.pars}
                        Strokes={SelectedRound.holescores}
                        Putts={SelectedRound.putts}
                        Fairways={SelectedRound.fir}
                        GIRs={SelectedRound.gir}
                        Penalties={SelectedRound.penalties}
                        FWBunkers={SelectedRound.fwbunkers}
                        GreenBunkers={SelectedRound.greenbunkers}
                    />
                }
                    <Button
                        variant="outlined"
                        style={{ width: '20vw', margin: 'auto' }}
                        onClick={resetSelection}
                    >
                        Go Back
                    </Button>
                </>
            )}
        </Box>
    )
}

export default PastRounds
