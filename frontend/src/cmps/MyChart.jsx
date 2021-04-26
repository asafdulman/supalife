import { Bar, Line } from 'react-chartjs-2';
import { NavLink } from "react-router-dom";

export function MyChart({ dailyRating, pickedDate, loggedInUser, selectedCategory, categoryData }) {

    const chosenDateData = dailyRating.find(day => day.date === pickedDate)
    if (!chosenDateData) return <div className="daily-rating-no-data-box">Want to get some important information? <NavLink to="/ratethisday">Rate more!</NavLink> </div>;
    const resBar = chosenDateData.rating.map(category => category.rate)
    const dayIndex = loggedInUser?.dailyRating.findIndex(day => day.date === pickedDate)
    const rangedDates = loggedInUser?.dailyRating.slice(dayIndex - 3, dayIndex + 1)
    const daysToShow = rangedDates.map(day => day.date)

    const getDailyAvg = () => {
        const dailyAvgs = rangedDates.map(day => {
            const sum = day.rating.reduce((acc, value) => {
                value.rate = (typeof value.rate === 'string') ? +value.rate : value.rate
                return acc + value.rate
            }, 0)
            let avg = sum / day.rating.length
            avg = isNaN(avg) ? 0 : avg 
            return avg
        })
        return dailyAvgs
    }

    const dataByDateBar = {
        labels: [...loggedInUser.categories],
        datasets: [
            {
                label: `By Category ${pickedDate}`,
                backgroundColor: 'rgba(100,99,132,0.2)',
                borderColor: '#5F2EEA',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: '#5F2EEA',
                data: [...resBar]
            }
        ]
    };
    const dataByDateLine = {
        labels: [...daysToShow],
        datasets: [
            {
                label: `Daily Average`,
                backgroundColor: 'rgba(0,99,132,0.2)',
                borderColor: '#5F2EEA',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: '#5F2EEA',
                data: [...getDailyAvg()]
            }
        ]
    };
    const dataByCategory = {

        labels: [...daysToShow],
        datasets: [
            {
                label: `${selectedCategory}`,
                backgroundColor: 'rgba(0,0,0,0.3)',
                borderColor: '#5F2EEA',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: '#5F2EEA',
                data: [...categoryData]
            }
        ]
    };

    return (
        <div className="charts-box">
            {!selectedCategory ? <Line data={dataByDateLine} /> : <Line data={dataByCategory} />}
            <hr/>
            {!selectedCategory && <Bar data={dataByDateBar} />}
        </div>
    )
}
