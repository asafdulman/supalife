import { updateUser } from "../store/actions/userActions";
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { CategoryPreview } from "../cmps/CategoryPreview";
import { userService } from "../services/userService";
import { Grow, Slide } from '@material-ui/core';

export function Categories() {
    const [categoryValue, setCategoryValue] = useState('')
    const [isAddCategoryModal, setIsAddCategoryModal] = useState(false)
    const [isModalMessageAdd, setIsModalMessageAdd] = useState(false)
    const [isModalMessageRemove, setIsModalMessageRemove] = useState(false)
    const dispatch = useDispatch()
    const loggedInUser = useSelector(state => state.userReducer.loggedInUser)

    // useEffect(() => {
    //     dispatch(loadUser('6023c5ecf8814f14258b09a4'))
    // }, [])

    const handleChange = (ev) => {
        setCategoryValue(ev.target.value)
    }

    const onAddCategory = async (ev) => {
        ev.preventDefault()
        const user = await userService.updateCategory(loggedInUser, categoryValue, 'add')
        dispatch(updateUser(user))
        setIsAddCategoryModal(!isAddCategoryModal)
        setCategoryValue('')
        setIsModalMessageAdd(true)
        setTimeout(() => {
            setIsModalMessageAdd(false)
        }, 2000);
    }
    
    const onRemoveCategory = async (category) => {
        const user = await userService.updateCategory(loggedInUser, category, 'remove')
        dispatch(updateUser(user))
        setIsModalMessageRemove(true)
        setTimeout(() => {
            setIsModalMessageRemove(false)
        }, 2000);
    }

    const onEditCategory = async (ev, oldCategory, newCategory) => {
        ev.preventDefault()
        const user = await userService.changeCategory(loggedInUser, oldCategory, newCategory)
        dispatch(updateUser(user))
    }

    return (
        <div className="categories-box">
            <Slide in={isModalMessageAdd}>
            <div className="added-category-message-modal">New Category Added Successfuly</div>
            </Slide>
            <Slide in={isModalMessageRemove}>
            <div className="added-category-message-modal">Category Removed Successfuly</div>
            </Slide>
            <h1 className="categories-box-heading">Categories</h1>
            <i onClick={() => {setIsAddCategoryModal(!isAddCategoryModal)}} className="fas fa-plus-circle add-category-list-btn fa-2x"></i>
            <Grow in={isAddCategoryModal}>
            <div className="add-new-category-box">
             <form>
                <input className="add-new-category-input" type="text" value={categoryValue} placeholder="Add New Category" onChange={(ev) => { handleChange(ev) }} />
                <button className="add-new-category-btn" onClick={(ev) => { onAddCategory(ev) }}>Add</button>
            </form>
            </div>
            </Grow>
            {loggedInUser && loggedInUser.categories.map(category => <CategoryPreview
                key={category}
                category={category}
                onRemoveCategory={onRemoveCategory}
                onEditCategory={onEditCategory} />)}
        </div>
    )
}
