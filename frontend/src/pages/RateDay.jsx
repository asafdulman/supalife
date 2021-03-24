import { updateUser } from "../store/actions/userActions";
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { DailySummary } from "../cmps/DailySummary";
import { userService } from "../services/userService";
import { EditPreviewList } from "../cmps/EditPreviewList";
import Confetti from 'react-confetti'
import { ProgressBar } from "../cmps/ProgressBar";
import { setTotalCategories, setCompletedCategories } from "../store/actions/progressBarActions";
import { Slide } from '@material-ui/core'

export function RateDay() {

    const dispatch = useDispatch()
    const [dailyCategories, setDailyCategories] = useState([])
    const [isErrorMesageModalOpen, setIsMeesageModalOpen] = useState()
    const [dailySummary, setDailySummary] = useState([])
    const [pickedDate, setPickedDate] = useState()
    const [isConf, setisConf] = useState(false)
    const [datePicker, setDatePicker] = useState()
    const loggedInUser = useSelector(state => state.userReducer.loggedInUser)

    useEffect(() => {
        setInitialDate()
    }, [])
    useEffect(() => {
        const numberOfCategories = loggedInUser?.categories.length
        dispatch(setTotalCategories(numberOfCategories))
    }, [loggedInUser])

    useEffect(() => {
        getCompletedCategories()
    }, [pickedDate])

    const setInitialDate = () => {
        let date = new Date()
        date = `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}`;
        setDatePicker(date)
        const dayArr = date.split('-')
        date = `${dayArr[1]}/${dayArr[2]}/${dayArr[0]}`
        setPickedDate(date)
    }

    const modifyDataToGeneralForm = async (categoryInfo) => {
        const idx = dailyCategories.findIndex(daily => daily.category === categoryInfo.category)
        if (idx >= 0) {
            dailyCategories.splice(idx, 1, categoryInfo)
            setDailyCategories([...dailyCategories])
        } else {
            setDailyCategories([...dailyCategories, categoryInfo])
        }
    }

    const modifyDailySummary = (summary) => {
        setDailySummary(summary)
    }

    const onAddDailyData = async () => {
        if (!loggedInUser) return;
        if (!pickedDate) {
            alert('please select date')
            return;
        }
        if (!dailyCategories.length) {
            setIsMeesageModalOpen(true)
            setTimeout(() => {
                setIsMeesageModalOpen(false)
            }, 3000);
            return;
        }
        setisConf(true)
        setTimeout(() => {
            setisConf(false)
        }, 3000);
        const data = {
            dailySummary,
            dailyCategories
        }
        const user = await userService.updateDailyData(loggedInUser, data, pickedDate)
        console.log('user', user);
        dispatch(updateUser(user))

    }

    const onPickDate = (ev) => {
        ev.preventDefault()
        setDatePicker(ev.target.value)
        const dayArr = ev.target.value.split('-')
        const date = `${dayArr[1]}/${dayArr[2]}/${dayArr[0]}`
        setPickedDate(date)
    }

    const getCompletedCategories = () => {
        let count = 0
        const day = loggedInUser?.dailyRating.find(day => day.date === pickedDate)
        if (day) {
            day.rating.forEach(day => {
                if (day.rate) count++
            })
        }
        dispatch(setCompletedCategories(count))
    }



    return (
        <div className="rate-day-box">
            <Slide in={isErrorMesageModalOpen}>
                <div className="rate-day-fill-category-message-modal">Please fill at least one category.</div>
            </Slide>
            <h1 className="rate-day-heading">Rate This Day!</h1>
            <input placeholder="hey" className="date-box" type="date" value={datePicker} onChange={(ev) => { onPickDate(ev) }} />
            <DailySummary modifyDailySummary={modifyDailySummary} />
            <ProgressBar />
            {loggedInUser && <EditPreviewList modifyDataToGeneralForm={modifyDataToGeneralForm} pickedDate={pickedDate} categories={loggedInUser.categories} loggedInUser={loggedInUser} />}
            <button className="send-rating-btn" onClick={() => { onAddDailyData() }}>DONE</button>
            {isConf && <Confetti height={800} gravity={0.2} />}
        </div>
    )
}
