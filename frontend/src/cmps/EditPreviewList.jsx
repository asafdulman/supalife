import { EditRatePreview } from "./EditRatePreview"

export function EditPreviewList({ categories, modifyDataToGeneralForm, loggedInUser, pickedDate }) {
    return (
        <div className="edit-rate-list">
            {categories.map(category => <EditRatePreview key={category} modifyDataToGeneralForm={modifyDataToGeneralForm} pickedDate={pickedDate} category={category} loggedInUser={loggedInUser} />)}
        </div>
    )
}
