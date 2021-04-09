import React, { useState } from 'react'
import NewRoundCourseSelection from './NewRoundCourseSelection'
import EnterHoleScore from './EnterHoleScore'
import EnterHoleScoreMobile from './EnterHoleScoreMobile'
import ViewRound from './../ViewRound/ViewRound'
import ViewRoundMobile from './../ViewRound/ViewRoundMobile'
import { gql, useQuery, useMutation } from '@apollo/client'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'

interface data {
    courseOne: { [key: string]: number[] }
}

interface fetchVariables {
    name: string
}

const GET_COURSE_INFO = gql`
    query getCourseData($name: String) {
        courseOne(filter: { name: $name }) {
            _id
            pars
            holedistances_white
            holedistances_yellow
        }
    }
`
const CREATE_ROUND = gql`
    mutation roundCreateOnenew(
        $coursename: MongoID!
        $holescores: [String]!
        $putts: [String]!
        $fir: [String]!
        $gir: [String]!
        $approachdistance: [String]!
        $penalties: [String]!
        $greenbunkers: [String]!
        $fwbunkers: [String]!
    ) {
        roundCreateOne(
            record: {
                coursename: $coursename
                holescores: $holescores
                putts: $putts
                fir: $fir
                gir: $gir
                approachdistance: $approachdistance
                penalties: $penalties
                greenbunkers: $greenbunkers
                fwbunkers: $fwbunkers
            }
        ) {
            recordId
        }
    }
`

const useStyles = makeStyles((theme) => ({
    teeboxselection: {
        marginTop: theme.spacing(8),
        marginLeft: '35vw',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: '25vw',
    },
    rowbox: {
        margin: 'auto',
        display: 'flex',
        flexDirection: 'row',
    },
    columnbox: {
        margin: 'auto',
        display: 'flex',
        flexDirection: 'column',
        height: '15vh',
        justifyContent: 'space-evenly',
    },
    teebuttonwhite: {
        backgroundColor: "white",
        fontSize: '18px',
    },
    teebuttonyellow: {
        backgroundColor: "yellow",
        fontSize: '18px',
    }
}))

const NewRoundMain: React.FC = () => {
    const [SelectedCourse, SetSelectedCourse] = useState<string>('')
    const [SelectedTeeBox, SetSelectedTeeBox] = useState<string>('')
    const [ScoreCard, SetScoreCard] = useState<string[]>([])
    const [Putts, SetPutts] = useState<string[]>([])
    const [FIR, SetFIR] = useState<string[]>([])
    const [GIR, SetGIR] = useState<string[]>([])
    const [ApproachDistance, SetApproachDistance] = useState<string[]>([])
    const [Penalties, SetPenalties] = useState<string[]>([])
    const [FairwayBunkers, SetFairwayBunkers] = useState<string[]>([])
    const [GreenBunkers, SetGreenBunkers] = useState<string[]>([])
    const [HoleNumber, SetHoleNumber] = useState<number>(1)
    const { data } = useQuery<data, fetchVariables>(GET_COURSE_INFO, {
        variables: { name: SelectedCourse },
    })
    const [addRound] = useMutation(CREATE_ROUND)

    const styling = useStyles()

    const handleNextHoleButtonClicked = (data: string[]): void => {
        if (HoleNumber < 18) {
            SetHoleNumber(HoleNumber + 1)

        console.log(data)

            /*data package is sent in the following order: 
        (Score)
        (Putts)
        (FIR)
        (GIR)
        (ApproachDistance)
        (Penalties)
        (FairwayBunkers)
        (GreenBunkers)
        */

            if (HoleNumber === ScoreCard.length + 1 || HoleNumber === 18) {
                let holderArr = ScoreCard
                holderArr.push(data[0])
                SetScoreCard(holderArr)

                holderArr = Putts
                holderArr.push(data[1])
                SetPutts(holderArr)

                holderArr = FIR
                holderArr.push(data[2])
                SetFIR(holderArr)

                holderArr = GIR
                holderArr.push(data[3])
                SetGIR(holderArr)

                holderArr = ApproachDistance
                holderArr.push(data[4])
                SetApproachDistance(holderArr)

                holderArr = Penalties
                holderArr.push(data[5])
                SetPenalties(holderArr)

                holderArr = FairwayBunkers
                holderArr.push(data[6])
                SetFairwayBunkers(holderArr)

                holderArr = GreenBunkers
                holderArr.push(data[7])
                SetGreenBunkers(holderArr)
            } else {
                let holderArr = ScoreCard
                holderArr.splice(HoleNumber - 1, 1, data[0])
                SetScoreCard(holderArr)

                holderArr = Putts
                holderArr.splice(HoleNumber - 1, 1, data[1])
                SetPutts(holderArr)

                holderArr = FIR
                holderArr.splice(HoleNumber - 1, 1, data[2])
                SetFIR(holderArr)

                holderArr = GIR
                holderArr.splice(HoleNumber - 1, 1, data[3])
                SetGIR(holderArr)

                holderArr = ApproachDistance
                holderArr.splice(HoleNumber - 1, 1, data[4])
                SetApproachDistance(holderArr)

                holderArr = Penalties
                holderArr.splice(HoleNumber - 1, 1, data[5])
                SetPenalties(holderArr)

                holderArr = FairwayBunkers
                holderArr.splice(HoleNumber - 1, 1, data[6])
                SetFairwayBunkers(holderArr)

                holderArr = GreenBunkers
                holderArr.splice(HoleNumber - 1, 1, data[7])
                SetGreenBunkers(holderArr)

                SetHoleNumber(ScoreCard.length + 1)
            }
        }
        if (HoleNumber > 17) SaveRound()
    }

    const handlePreviousHoleButtonClicked = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ): void => {
        if (HoleNumber > 1) SetHoleNumber(HoleNumber - 1)
    }

    const handleCourseSelection = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ): void => {
        const input = event.target as HTMLElement
        SetSelectedCourse(input.innerText)
        SetHoleNumber(1)
    }

    const SaveRound = (): void => {
        addRound({
            variables: {
                coursename: data?.courseOne?._id,
                holescores: ScoreCard,
                putts: Putts,
                fir: FIR,
                gir: GIR,
                approachdistance: ApproachDistance,
                penalties: Penalties,
                tee: SelectedTeeBox, 
                greenbunkers: GreenBunkers,
                fwbunkers: FairwayBunkers,
            },
        })

        alert('Round Saved!')
    }

    const handleTeeSelection = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ): void => {
        const input = event.target as HTMLElement
        SetSelectedTeeBox(input.innerHTML)
    }

    return (
        <div>
            {SelectedCourse === '' && (
                <NewRoundCourseSelection onClick={handleCourseSelection} />
            )}
            {SelectedTeeBox === '' && SelectedCourse !== '' && (
                <Box className={styling.teeboxselection}>
                    <Typography style={{color: "white", fontSize: '18px'}}>Please Select The Tee Box:</Typography>
                    <Box className={styling.columnbox}>
                        <Button  className={styling.teebuttonwhite} onClick={handleTeeSelection}>White</Button>
                        <Button className={styling.teebuttonyellow} onClick={handleTeeSelection}>Yellow</Button>
                        </Box>
                </Box>
            )}
            {data !== undefined &&
                SelectedCourse !== '' &&
                SelectedTeeBox !== '' && (
                    <>
                       {window.innerWidth > 1200 ? 
                        <EnterHoleScore
                            HoleNumber={HoleNumber}
                            Par={data?.courseOne?.pars[HoleNumber - 1]}
                            onSave={handleNextHoleButtonClicked}
                            onClickPrev={handlePreviousHoleButtonClicked}
                        />
                        : 
                        <EnterHoleScoreMobile
                            HoleNumber={HoleNumber}
                            Par={data?.courseOne?.pars[HoleNumber - 1]}
                            onSave={handleNextHoleButtonClicked}
                            onClickPrev={handlePreviousHoleButtonClicked}
                        />

                    }
                    {window.innerWidth > 1200 ? 
                         <ViewRound
                         Coursename={SelectedCourse}
                         Pars={data?.courseOne?.pars}
                         Strokes={ScoreCard}
                         Putts={Putts}
                         Fairways={FIR}
                         GIRs={GIR}
                         Penalties={Penalties}
                         FWBunkers={FairwayBunkers}
                         GreenBunkers={GreenBunkers}
                     />
                 
                        : 
                        <ViewRoundMobile
                        Coursename={SelectedCourse}
                        Pars={data?.courseOne?.pars}
                        Strokes={ScoreCard}
                        Putts={Putts}
                        Fairways={FIR}
                        GIRs={GIR}
                        Penalties={Penalties}
                        FWBunkers={FairwayBunkers}
                        GreenBunkers={GreenBunkers}
                    />

                    }
                    </>
                       
                )}
        </div>
    )
}

export default NewRoundMain
