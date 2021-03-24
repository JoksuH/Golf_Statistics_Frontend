import React from 'react'
import CourseBox from './CourseBox'
import { gql, useQuery } from '@apollo/client';

interface props {
    onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
    }

    interface CourseData {
        _id: string,
        name: string
      }
      
      interface data {
          courseMany: CourseData[]
      }
    
const GET_COURSE_NAMES = gql`
    query getCourseNames {
        courseMany {
            _id
            name
      }
    }
  `

const NewRoundCourseSelection: React.FC<props> = ({onClick}) => {

    const { loading, data } = useQuery<data>(GET_COURSE_NAMES)

    return (
        <div>
            {data && data.courseMany.map(course => {
                return (<CourseBox name={course.name} key={course._id} onClick={onClick}/>)
            })
        }
            {loading && <p>Loading Courselist</p>}
                      
        </div>
    )
}

export default NewRoundCourseSelection
