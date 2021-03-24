import { useEffect, useState } from "react"


export function StaticCategoryPreview({ category, loggedInUser, updateCategoryInUser }) {

    const [isCategory, setIsCategory] = useState()

    useEffect(() => {
        isCategoryInUser()
    }, [loggedInUser])

    const updateCategory = () => {
        if (!loggedInUser) return;
        updateCategoryInUser(category)
        setIsCategory(!isCategory)
    }

    const isCategoryInUser = () => {
        const isCategoryExists = loggedInUser?.categories.some(cat => cat === category)
        setIsCategory(isCategoryExists)
    }

    return (
        <div onClick={() => { updateCategory() }} className={isCategory ? 'category-exists' : 'category-not-exists'}>
            <p>{category} </p>
            {isCategory && <span className="added-ribbon"><i className="fas fa-star"></i></span>}
            {/* {isCategory && <span className="added-ribbon">Added</span>} */}
        </div>
    )
}
