import { DailyRatingPreview } from "./DailyRatingPreview";

export function DailyRatingList({ pickedDate, ratingList, date}) {
    const getDay = () => {
       return date === pickedDate
    } 
    
    return (
        <div>
            {getDay() && date}
            {getDay() && ratingList.map(category => <DailyRatingPreview key={category.category} category={category} />)}
        </div>
    )
}
