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
    },
}))

interface Query {
    __typename: string
    roundMany: dataFields[]
  }

  interface dataFields {
    __typename: string
    _id: string
    holescores: string[]
    putts: string[]
    fir: string[]
    gir: string[]
    approachdistance: string[]
    penalties: string[]
    greenbunkers: string[]
    fwbunkers: string[]
  }


const GET_LATEST_ROUNDS = gql`
    query {
        roundMany(limit: 20) {
            _id
            holescores
            putts
            fir
            gir
            approachdistance
            penalties
            greenbunkers
            fwbunkers
            date
            course {
                name
                pars
            }
        }
    }
`

const ListofRounds: React.FC<props> = ({ onClick }) => {
    const { data } = useQuery<Query>(GET_LATEST_ROUNDS)

    const styling = useStyles()

    console.log(data)

    const passCourseData = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ): void => {
        const input = event.target as HTMLElement
        if (
            input?.parentElement?.id !== '' &&
            input?.parentElement?.id !== undefined
        )
            onClick(data?.roundMany[parseInt(input.parentElement.id)])
    }

    return (
        <Box className={styling.root}>
            {data !== undefined &&
                data?.roundMany?.map((element: any, index: number) => {
                    return (
                        <RoundListItem
                            name={element.course.name}
                            score={element.holescores}
                            date={element.date}
                            onClick={passCourseData}
                            index={index}
                        />
                    )
                })}
        </Box>
    )
}

export default ListofRounds
