import React from 'react'
import { BarChart, Bar, XAxis, YAxis } from 'recharts'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'

interface propsData {
    data: { [key: string]: number | string }[]
    title: string
    width?: number
}

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(4),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%',
        margin: 'auto',
        paddingBottom: '2vh',
    },
}))

const Chart: React.FC<propsData> = ({ data, title, width = 0 }) => {
    const styling = useStyles()

    // If desired width hasn't already been specified
    if (width === 0)
    window.innerWidth < 1200 ? width = 400 : width = 900

    return (
        <Box className={styling.root}>
            <h2>{title}</h2>
            <BarChart data={data} width={width} height={400}>
                <Bar type="monotone" dataKey="value" fill="#eeeee" />
                <XAxis dataKey="direction" />
                <YAxis domain={[0, 100]} />
            </BarChart>
        </Box>
    )
}

export default Chart
