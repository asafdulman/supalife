import httpService from "./httpService"

export const userService = {
    updateStaticCategory,
    getUser,
    updateUserActions,
    // rateCategory,
    updateDailyData,
    updateCategory,
    changeCategory: editCategory,
    login,
    signup,
    updateUserCreds,
    // updateDailySummary,
}

async function updateUserActions(loggedInUser) {
    const user = await httpService.put(`/user/updateActionsList/${loggedInUser._id}`, {loggedInUser})
    return user
}

async function getUser(id) {
    const user = await httpService.get(`/user/${id}`)
    return user
}

async function updateStaticCategory(loggedInUser, category) {
    const user = await httpService.put(`/user/staticCategory/${loggedInUser._id}`, { loggedInUser, category })
    return user

}

async function updateDailyData(loggedInUser, dailyData, date) {
    date = !date ? getCurrDate() : date
    const user = await httpService.put(`/user/dailydata/${loggedInUser._id}`, { loggedInUser, dailyData, date })

    return user
}


// async function rateCategory(loggedInUser, category, rate, desc) {
//     const date = getCurrDate()
//     const user = await httpService.put(`/user/rate/${loggedInUser._id}`, { loggedInUser, category, rate, desc, date})
//     return user
// }

function getCurrDate() {
    let date = new Date()
    const dateStr = ('0' + (date.getMonth()+1)).slice(-2) + '/' +  ('0' + date.getDate()).slice(-2) + '/' + date.getFullYear();
    console.log('dateSter', dateStr);
    return dateStr
}

async function updateCategory(loggedInUser, category, action) {
    const user = await httpService.put(`/user/category/${loggedInUser._id}`, { user:loggedInUser, category, action })
    return user
}
async function editCategory(loggedInUser, oldCategory, newCategory) {
    const user = await httpService.put(`/user/categoryChange/${loggedInUser._id}`, { user:loggedInUser, oldCategory, newCategory })
    return user
}

async function login(userCreds) {
    const res = await httpService.post('/user/login', userCreds)
    return res
}
async function signup(userCreds) {
    const res = await httpService.post('/user/signup', userCreds)
    return res
}

async function updateUserCreds(loggedInUser, userName, age) {
    const res = await httpService.put(`/user/creds/${loggedInUser._id}`, { loggedInUser, userName, age })
    return res
}




// async function updateDailySummary(loggedInUser, summary) {
//     const date = getCurrDate()
//     const user = await httpService.put(`/user/summary/${loggedInUser._id}`, { loggedInUser,summary, date })
//     console.log('user in summary', user);
//     return user
// }

