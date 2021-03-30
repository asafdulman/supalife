import './App.css';
import { Route, Switch } from 'react-router-dom'
import { Home } from './pages/Home';
import { Categories } from './pages/Categories';
import { DailyRating } from './pages/DailyRating';
import { RateDay } from './pages/RateDay';
// import { useEffect, useState } from 'react';
import { SignUp } from './pages/SignUp';
import { useDispatch, useSelector } from 'react-redux'
// import { loadUser } from './store/actions/userActions';
import BottomBar from './cmps/BottomBar';
import StaticCategories from './pages/StaticCategories';
import { ActionsPage } from './pages/ActionsPage';
import { About } from './pages/About';
import { EditUserInfo } from './pages/EditUserInfo';
import { Test } from './pages/Test';
//dev user id 6023c5ecf8814f14258b09a4
//prod user id  602a3dd07a43b706dce84a8f

function App() {
  // const dispatch = useDispatch()
  // const [isNavOpen, setIsNavOpen] = useState(false)
  // const loggedInUser = useSelector(state => state.userReducer.loggedInUser)

    // useEffect(() => {
    //     dispatch(loadUser('6023c5ecf8814f14258b09a4'))
    // }, [])

  return (
    <div className="app">
      <main>
        <Switch>
          {/* <Route component={Login} path="/login" /> */}
          {/* <Route component={SignUp} path="/signup" /> */}
          <Route component={EditUserInfo} path="/edituserinfo" />
          <Route component={About} path="/about" />
          <Route component={RateDay} path="/ratethisday" />
          <Route component={Categories} path="/oldcategories" />
          <Route component={ActionsPage} path="/actions" />
          <Route component={StaticCategories} path="/categories" />
          <Route component={DailyRating} path="/dailyrating" />
          <Route component={SignUp} path="/signup" />
          <Route component={Test} path="/test" />
          <Route component={Home} path="/" />
        </Switch>
      </main>
      <BottomBar />
    </div>
  );
}

export default App;
