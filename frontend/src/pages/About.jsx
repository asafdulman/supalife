import {useHistory} from 'react-router-dom'

export function About() {
    
    let history = useHistory()
    const onBack = () => {
        history.push('/')
    }

    return (
        <div className="about-box">
            <i onClick={() => { onBack() }} className="fas about-back-btn fa-angle-double-left"></i>
            <h1 className="about-heading">What is SupaLife?</h1>
            <p>In our opinion, one can divide and evaluate it's life into categories.</p>
            <p>If you think about your day, and how it was, you will find out that some parts were good, and others weren't.</p>
            <hr />
            <p>For example, let's take Jane Doe. When she reflects about how her day was, she can say to herself that it was great. She had a great presentation at work and her boss loved it. Then on the way home a nice guy asked her number. </p>
            <p>Jane probably thinking this day was very positive, but has she thought about all aspects that make up her life?</p>
            <p>What about <span>family?</span>  When was the last time she called her dad or grandparents? What about <span>fitness</span> and <span>nutrition?</span>    Did she do something fun? When was the last time that happend?</p>
            <h2>Point is clear?</h2>
            <p>This platform will help you to</p>
            <ul>
                <li>Organize your life.</li>
                <li>Track and measure subjective data about life.</li>
                <li>Be better with yourself, in more aspects of life.</li>
                <li>Be better with others.</li>
            </ul>
        </div>
    )
}
