import React, { useEffect, useState } from 'react'
import NewRoundCourseSelection from './NewRoundCourseSelection'
import CourseBox from './CourseBox'
import EnterHoleScore from './EnterHoleScore'
import ViewRound from './../ViewRound/ViewRound'


const NewRoundMain: React.FC = () => {

    const [SelectedCourse, SetSelectedCourse] = useState<string | undefined>(undefined)
    const [ScoreCard, SetScoreCard] = useState<string[]>([])
    const [Putts, SetPutts] = useState<string[]>([])
    const [FIR, SetFIR] = useState<string[]>([])
    const [GIR, SetGIR] = useState<string[]>([])
    const [Penalties, SetPenalties] = useState<string[]>([])
    const [FairwayBunkers, SetFairwayBunkers] = useState<string[]>([])
    const [GreenBunkers, SetGreenBunkers] = useState<string[] >([])
    const [HoleNumber, SetHoleNumber] = useState<number>(1)


    const handleNextHoleButtonClicked = (data: string[]): void => {
        if (HoleNumber < 18) {
        SetHoleNumber(HoleNumber + 1)

        /*data package is sent in the following order: 
        (Score)
        (Putts)
        (FIR)
        (GIR)
        (Penalties)
        (FairwayBunkers)
        (GreenBunkers)
        */

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

        holderArr = Penalties
        holderArr.push(data[4])
        SetPenalties(holderArr)

        holderArr = FairwayBunkers
        holderArr.push(data[5])
        SetFairwayBunkers(holderArr)

        holderArr = GreenBunkers
        holderArr.push(data[6])
        SetGreenBunkers(holderArr)


    }

    }

    const handlePreviousHoleButtonClicked = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        if (HoleNumber > 1)
        SetHoleNumber(HoleNumber - 1)
    }


    const handleCourseSelection = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        const input = event.target as HTMLElement
        SetSelectedCourse(input.innerText)
        SetHoleNumber(1)
    }

    const handleCourseChange = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        SetSelectedCourse(undefined)
    }
    return (
        <div>
            {!SelectedCourse ? 
                <NewRoundCourseSelection onClick={handleCourseSelection}/>
                :
                <>
                <ViewRound />
                <CourseBox name={SelectedCourse} onClick={handleCourseChange} />
                <EnterHoleScore HoleNumber={HoleNumber} Par={3} onSave={handleNextHoleButtonClicked} onClickPrev={handlePreviousHoleButtonClicked}/>
                </>
            }
          
        </div>
    )
}

export default NewRoundMain
