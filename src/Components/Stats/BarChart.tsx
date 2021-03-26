import React from 'react'
import { BarChart, Bar, Tooltip, XAxis, YAxis } from 'recharts'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'


  interface propsData { 
    dataArray: string[]
    title: string
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
  

const Chart: React.FC<propsData> = ({dataArray, title}) => {

const styling = useStyles()
    let setArray: {
        roundnumber: number
        datavalue: number
    }[] = []

    setArray = dataArray.map((element, index) =>  ({roundnumber: index, datavalue: parseFloat(element)}))


    let width = window.innerWidth * 0.7
    let height = window.innerHeight * 0.3


  return (
    <Box className={styling.root}>
      <h2>{title}</h2>
      <BarChart data={setArray} width={500} height={300}>
        <Bar type="monotone" dataKey="datavalue" fill="#eeeee" barSize={15}/>
        <XAxis dataKey="roundnumber" />
        <YAxis domain={[70,90]}/>
        <Tooltip />
        </BarChart>    
    </Box>
  );
}

export default Chart