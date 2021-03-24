import React, { useEffect, useState } from 'react'
import NewRoundCourseSelection from './NewRoundCourseSelection'
import CourseBox from './CourseBox'
import EnterHoleScore from './EnterHoleScore'
import ViewRound from './../ViewRound/ViewRound'
import { gql, useQuery } from '@apollo/client';


interface CourseData {
    pars: number[],
    holedistances_white: number[],
    holedistances_yellow: number[],
  }
  
  interface data {
    courseOne: {[key:string] : number[]}
  }

  interface fetchVariables {
    name: string
  }

  const GET_COURSE_INFO = gql`
    query getCourseData($name: String) {
        courseOne (filter: {name: $name}) {
            pars
            holedistances_white
            holedistances_yellow
      }
    }
  `


const NewRoundMain: React.FC = () => {

    const [SelectedCourse, SetSelectedCourse] = useState<string>("")
    const [ScoreCard, SetScoreCard] = useState<string[]>([])
    const [Putts, SetPutts] = useState<string[]>([])
    const [FIR, SetFIR] = useState<string[]>([])
    const [GIR, SetGIR] = useState<string[]>([])
    const [Penalties, SetPenalties] = useState<string[]>([])
    const [FairwayBunkers, SetFairwayBunkers] = useState<string[]>([])
    const [GreenBunkers, SetGreenBunkers] = useState<string[] >([])
    const [HoleNumber, SetHoleNumber] = useState<number>(1)
    const {data, loading} = useQuery<data, fetchVariables>(GET_COURSE_INFO, {variables: {name: SelectedCourse}})

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

        if (HoleNumber === ScoreCard.length+1)
        {
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
    
        } else {

        let holderArr = ScoreCard
        holderArr.splice(HoleNumber-1, 1, data[0])
        SetScoreCard(holderArr)

        holderArr = Putts
        holderArr.splice(HoleNumber-1, 1, data[1])
        SetPutts(holderArr)

        holderArr = FIR
        holderArr.splice(HoleNumber-1, 1, data[2])
        SetFIR(holderArr)

        holderArr = GIR
        holderArr.splice(HoleNumber-1, 1, data[3])
        SetGIR(holderArr)

        holderArr = Penalties
        holderArr.splice(HoleNumber-1, 1, data[4])
        SetPenalties(holderArr)

        holderArr = FairwayBunkers
        holderArr.splice(HoleNumber-1, 1, data[5])
        SetFairwayBunkers(holderArr)

        holderArr = GreenBunkers
        holderArr.splice(HoleNumber-1, 1, data[6])
        SetGreenBunkers(holderArr)

        SetHoleNumber(ScoreCard.length+1)
        
    }


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

    const handleCourseChange = (): void => {
        SetSelectedCourse("")
    }
    return (
        <div>
            {(SelectedCourse == "" && <NewRoundCourseSelection onClick={handleCourseSelection}/>) }
            {(data !== undefined && SelectedCourse !== "") &&
                <>                
                <CourseBox name={SelectedCourse} onClick={handleCourseChange} />
                <ViewRound Coursename={SelectedCourse} Pars={data?.courseOne?.pars} Strokes={ScoreCard} Putts={Putts} Fairways={FIR} GIRs={GIR} Penalties={Penalties} FWBunkers={FairwayBunkers} GreenBunkers={GreenBunkers}/>
                <EnterHoleScore HoleNumber={HoleNumber} Par={data?.courseOne?.pars[HoleNumber-1]} onSave={handleNextHoleButtonClicked} onClickPrev={handlePreviousHoleButtonClicked}/>
                </>
            }
          
        </div>
    )
}

export default NewRoundMain
