
import { useSelector } from 'react-redux'

export function ProgressBar() {

    const total = useSelector(state => state.progressBarReducer.totalCategories)
    const completed = useSelector(state => state.progressBarReducer.completed)

    const containerStyles = {
        height: 10,
        width: '100%',
        backgroundColor: "#fff",
        borderRadius: 50,
        margin: 15
      }
    
      const fillerStyles = {
        transition: 'all 0.2s ease',
        height: '100%',
        width: `${completed/total*100}%`,
        backgroundColor: '#5F2EEA',
        borderRadius: 'inherit',
        textAlign: 'right'
      }
    
      const labelStyles = {
        padding: 5,
        color: '#fff',
        fontWeight: 'bold'
      }

    return (
        <div style={containerStyles} className="outer-progressbar-box">
            <div style={fillerStyles} className="inner-progressbar-box">
                {/* <span style={labelStyles}>{`${completed/total*100}%`}</span> */}
            </div>
        </div>
    )
}
