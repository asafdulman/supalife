import { Route, Switch } from 'react-router-dom'
import { Home } from './pages/Home';
import { DailyRating } from './pages/DailyRating';
import { RateDay } from './pages/RateDay';
import { SignUp } from './pages/SignUp';
import { useDispatch } from 'react-redux'
import { updateUser } from './store/actions/userActions';
import BottomBar from './cmps/BottomBar';
import StaticCategories from './pages/StaticCategories';
import { ActionsPage } from './pages/ActionsPage';
import { About } from './pages/About';
import { EditUserInfo } from './pages/EditUserInfo';
import { storageService } from './services/storageService';

function App() {
  const dispatch = useDispatch()
  if (storageService.loadFromStorage('userInStorage')) {
    dispatch(updateUser(storageService.loadFromStorage('userInStorage')))
  }

  return (
    <div className="app">
      <main>
        <Switch>
          <Route component={EditUserInfo} path="/edituserinfo" />
          <Route component={About} path="/about" />
          <Route component={RateDay} path="/ratethisday" />
          <Route component={ActionsPage} path="/actions" />
          <Route component={StaticCategories} path="/categories" />
          <Route component={DailyRating} path="/dailyrating" />
          <Route component={SignUp} path="/signup" />
          <Route component={Home} path="/" />
        </Switch>
      </main>
      <BottomBar />
    </div>
  );
}

export default App;
