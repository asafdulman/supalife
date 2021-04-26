import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { MyChart } from "../cmps/MyChart";
import { insightService } from '../services/insightsService'
import { SuggestedActions } from '../cmps/SuggestedActions';
import { hideBottomBar, showBottomBar } from '../store/actions/bottomBarActions';
import { NavLink } from 'react-router-dom';


export function DailyRating() {
    const [pickedDate, setPickedDate] = useState()
    const [datePicker, setDatePicker] = useState()
    const [isByCategory, setIsByCategory] = useState()
    const [selectedCategory, setSelectedCategory] = useState()
    const [isInfoModalOpen, setIsInfoModalOpen] = useState(false)
    const [categoryData, setCategoryData] = useState()
    const [isSuggestedModalOpen, setIsSuggestedModalOpen] = useState(false)
    const loggedInUser = useSelector(state => state.userReducer.loggedInUser)
    const dispatch = useDispatch()

    useEffect(() => {
        setInitialDate()
    }, [])

    useEffect(() => {
        if (loggedInUser) getWeekAvgInsight()
        setCategoryData(getCategoryData())
        getCategoryInsight()
    }, [pickedDate])

    useEffect(() => {
        setCategoryData(getCategoryData())
        getCategoryInsight()
    }, [selectedCategory])

    const setInitialDate = () => {
        let date = new Date()
        date = `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}`;
        date = loggedInUser?.userName === 'Guest' ? '2021-04-04' : date
        setDatePicker(date)
        const dayArr = date.split('-')
        date = `${dayArr[1]}/${dayArr[2]}/${dayArr[0]}`
        setPickedDate(date)
    }

    const onPickDate = (ev) => {
        ev.preventDefault()
        setDatePicker(ev.target.value)
        const dayArr = ev.target.value.split('-')
        const date = `${dayArr[1]}/${dayArr[2]}/${dayArr[0]}`
        setPickedDate(date)
    }

    const getWeekAvgInsight = () => {
        const dailyAverage = loggedInUser.dailyRating.map(day => {
            const sum = day.rating.reduce((acc, value) => {
                value.rate = (typeof value.rate === 'string') ? +value.rate : value.rate
                return acc + value.rate
            }, 0)
            const avg = sum / day.rating.length
            return { date: day.date, avg }
        })
        const idxEnd = loggedInUser.dailyRating.findIndex(day => day.date === pickedDate)
        let idxStart = idxEnd - 6
        idxStart = idxStart < 0 ? 0 : idxStart
        const ratingdaysRange = dailyAverage.slice(idxStart, idxEnd + 1)
        const totalAvg = ratingdaysRange.reduce((acc, day) => acc + day.avg, 0) / ratingdaysRange.length;
        return insightService.getWeeklyAvg(totalAvg)
    }

    const getInsight = () => {
        const dailyAverage = loggedInUser.dailyRating.map(day => {
            const sum = day.rating.reduce((acc, value) => {
                return acc + value.rate
            }, 0)
            const avg = sum / day.rating.length
            return { date: day.date, avg }
        })
        const idxEnd = loggedInUser.dailyRating.findIndex(day => day.date === pickedDate)
        let idxStart = idxEnd - 3
        idxStart = idxStart < 0 ? 0 : idxStart
        if (idxEnd < 0) return;
        const ratingdaysRange = dailyAverage.slice(idxStart, idxEnd)
        const totalAvg = ratingdaysRange.reduce((acc, day) => acc + day.avg, 0) / ratingdaysRange.length;
        const chosenDay = loggedInUser.dailyRating.find(day => day.date === pickedDate)
        const chosenDateAvg = chosenDay.rating.reduce((acc, day) => acc + day.rate, 0) / chosenDay.rating.length
        return insightService.getGeneralInsight(totalAvg, chosenDateAvg)
    }

    const onSelectCategory = (category) => {
        setSelectedCategory(category)
    }

    const getCategoryData = () => {
        const dataToShow = []
        const dayIndex = loggedInUser?.dailyRating.findIndex(day => day.date === pickedDate)
        const rangedDates = loggedInUser?.dailyRating.slice(dayIndex - 3, dayIndex + 1)
        rangedDates?.map(day => {
            const res = day.rating.find(dayCategory => dayCategory.category === selectedCategory)
            if (res) dataToShow.push(res.rate)
        })
        return dataToShow
    }

    const onByDate = () => {
        setIsByCategory(false)
        setSelectedCategory('')
    }

    const getCategoryInsight = () => {
        var rangedDates;
        var sum = 0;
        var count = 0;
        var avg = 0
        if (selectedCategory && pickedDate) {
            const dayIndex = loggedInUser?.dailyRating.findIndex(day => day.date === pickedDate)
            if (!dayIndex) {
                rangedDates = loggedInUser?.dailyRating[0]
            } else if (dayIndex === 1) {
                rangedDates = loggedInUser?.dailyRating.slice(dayIndex - 1, dayIndex + 1)
            } else if (dayIndex === 2) {
                rangedDates = loggedInUser?.dailyRating.slice(dayIndex - 2, dayIndex + 1)
            } else {
                rangedDates = loggedInUser?.dailyRating.slice(dayIndex - 3, dayIndex + 1)
            }
            if (rangedDates.length > 1) {
                rangedDates.forEach(day => {
                    const chosenCategory = day.rating.find(category => category.category === selectedCategory)
                    if (chosenCategory && chosenCategory.rate) count++
                    sum += chosenCategory?.rate
                })
                avg = sum / count
            } 
            return insightService.getInsightPerCategory(selectedCategory, avg)
        }
    }

    const toggleSuggestedModal = (action) => {
        if (action === 'open') {
            setIsSuggestedModalOpen(true)
        } else {
            setIsSuggestedModalOpen(false)
            dispatch(showBottomBar())
        }
    }

    const onBlobClick = () => {
        setIsSuggestedModalOpen(!isSuggestedModalOpen)
        dispatch(hideBottomBar())
    }

    return (
        <div className="daily-rating-box">
            <h1 className="daily-rating-heading">Daily Stats</h1>
            {loggedInUser?.userName === 'Guest' && <i onClick={() => { setIsInfoModalOpen(!isInfoModalOpen) }} className="far info-icon-daily-rating fa-question-circle"></i>}
            <div className={isInfoModalOpen ? "explanation-daily-rating-box-open" : "explanation-daily-rating-box-close"}>
                <p>Since you are in a guest mode, the data you see in the past days (beginning of April) is hard-coded. Feel free to <NavLink to="/signup">sign up</NavLink> and enter your own life data.</p>
            </div>
            <input className="daily-rating-date-input" type="date" value={datePicker} onChange={(ev) => { onPickDate(ev) }} />
            <div className="daily-rating-btns-box">
                <button onClick={() => { setIsByCategory(!isByCategory) }}>By Category</button>
                <button onClick={() => { onByDate() }}>By Date</button>
            </div>
            {loggedInUser && isByCategory && <div>
                {loggedInUser.categories.map(category => <button onClick={() => { onSelectCategory(category) }} key={category} className="stats-category-btn">{category}</button>)}
            </div>}
            {loggedInUser && <MyChart dailyRating={loggedInUser.dailyRating} pickedDate={pickedDate} loggedInUser={loggedInUser} selectedCategory={selectedCategory} categoryData={categoryData} />}
            <div className="daily-rating-insights-box">
                {loggedInUser && getInsight() && <p className="general-insight-box">{getInsight()}</p>}
                {loggedInUser && isByCategory && getCategoryInsight() && <div className="category-insight-box">
                    <div onClick={() => { onBlobClick() }} className="blob green"></div>
                    <p >{getCategoryInsight()}</p>
                </div>}
                {loggedInUser && <p className={getWeekAvgInsight() ? "weekly-category-insight-box" : "display-none"}>{getWeekAvgInsight()}</p>}
            </div>
            {isSuggestedModalOpen && <SuggestedActions isSuggestedModalOpen={isSuggestedModalOpen} toggleSuggestedModal={toggleSuggestedModal} selectedCategory={selectedCategory} />}
        </div>
    )
}
