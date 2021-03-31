import React from 'react'
import Box from '@material-ui/core/Box'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import ToggleButton from '@material-ui/lab/ToggleButton'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'
import Typography from '@material-ui/core/Typography'

interface pageData {
    activePage: string
    activeTee: string
    onChangeTab: (event: React.ChangeEvent<{}>, value: any) => void
    onChangeTee: (event: React.ChangeEvent<{}>, value: any) => void
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: theme.palette.success.light,
        margin: 'auto',
        marginTop: '25px',
    },
    toggle: {
        margin: '0 25px 0 25px',
    },
    toggletext: {
        fontSize: '17px',
        color: 'black',
    },
}))

const StatTabs: React.FC<pageData> = ({
    activePage,
    activeTee,
    onChangeTab,
    onChangeTee,
}) => {
    const pageList: string[] = [
        'Overview',
        'Driving',
        'Greens In Regulation',
        'Approach Accuracy',
        'Short Game',
        'Strategy',
    ]

    const valueofActivePage: number = pageList.findIndex(
        (element: string) => element === activePage
    )

    const styling = useStyles()

    return (
        <Box>
            <Paper className={styling.root}>
                <Tabs
                    value={valueofActivePage}
                    indicatorColor="primary"
                    textColor="inherit"
                    onChange={onChangeTab}
                >
                    {pageList &&
                        pageList.map((city) => {
                            return <Tab label={city} key={city} />
                        })}
                </Tabs>
                <ToggleButtonGroup
                    className={styling.toggle}
                    value={activeTee}
                    exclusive
                    onChange={onChangeTee}
                    aria-label="teebox selection"
                >
                    <ToggleButton value="All" aria-label="all teeboxes">
                        <Typography className={styling.toggletext}>
                            All
                        </Typography>
                    </ToggleButton>
                    <ToggleButton value="Yellow" aria-label="yellow teebox">
                        <Typography className={styling.toggletext}>
                            Yellow
                        </Typography>
                    </ToggleButton>
                    <ToggleButton value="White" aria-label="white teebox">
                        <Typography className={styling.toggletext}>
                            White
                        </Typography>
                    </ToggleButton>
                </ToggleButtonGroup>
            </Paper>
        </Box>
    )
}

export default StatTabs
