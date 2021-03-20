import React, { useEffect, useState } from 'react'
import CourseBox from './CourseBox'

interface props {
    onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
    }
    

const NewRoundCourseSelection: React.FC<props> = ({onClick}) => {

    const [CourseList, SetCourseList] = useState<string[]>([])

    useEffect(() => {

        //fetch courselist
        let courselistTest = ['Espoo Ringside Golf', 'Vuosaari Golf', 'Kerigolf', 'Nevas Golf', 'SHG Golf Lakisto']
        SetCourseList(courselistTest)




    }, [])


    return (
        <div>
            {CourseList && CourseList.map(course => {
                return (<CourseBox name={course} key={course} onClick={onClick}/>)
            })
            
            
            }
          
        </div>
    )
}

export default NewRoundCourseSelection
