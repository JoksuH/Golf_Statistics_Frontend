import React from 'react'
import Box from '@material-ui/core/Box'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        backgroundColor: theme.palette.success.light,
    },
}))
const NavBar: React.FC = () => {
    const styling = useStyles()

    return (
        <Box className={styling.root}>
                <Tabs
                    indicatorColor="primary"
                    textColor="inherit"
                    aria-label="Page Tab Selector"
                    value={1}
                    centered
                >
                    <Tab label="Main" />
                    <Tab label="Stats" />
                    <Tab label="Drills" />
                </Tabs>
                <Button variant="outlined" style={{marginLeft: '50px'}}>Start a New Round</Button>
        </Box>
    )
}

export default NavBar
