import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StaticCategoryPreview } from '../cmps/StaticCategoryPreview'
import { categoryService } from '../services/categoryService'
import { userService } from '../services/userService'
import { updateUser } from '../store/actions/userActions'
export default function StaticCategories() {

    const loggedInUser = useSelector(state => state.userReducer.loggedInUser)
    const dispatch = useDispatch()
    const [categories, setCategories] =useState()

    useEffect(() => {
        setCategories(categoryService.getStaticCategories(loggedInUser?.gender))
    }, [loggedInUser])

    const updateCategoryInUser = async (category) => {
        const user = await userService.updateStaticCategory(loggedInUser, category)
        dispatch(updateUser(user))
    }

    return (
        <div className="static-categories-box">
            {/* <i className="fas info-btn fa-info-circle"></i> */}
            <h1 className="static-categories-box-heading">Categories</h1>
            {categories?.map(category => <StaticCategoryPreview key={category} updateCategoryInUser={updateCategoryInUser} loggedInUser={loggedInUser} category={category} />)}
        </div>
    )
}
