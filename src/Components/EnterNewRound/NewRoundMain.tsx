import React, { useEffect, useState } from 'react'
import NewRoundCourseSelection from './NewRoundCourseSelection'
import CourseBox from './CourseBox'
import EnterHoleScore from './EnterHoleScore'
import ViewRound from './../ViewRound/ViewRound'
import { gql, useQuery, useMutation } from '@apollo/client'

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

const NewRoundMain: React.FC = () => {
    const [SelectedCourse, SetSelectedCourse] = useState<string>('')
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

    const handleNextHoleButtonClicked = (data: string[]): void => {
        if (HoleNumber < 18) {
            SetHoleNumber(HoleNumber + 1)

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

    const handleCourseChange = (): void => {
        SetSelectedCourse('')

        //Reset statistics if course changed
        SetScoreCard([])
        SetPutts([])
        SetFIR([])
        SetGIR([])
        SetApproachDistance([])
        SetPenalties([])
        SetFairwayBunkers([])
        SetGreenBunkers([])
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
                greenbunkers: GreenBunkers,
                fwbunkers: FairwayBunkers,
            },
        })

        alert('Round Saved!')
    }

    return (
        <div>
            {SelectedCourse == '' && (
                <NewRoundCourseSelection onClick={handleCourseSelection} />
            )}
            {data !== undefined && SelectedCourse !== '' && (
                <>
                    <CourseBox
                        name={SelectedCourse}
                        onClick={handleCourseChange}
                    />
                    <EnterHoleScore
                        HoleNumber={HoleNumber}
                        Par={data?.courseOne?.pars[HoleNumber - 1]}
                        onSave={handleNextHoleButtonClicked}
                        onClickPrev={handlePreviousHoleButtonClicked}
                    />
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
                </>
            )}
        </div>
    )
}

export default NewRoundMain
