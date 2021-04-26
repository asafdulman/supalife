import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { decreaseProgressBar, increaseProgressBar } from '../store/actions/progressBarActions';

export function EditRatePreview({ category, modifyDataToGeneralForm, loggedInUser, pickedDate }) {
    const dispatch = useDispatch()
    const [rate, setRate] = useState('')
    const [isCategoryRated, setIsCategoryRated] = useState()
    const [catDailyDescription, setCatDailyDescription] = useState('')
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        checkCategoryRatedBack()
    }, [])
    useEffect(() => {
        checkCategoryRatedBack()
    }, [pickedDate])

    const onSaveCategory = async ev => {
        ev.preventDefault()
        const dataToForm = { category, rate, catDailyDescription }
        modifyDataToGeneralForm(dataToForm)
        setIsOpen(!isOpen)
        if (isCategoryRated) {
            if (!rate) {
                dispatch(decreaseProgressBar())
                setIsCategoryRated(false)
            }
        } else {
            if (rate) {
                dispatch(increaseProgressBar())
                setIsCategoryRated(true)
            }
        }
    }

    const checkCategoryRatedBack = () => {
        const day = loggedInUser.dailyRating.find(day => day.date === pickedDate)
        if (day) {
            const dayCategory = day.rating.find(dailyCategory => dailyCategory.category === category)
            if (dayCategory) {
                dayCategory.rate ? setIsCategoryRated(true) : setIsCategoryRated(false)
            } else {
                setIsCategoryRated(false)
            }
        } else {
            setIsCategoryRated(false)
        }
    }

    const onSetRate = (ev, rate) => {
        ev.preventDefault()
        setRate(rate)
    }

    const onSetCatDailyDescription = (ev) => {
        ev.preventDefault()
        setCatDailyDescription('')
    }

    return (
        <div className={isCategoryRated ? "edit-rate-box-rated" : "edit-rate-box-not-rated"}>
            <h2 className={isCategoryRated ? 'category-heading-rated' : 'category-heading-not-rated'} onClick={() => { setIsOpen(!isOpen) }} >{category}</h2>
            <div className={isOpen ? "edit-rate-modal-open" : "edit-rate-modal-close"}>
                {isOpen && <form className="edit-rate-form">
                    <span onClick={() => { setRate('') }} className="undo-rate-modal-btn"><i className="fas fa-undo-alt"></i></span>
                    <span className="close-rate-modal-btn" onClick={() => { setIsOpen(!isOpen) }}><i className="far fa-window-close"></i></span>
                    <div className="edit-rate-btns-box">
                        <button className={rate === '1' ? '' : 'clicked-rate-btn'} onClick={(ev) => { onSetRate(ev, '1') }}>1</button>
                        <button className={rate === '2' ? '' : 'clicked-rate-btn'} onClick={(ev) => { onSetRate(ev, '2') }}>2</button>
                        <button className={rate === '3' ? '' : 'clicked-rate-btn'} onClick={(ev) => { onSetRate(ev, '3') }}>3</button>
                        <button className={rate === '4' ? '' : 'clicked-rate-btn'} onClick={(ev) => { onSetRate(ev, '4') }}>4</button>
                        <button className={rate === '5' ? '' : 'clicked-rate-btn'} onClick={(ev) => { onSetRate(ev, '5') }}>5</button>
                    </div>
                    <div className="edit-rate-input-box">
                        <input className="edit-rate-input" type="text" placeholder="Thoughts about the day" value={catDailyDescription} onChange={(ev) => { setCatDailyDescription(ev.target.value) }} />
                        <button onClick={(ev) => { onSetCatDailyDescription(ev) }} className="delete-form-btn" ><i className="far fa-trash-alt"></i></button>
                    </div>
                    <button className="save-rating-btn" onClick={(ev) => { onSaveCategory(ev) }}>Save</button>
                </form>}
            </div>
        </div>
    )
}
