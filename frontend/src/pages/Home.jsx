import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { NavLink } from "react-router-dom";
import { Login } from "../cmps/Login";
import { Logout } from '../cmps/Logout';
import logo from '../assets/img/logo.png'
import { motivationService } from '../services/motivationService';
import { SideBar } from '../cmps/SideBar';

export function Home() {

    const [todayDate, setTodayDate] = useState('')
    const [isDayRated, setIsDayRated] = useState('')
    const [isBarOpen, setIsBarOpen] = useState(false)
    const loggedInUser = useSelector(state => state.userReducer.loggedInUser)

    useEffect(() => {
        isCategoryOnDate()
    }, [loggedInUser])

    //dev 6023c5ecf8814f14258b09a4

    //production 602a3dd07a43b706dce84a8f

    const isUserHaveCategories = () => {
        const res = loggedInUser.categories.length ? true : false;
        return res
    }

    const isCategoryOnDate = () => {
        let date = new Date()
        date = `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}`;
        const dayArr = date.split('-')
        date = `${dayArr[1]}/${dayArr[2]}/${dayArr[0]}`
        setTodayDate(date)
        console.log('date', date);
        const dayToCheck = loggedInUser?.dailyRating.find(day => day.date === date)
        if (!dayToCheck) return false
        const isTodayRated = dayToCheck?.rating.some(day => day.rate)
        setIsDayRated(isTodayRated)
    }

    return (
        <div>
            <i onClick={() => {setIsBarOpen(!isBarOpen)}} className="fas hamburger-menu fa-cogs"></i>
           {isBarOpen && <div onClick={() => {setIsBarOpen(!isBarOpen)}} className="side-bar-overlay"></div>} 
            <SideBar isBarOpen={isBarOpen} setIsBarOpen={setIsBarOpen} />
            <img className="logo" src={logo} alt="logo" />
            {!loggedInUser && <Login />}
            {/* {loggedInUser && <Logout />} */}
            {loggedInUser &&
                <div className="home-box">
                    <h1>Hey {loggedInUser.userName}</h1>
                    <hr />
                    <div className="sentence-box">
                        <p>{motivationService.getSentence()}</p>
                    </div>
                    {loggedInUser && !isUserHaveCategories() &&
                        <div className="add-categories-home-box">
                            <p>You have no categories yet</p>
                            <p>Is it a good time to add a few?</p>
                            <NavLink to="/categories">GO</NavLink>
                        </div>}
                    {loggedInUser && !isDayRated &&
                        <div className={loggedInUser.categories.length ? "go-to-rate-home-box" : "go-to-rate-home-box-not-visiable"}>
                            <p>You didn't rate this day yet. Might be a good time to do so.</p>
                            <NavLink to="/ratethisday">GO</NavLink>
                        </div>}
                </div>
            }


        </div>
    )
}
