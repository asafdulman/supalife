import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { DailyRatingList } from "../cmps/DailyRatingList";
import { MyChart } from "../cmps/MyChart";
import { insightService } from '../services/insightsService'
import { SuggestedActions } from '../cmps/SuggestedActions';


export function DailyRating() {
    const [pickedDate, setPickedDate] = useState()
    const [datePicker, setDatePicker] = useState()
    const [isByCategory, setIsByCategory] = useState()
    // const [chartType, setChartType] = useState()
    const [selectedCategory, setSelectedCategory] = useState()
    const [categoryData, setCategoryData] = useState()
    const [isSuggestedModalOpen, setIsSuggestedModalOpen] = useState(false)
    const loggedInUser = useSelector(state => state.userReducer.loggedInUser)

    useEffect(() => {
        setInitialDate()
    }, [])

    useEffect(() => {
        if (loggedInUser) getWeekAvgInsight()
        setCategoryData(getCategoryData())
        categoryInsight()
    }, [pickedDate])

    useEffect(() => {
        setCategoryData(getCategoryData())
        categoryInsight()
    }, [selectedCategory])

    const setInitialDate = () => {
        let date = new Date()
        date = `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2) - 1}`;
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

    const categoryInsight = () => {
        var rangedDates;
        var sum = 0;
        var count = 0;
        var avg = 0
        // if user selected a category and a date,
        if (selectedCategory && pickedDate) {
            // calculate the avg of the category and date 3-4 days back.
            // get the relevant time range
            const dayIndex = loggedInUser?.dailyRating.findIndex(day => day.date === pickedDate)
            if (dayIndex === 0) {
                rangedDates = loggedInUser?.dailyRating[0]
            } else if (dayIndex === 1) {
                rangedDates = loggedInUser?.dailyRating.slice(dayIndex - 1, dayIndex + 1)
            } else if (dayIndex === 2) {
                rangedDates = loggedInUser?.dailyRating.slice(dayIndex - 2, dayIndex + 1)
            } else {
                rangedDates = loggedInUser?.dailyRating.slice(dayIndex - 3, dayIndex + 1)
            }
            if (rangedDates.length > 1) {
                const res = rangedDates.map(day => {
                    const chosenCategory = day.rating.find(cat => cat.category === selectedCategory)
                    if (chosenCategory && chosenCategory.rate) count++
                    sum += chosenCategory?.rate
                })
                avg = sum / count
            } else {
                // what happens if there is only one day?
            }
            // then, make up some rules to return relevent insight
            console.log('avg', avg);
            return insightService.getInsightPerCategory(selectedCategory, avg)
        }
    }

    const toggleSuggestedModal = (action) => {
        action === 'open' ? setIsSuggestedModalOpen(true) : setIsSuggestedModalOpen(false)
    }

    return (
        <div className="daily-rating-box">
            <h1 className="daily-rating-heading">Daily Stats</h1>
            <input className="daily-rating-date-input" type="date" value={datePicker} onChange={(ev) => { onPickDate(ev) }} />
            <div className="daily-rating-btns-box">
                <button onClick={() => { setIsByCategory(!isByCategory) }}>By Category</button>
                <button onClick={() => { onByDate() }}>By Date</button>
            </div>
            {loggedInUser && isByCategory && <div>
                {loggedInUser.categories.map(category => <button onClick={() => { onSelectCategory(category) }} key={category} className="stats-category-btn">{category}</button>)}
            </div>}
            {/* {loggedInUser && loggedInUser.dailyRating.map(day => <DailyRatingList key={day.date} date={day.date} ratingList={day.rating} pickedDate={pickedDate} />)} */}
            {loggedInUser && <MyChart dailyRating={loggedInUser.dailyRating} pickedDate={pickedDate} loggedInUser={loggedInUser} selectedCategory={selectedCategory} categoryData={categoryData} />}
            <div className="daily-rating-insights-box">
                {/* <h3 className="daily-rating-insights-heading">Insights</h3> */}
                {loggedInUser && getInsight() && <p className="general-insight-box">{getInsight()}</p>}
                {loggedInUser && isByCategory && categoryInsight() && <div className="category-insight-box">
                    <div onClick={() => { setIsSuggestedModalOpen(!isSuggestedModalOpen) }} className="blob green"></div>
                    <p >{categoryInsight()}</p>
                    {/* <i onClick={() => { setIsSuggestedModalOpen(!isSuggestedModalOpen) }} className="fas open-call-to-action-btn fa-2x fa-exclamation"></i> */}
                </div>}
                {loggedInUser && <p className={getWeekAvgInsight() ? "weekly-category-insight-box" : "display-none"}>{getWeekAvgInsight()}</p>}
            </div>
            {isSuggestedModalOpen && <SuggestedActions isSuggestedModalOpen={isSuggestedModalOpen} toggleSuggestedModal={toggleSuggestedModal} selectedCategory={selectedCategory} />}
        </div>
    )
}
