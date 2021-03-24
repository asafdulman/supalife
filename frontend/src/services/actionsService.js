import httpService from "./httpService"

export const actionsService = {
    addAction,
    updateActionDone,
    updateActionEdit,
    removeAction,
    suggestedActions
}

async function addAction(loggedInUser, action) {
    const user = await httpService.put(`/user/actions/add/${loggedInUser._id}`, {loggedInUser, action})
    return user
}

async function updateActionDone(loggedInUser, action) {
    const user = await httpService.put(`/user/actions/updateDone/${loggedInUser._id}`, {loggedInUser, action})
    return user
}
async function updateActionEdit(loggedInUser, originalAction, editedAction) {
    const user = await httpService.put(`/user/actions/edit/${loggedInUser._id}`, {loggedInUser, originalAction, editedAction})
    return user
}

async function removeAction(loggedInUser, action) {
    const user = await httpService.put(`/user/actions/delete/${loggedInUser._id}`, {loggedInUser, action})
    return user
}

function suggestedActions() {
    const suggestedActions = [
        {
            title :  'Talk to mom',
            category : 'Family',
            isDone : false,
            todoTime : '',
            createdAt : '',
            timeStamp : ''
        },
        {
            title :  'Go for a run',
            category : 'Fitness',
            isDone : false,
            todoTime : '',
            createdAt : '',
            timeStamp : ''
        },
        {
            title :  'Buy something for your wife',
            category : 'Spouse',
            isDone : false,
            todoTime : '',
            createdAt : '',
            timeStamp : ''
        },
        {
            title :  'Take your kids to a trip',
            category : 'Kids',
            isDone : false,
            todoTime : '',
            createdAt : '',
            timeStamp : ''
        },
        {
            title :  'Plan what your are going to eat this upcoming week',
            category : 'Nutrition',
            isDone : false,
            todoTime : '',
            createdAt : '',
            timeStamp : ''
        },
        {
            title :  'Start a new book',
            category : 'General',
            isDone : false,
            todoTime : '',
            createdAt : '',
            timeStamp : ''
        },
        {
            title :  'Go over the bills and see where you can save some money',
            category : 'Finance',
            isDone : false,
            todoTime : '',
            createdAt : '',
            timeStamp : ''
        },
        {
            title :  'Set up lunch with your brothers and sisters',
            category : 'Family',
            isDone : false,
            todoTime : '',
            createdAt : '',
            timeStamp : ''
        },
        {
            title :  'Stop eating sweets for a week',
            category : 'Nutrition',
            isDone : false,
            todoTime : '',
            createdAt : '',
            timeStamp : ''
        },
        {
            title : 'Call dad',
            category : 'Family',
            isDone : false,
            todoTime : '',
            createdAt : '',
            timeStamp : ''
        },
        {
            title : 'Read about your child development',
            category : 'Kids',
            isDone : false,
            todoTime : '',
            createdAt : '',
            timeStamp : ''
        },
        {
            title : 'Arrange a nice evening with friends',
            category : 'Friends',
            isDone : false,
            todoTime : '',
            createdAt : '',
            timeStamp : ''
        },
        {
            title : 'Read about being a successful worker',
            category : 'Work',
            isDone : false,
            todoTime : '',
            createdAt : '',
            timeStamp : ''
        },
        {
            title : 'Ask friends about being a better parent',
            category : 'Kids',
            isDone : false,
            todoTime : '',
            createdAt : '',
            timeStamp : ''
        },
        {
            title : 'Surprise partner with a Pizza',
            category : 'Spouse',
            isDone : false,
            todoTime : '',
            createdAt : '',
            timeStamp : ''
        },
        {
            title : 'Clean the house',
            category : 'Spouse',
            isDone : false,
            todoTime : '',
            createdAt : '',
            timeStamp : ''
        },
        {
            title : 'Send parents photos of kids',
            category : 'Family',
            isDone : false,
            todoTime : '',
            createdAt : '',
            timeStamp : ''
        },
        {
            title : 'Clear time for training session',
            category : 'Fitness',
            isDone : false,
            todoTime : '',
            createdAt : '',
            timeStamp : ''
        },
        {
            title : 'Eat a big healty salad',
            category : 'Nutrition',
            isDone : false,
            todoTime : '',
            createdAt : '',
            timeStamp : ''
        },
        {
            title : 'Buy flowers for wife',
            category : 'Spouse',
            isDone : false,
            todoTime : '',
            createdAt : '',
            timeStamp : ''
        },
        {
            title : 'Call grandparents',
            category : 'Family',
            isDone : false,
            todoTime : '',
            createdAt : '',
            timeStamp : ''
        },
        {
            title : 'Sign up for the GYM',
            category : 'Fitness',
            isDone : false,
            todoTime : '',
            createdAt : '',
            timeStamp : ''
        }
    ]

    return suggestedActions;
}



