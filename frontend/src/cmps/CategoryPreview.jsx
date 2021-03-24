import { useState } from 'react'
import {Zoom} from '@material-ui/core'

export function CategoryPreview({ category, onRemoveCategory, onEditCategory }) {

    const [categoryValue, setCategoryValue] = useState('')
    const [editModal, setEditModal] = useState(false)

    const handleChange = (ev) => {
        setCategoryValue(ev.target.value)
    }

    const editCategory = (ev) => {
        setEditModal(!editModal)
        onEditCategory(ev, category, categoryValue)
    }

    return (
        <div className={editModal ? "category-preview-box-edit-open" : "category-preview-box"}>
            <h2 className="category-preview-heading">{category}</h2>
            <Zoom in={editModal}>
            <form className="edit-category-box">
                <input className="edit-category-input" type="text" value={categoryValue} placeholder="Edit Category" onChange={(ev) => { handleChange(ev) }} />
                <button className="edit-category-save-btn" onClick={(ev) => editCategory(ev)}><i className="fas fa-check"></i></button>
            </form>
            </Zoom>
            <div className="category-btns-box">
                <button className="edit-category-btn" onClick={() => setEditModal(!editModal)}><i className="fas fa-pen"></i></button>
                <button className="delete-category-btn" onClick={() => onRemoveCategory(category)}><i className="far fa-trash-alt"></i></button>
            </div>
        </div>
    )
}
