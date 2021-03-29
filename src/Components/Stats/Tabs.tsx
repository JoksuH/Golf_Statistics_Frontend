import React from 'react'
import Box from '@material-ui/core/Box'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'


interface pageData {

    activePage: string
    onChange: (event: React.ChangeEvent<{}>, value: any) => void
}

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.success.light,
        margin: 'auto',        
        marginTop: '25px'
    },
}))


const StatTabs:React.FC<pageData> = ({activePage, onChange}) => {

    const pageList: string[] = ["Main", "Approaches", "Driving", "Putting"]

    const valueofActivePage: number = pageList.findIndex(
        (element: string) => element === activePage
      )
    
        const styling = useStyles()

    return (
        <Box>
            <Paper>
                <Tabs
                    className={styling.root}
                    value={valueofActivePage}
                    indicatorColor="primary"
                    textColor="primary"
                    onChange={onChange}
                    centered
                >
                    {pageList &&
                        pageList.map((city) => {
                            return <Tab label={city} key={city} />
                        })}
                </Tabs>
            </Paper>
        </Box>
    )
}

export default StatTabs
