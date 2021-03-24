
export function DailyRatingPreview({ category }) {

    return (
        <div>
            <span>{category.category} - </span>
            <span>{category.rate}</span>
                
        </div>
    )
}
