import React from 'react'
import Login from './Components/LoginPage/Login'
import NavBar from './Components/NavBar/NavBar'
import AddNewCourse from './Components/AddNewCourse/AddNewCourse'
import NewRoundMain from './Components/EnterNewRound/NewRoundMain'
import bgImg from './bgimg.jpg'
import PastRounds from './Components/PastRounds/PastRounds'

const App = () => {
    return (
        <div
            style={{
                backgroundImage: `url(${bgImg})`,
                backgroundRepeat: 'no-repeat',
                width: '100vw',
                height: '100vh',
            }}
        >
            <NavBar />
            <PastRounds />{' '}
        </div>
    )
}

export default App
