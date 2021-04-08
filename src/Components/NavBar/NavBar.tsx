import React, { useState } from 'react'
import Box from '@material-ui/core/Box'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        backgroundColor: theme.palette.success.light,
    },
}))
const NavBar: React.FC = () => {
    const styling = useStyles()

    const History = useHistory()

    const [SelectedTab, SetSelectedTab] = useState<number|boolean>(0)

    const handleTabChange = (event: object, value: number): void => {
        SetSelectedTab(value)

        switch (value) {
            case 0:
                History.push('/stats')
                break
            case 1:
                History.push('/pastrounds')
                break
        }
    }

    const handleNewRoundStart = (): void => {
        SetSelectedTab(false)
        History.push('/newround')
    }

    return (
        <Box className={styling.root}>
            <Tabs
                indicatorColor="primary"
                textColor="inherit"
                aria-label="Page Tab Selector"
                onChange={handleTabChange}
                value={SelectedTab}
                centered>
                <Tab label="Stats" />
                <Tab label="Past Rounds" />
            </Tabs>
            <Button
                variant="outlined"
                style={{ marginLeft: '50px' }}
                onClick={handleNewRoundStart}>
                Start a New Round
            </Button>
        </Box>
    )
}

export default NavBar
