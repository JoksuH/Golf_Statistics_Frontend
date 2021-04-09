import React, { useState, useEffect } from 'react'
import CourseBox from './CourseBox'
import { gql, useQuery } from '@apollo/client'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    search: {
        marginTop: theme.spacing(8),
        marginLeft: '35vw',
        backgroundColor: theme.palette.success.light,
        width: '30vw'
    }
    
}))


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
    const [CourseList, SetCourseList] = useState<CourseData[]| undefined>(undefined)
    const [SearchTerm, SetSearchTerm] = useState<string>("")

    const styling = useStyles()

    useEffect(() => {
        let filteredCourseList: CourseData[] = []
        if (data && SearchTerm !== "") {
            filteredCourseList = data.courseMany.filter(course => (course.name.toLowerCase().includes(SearchTerm.toLowerCase())))
        }
        else if (data && SearchTerm === "") filteredCourseList = data.courseMany

        SetCourseList(filteredCourseList)

    }, [data,SearchTerm])

    const handleSearchTermEnter = (event: React.ChangeEvent<HTMLInputElement>
        ): void => {
            SetSearchTerm(event.target.value)
        }


    return (
        <div>
            <TextField className={styling.search} label="Search course by name" onChange={handleSearchTermEnter}/>
            {data && CourseList && CourseList.map((course: CourseData, index: number) => {
                if (index < 10) 
                return (<CourseBox name={course.name} key={course._id} onClick={onClick}/>)
                else return <p></p>
            })
        }
            {loading && <p>Loading Courselist</p>}
                      
        </div>
    )
}

export default NewRoundCourseSelection
