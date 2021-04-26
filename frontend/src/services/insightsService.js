export const insightService = {
    getWeeklyAvg,
    getGeneralInsight,
    getInsightPerCategory
}

function getWeeklyAvg(avg) {
    if (avg >= 3.5) {
        return insights[0].content
    } else if (avg <= 2.7) {
        return insights[1].content
    }
}

function getGeneralInsight(totalAvg, chosenDayAvg) {
        if (totalAvg >= 3.5 && chosenDayAvg <= 2.7) {
            return insights[3].content
        } else if (totalAvg <= 3 && chosenDayAvg >= 3.5) {
            return insights[2].content
        }
}

function getInsightPerCategory(category, avg) {
    if (!avg) return;
    if (category === 'Family' && avg <= 2.5) {
        return 'Last few days were pretty bad with your family? They were there from the beginning and most likely to be there until the end. Don\'t forget it!'
    } else if (category === 'Family' && avg >= 2.5 && avg <= 3.5) {
        return 'Things looks pretty calm with the Family in the last few days. Are you satisfied with that?'
    } else if (category === 'Family' && avg >= 3.5) {
        return 'Family side looks good lately, keep it up!'
    }

    if (category === 'Work' && avg <= 2.5) {
        return 'Is everything ok at work? Be active and try to solve problems before they emerge.'
    } else if (category === 'Work' && avg >= 2.5 && avg <= 3.5) {
        return 'Work is going smooth lately? Make sure you are not entering the work comfort zone.'
    } else if (category === 'Work' && avg >= 3.5) {
        return 'Work side looks great! Keep up the good work!'
    }

    if (category === 'Friends' && avg <= 2.5) {
        return 'As a friendly person, if you think you should try harder with your friends, do it!'
    } else if (category === 'Friends' && avg >= 2.5 && avg <= 3.7) {
        return 'Your friends love you. Are you happy with the current situation? Good.'
    } else if (category === 'Friends' && avg >= 3.5) {
        return 'Nothing like good old friends to spark life'
    }
    
    if (category === 'Kids' && avg <= 2.5) {
        return 'Kids aren\'t easy, but remember that they need you and look up to you. And most important, love you!'
    } else if (category === 'Kids' && avg >= 2.5 && avg <= 3.7) {
        return 'You are the most important for your kids. Even if they don\'t know it yet, you do. Spend more time with them'
    } else if (category === 'Kids' && avg >= 3.5) {
        return 'Be happy with what you have with your kids! Appreciate it and embrace every moment.'
    }
    if (category === 'Fitness' && avg <= 2.5) {
        return 'Working out is good for body, but also for your mental health.'
    } else if (category === 'Kids' && avg >= 2.5 && avg <= 3.7) {
        return 'Keep up the good work. Maybe you can add one more session is your busy week?'
    } else if (category === 'Kids' && avg >= 3.5) {
        return 'Seems like you are in a great shape! keep it up!'
    }

}

const insights = [
    {
        rule: 'good week',
        content: 'It\'s been about a week with great rating. Keep it up!'
    },
    {
        rule: 'bad week',
        content: 'It\'s been about a week with pretty low rating. Try to think of ways to get better in this section.'
    },
    {
        rule: 'good day after bad days',
        content: 'Generally, Looks like things are getting better. Woohoo!!'
    },
    {
        rule: 'bad day after good days',
        content: 'Something went wrong? What happened that cause such a low rating?'
    },
    {
        rule: 'not rated',
        content: 'You have some missing data here. Finish all data rating and things will become clearer.'
    },

]