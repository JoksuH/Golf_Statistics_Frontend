import React from 'react'
import { LineChart, Line, Tooltip, XAxis, YAxis } from 'recharts'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'


  interface propsData { 
    dataArray: string[]
    title: string
    average?: Boolean
    fitData?: Boolean
    Setmin?: number
    Setmax?: number
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
        backgroundColor: theme.palette.success.light,
    }
}))
  

const Chart: React.FC<propsData> = ({dataArray, title, average, Setmin=0, Setmax=0, fitData=true}) => {

const styling = useStyles()
    let setArray: {
        roundnumber: number
        datavalue: number
    }[] = []

    let min: number = 200
    let max: number = 0


    if (average) {

    let sevendayAverage: number[] = []

    if (dataArray.length > 15) {
      for (let i = 7; i < dataArray.length; i ++) {
        let average = 0
        for (let j = 1; j < 8; j ++) {
          average += parseFloat(dataArray[i-j])
      }
      if (parseFloat(Number(average / 7).toFixed(1)) > max) max = parseFloat(Number(average / 7).toFixed(1))
      if (parseFloat(Number(average / 7).toFixed(1)) < min) min = parseFloat(Number(average / 7).toFixed(1))
      sevendayAverage.push(parseFloat(Number(average / 7).toFixed(1)))
  }
}
setArray = sevendayAverage.map((element, index) =>  ({roundnumber: index, datavalue: element}))
}
else 
  setArray = dataArray.map((element, index) =>  ({roundnumber: index, datavalue: parseFloat(element)}))


    let width = window.innerWidth * 0.7
    let height = window.innerHeight * 0.3

    console.log(min)
    console.log(max)

  return (
    <Box className={styling.root}>
      <h2>{title}</h2>
      <LineChart data={setArray} width={500} height={300}>
        <Line type="monotone" dataKey="datavalue" stroke="#000000" strokeWidth={3} dot={false}  />
        <XAxis dataKey="roundnumber" />
        <YAxis domain={(fitData) ? [min,max] : [Setmin,Setmax]}/>
        <Tooltip />
        </LineChart>    
    </Box>
  );
}

export default Chart