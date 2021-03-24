export const categoryService = {
    getStaticCategories
}

function getStaticCategories(gender) {
    const maleCategories = [
        'Family',
        'Work',
        'Friends',
        'Kids',
        'General',
        'Wife',
        'Hobbies',
        'Fitness',
        'Nutrition',
        'Finance'
    ]
    const femaleCategories = [
        'Family',
        'Work',
        'Friends',
        'Kids',
        'General',
        'Husband',
        'Hobbies',
        'Fitness',
        'Nutrition',
        'Finance'
    ]
    return gender === 'male' ? maleCategories : femaleCategories
}