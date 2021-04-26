import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StaticCategoryPreview } from '../cmps/StaticCategoryPreview'
import { categoryService } from '../services/categoryService'
import { storageService } from '../services/storageService'
import { userService } from '../services/userService'
import { updateUser } from '../store/actions/userActions'
import { NavLink } from 'react-router-dom'
export default function StaticCategories() {

    const loggedInUser = useSelector(state => state.userReducer.loggedInUser)
    const dispatch = useDispatch()
    const [categories, setCategories] = useState()
    const [isModalOpen, setIsModalOpen] = useState(false)

    useEffect(() => {
        setCategories(categoryService.getStaticCategories(loggedInUser?.gender))
    }, [loggedInUser])

    const updateCategoryInUser = async (category) => {
        if (loggedInUser.userName === 'Guest') {
            const isCatInUser = loggedInUser.categories.some(cat => cat === category)
            if (isCatInUser) {
                loggedInUser.categories = loggedInUser.categories.filter(cat => cat !== category)
            } else {
                loggedInUser.categories = [...loggedInUser.categories, category]
            }
            storageService.saveToStorage(storageService.saveToStorage('userInStorage', loggedInUser))
            dispatch(updateUser(loggedInUser))
        } else {
            const user = await userService.updateStaticCategory(loggedInUser, category)
            dispatch(updateUser(user))
        }
    }

    return (
        <div className="static-categories-box">
            <h1 className="static-categories-box-heading">Categories</h1>
            <i onClick={() => { setIsModalOpen(!isModalOpen) }} className="far info-icon-categories fa-question-circle"></i>
            <div className={isModalOpen ? "explanation-category-box-open" : "explanation-category-box-close"}>
                <p>After selecting <span>categories</span> that suits you, please go on to the <NavLink to="ratethisday">Rate</NavLink>  section (bottom right)</p>
            </div>
            <div className="static-categories-list">
            {categories?.map(category => <StaticCategoryPreview key={category} updateCategoryInUser={updateCategoryInUser} loggedInUser={loggedInUser} category={category} />)}
            </div>
        </div>
    )
}
