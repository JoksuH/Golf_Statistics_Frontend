import React from 'react'
import './App.css'
import NavBar from './Components/NavBar/NavBar'
import AddNewCourse from './Components/AddNewCourse/AddNewCourse'
import NewRoundMain from './Components/EnterNewRound/NewRoundMain'
import bgImg from './bgimg.jpg'
import PastRounds from './Components/PastRounds/PastRounds'
import StatsPage from './Components/Stats/StatsMain'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

const App = () => {
  return (
    <BrowserRouter>
      <div
        style={{
          backgroundImage: `url(${bgImg})`,
          backgroundRepeat: 'no-repeat',
          width: '100vw',
          height: window.innerWidth < 1200 ? '100%' : '100vh',
        }}>
        <NavBar />
        <Switch>
          <Route path="/newround">
            <NewRoundMain />
          </Route>
          <Route path="/newcourse">
            <AddNewCourse />
          </Route>
          <Route path="/pastrounds">
            <PastRounds />
          </Route>
          <Route path="/">
            <StatsPage />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App
