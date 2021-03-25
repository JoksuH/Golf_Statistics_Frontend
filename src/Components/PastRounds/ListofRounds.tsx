import React from 'react'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'
import { gql, useQuery } from '@apollo/client'
import RoundListItem from './RoundListItem'

interface props {
    onClick: (data: any) => void
}


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
        height: '40vh'
    },
}))

interface data {
    roundMany: {[key:string]: string[]}[] | {[key:string]: {[key:string]: string| number[] }}[]
}

const GET_LATEST_ROUNDS = gql
`query {
    roundMany(limit: 10) {
      _id
      holescores
      putts
      fir
      gir
      approachdistance
      penalties
      greenbunkers
      fwbunkers
      course {
        name
        pars
      }
      }
  }
`

const ListofRounds: React.FC<props> = ({onClick}) => {

    const { data, loading } = useQuery<data>(GET_LATEST_ROUNDS)

    const styling = useStyles()

    console.log(data)

    const passCourseData = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        const input = event.target as HTMLElement
        if (input?.parentElement?.id !== "" && input?.parentElement?.id !== undefined)
            onClick(data?.roundMany[parseInt(input.parentElement.id)])
    }

    return (
        <Box className={styling.root}>
            {data !== undefined && data?.roundMany?.map((element: any, index: number) => {
                return (<RoundListItem name={element.course.name} score={element['holescores']} onClick={passCourseData} index={index}/> )
            })
}
        </Box>
    )
}

export default ListofRounds
