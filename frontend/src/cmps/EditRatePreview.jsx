import { useState, useEffect } from 'react'
import { Grow } from '@material-ui/core';
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

    const onSaveCategory = async (ev) => {
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



    const handleChange = (ev) => {
        setCatDailyDescription(ev.target.value)
    }

    const checkCategoryRatedBack = () => {
        // console.log('checking if category is rated in back');
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

    // const toggleRateBox = (ev) => {
    //     ev.stopPropagation()
    //     setIsOpen(!isOpen)
    // }    

    return (
        <div className={isCategoryRated ? "edit-rate-box-rated" : "edit-rate-box-not-rated"}>
            <h2 className={isCategoryRated ? 'category-heading-rated' : 'category-heading-not-rated'} onClick={() => { setIsOpen(!isOpen) }} >{category}</h2>
            {isOpen && <div onClick={() => { setIsOpen(!isOpen) }} className="edit-rate-preview-overlay"></div>}
            <Grow in={isOpen}>
                {<div className="edit-rate-modal">
                    <form className="edit-rate-form">
                        <span onClick={() => { setRate('') }} className="undo-rate-modal-btn"><i className="fas fa-undo-alt"></i></span>
                        <span className="close-rate-modal-btn" onClick={() => { setIsOpen(!isOpen) }}><i className="far fa-window-close"></i></span>
                        <span className="edit-rate-form-category">{category}</span>
                        <div className="edit-rate-btns-box">
                            <button onClick={() => { setRate(1) }}>1</button>
                            <button onClick={() => { setRate(2) }}>2</button>
                            <button onClick={() => { setRate(3) }}>3</button>
                            <button onClick={() => { setRate(4) }}>4</button>
                            <button onClick={() => { setRate(5) }}>5</button>
                        </div>
                        <div className="edit-rate-input-box">
                        <input className="edit-rate-input" type="text" placeholder="Thoughts about the day" value={catDailyDescription} onChange={(ev) => { setCatDailyDescription(ev.target.value) }} />
                        <button onClick={() => {setCatDailyDescription('')}} className="delete-form-btn" ><i className="far fa-trash-alt"></i></button>
                        {/* <button onClick={() => {setCatDailyDescription('')}} className="delete-form-btn" ><i className="fas fa-eraser"></i></button> */}
                        </div>
                        <button className="save-rating-btn" onClick={(ev) => { onSaveCategory(ev) }}>Save</button>
                    </form>
                </div>}
            </Grow>
        </div>
    )
}
