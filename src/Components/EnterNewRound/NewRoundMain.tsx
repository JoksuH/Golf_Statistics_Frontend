import React, { useEffect, useState } from 'react'
import NewRoundCourseSelection from './NewRoundCourseSelection'
import CourseBox from './CourseBox'
import EnterHoleScore from './EnterHoleScore'


const NewRoundMain: React.FC = () => {

    const [SelectedCourse, SetSelectedCourse] = useState<string | undefined>(undefined)

    const handleCourseSelection = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        const input = event.target as HTMLElement;
        SetSelectedCourse(input.innerText)
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
                <CourseBox name={SelectedCourse} onClick={handleCourseChange} />
                <EnterHoleScore onClick={handleCourseChange}/>
                </>
            }
          
        </div>
    )
}

export default NewRoundMain
