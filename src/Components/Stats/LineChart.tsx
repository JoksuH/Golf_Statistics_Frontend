import React from 'react'
import { LineChart, Line, Tooltip, XAxis, YAxis } from 'recharts'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'

interface propsData {
    dataArray: string[]
    title: string
    average?: Boolean
    perRound?: Boolean
    last?: number
    fitData?: Boolean
    Setmin?: number
    Setmax?: number
    digits?: number
}

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(6),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%',
        margin: 'auto',
        paddingBottom: '2vh',
        backgroundColor: "hsl(107, 100%, 87%)",
    },
}))

const Chart: React.FC<propsData> = ({
    dataArray,
    title,
    average,
    last = 7,
    perRound = false,
    Setmin = 0,
    Setmax = 0,
    fitData = true,
    digits = 1
}) => {
    const styling = useStyles()
    let setArray: {
        roundnumber: number
        datavalue: number
    }[] = []

    let min: number = 200
    let max: number = 0

    if (average) {
        let Average: number[] = []
        let holecount: number = 0
        let roundarr: number[] = []

        //Calculates the average value based on last X rounds

        if (dataArray.length > last) {
            for (let i = last; i < dataArray.length; i++) {
                let average: number = 0
                for (let j = 1; j < last + 1; j++) {
                    average += parseFloat(dataArray[i - j])
                }
                if (parseFloat(Number(average / last).toFixed(1)) > max)
                    max = parseFloat(Number(average / last).toFixed(1))
                if (parseFloat(Number(average / last).toFixed(1)) < min)
                    min = parseFloat(Number(average / last).toFixed(1))

                //If results are wanted per round average basis (to look better on charts)
                if (perRound) {
                    roundarr.push(average / last)
                    holecount++
                    if (holecount === 18) {
                        const sum: number = roundarr.reduce(
                            (acc, curvalue) => acc + curvalue
                        )
                        Average.push(parseFloat(Number(sum / 18).toFixed(digits)))
                        holecount = 0
                        roundarr = []
                    }
                } else {
                    Average.push(parseFloat(Number(average / last).toFixed(digits)))
                }
            }
        }

        setArray = Average.map((element, index) => ({
            roundnumber: index,
            datavalue: element,
        }))
    } else
        setArray = dataArray.map((element, index) => ({
            roundnumber: index,
            datavalue: parseFloat(element),
        }))

    let width = window.innerWidth * 0.2
    let height = window.innerHeight * 0.2

    return (
        <Box className={styling.root}>
            <h2>{title}</h2>
            <LineChart data={setArray} width={width} height={height}>
                <Line
                    type="monotone"
                    dataKey="datavalue"
                    stroke="#000000"
                    strokeWidth={3}
                    dot={false}
                />
                <XAxis dataKey="roundnumber" />
                <YAxis domain={fitData ? [min, max] : [Setmin, Setmax]} />
                <Tooltip />
            </LineChart>
        </Box>
    )
}

export default Chart
