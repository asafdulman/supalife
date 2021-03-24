import path from '../assets/img/Path.png'
import Shape from '../assets/img/Shape.png'


export function Test() {
    return (
        <div>
            <h1>test</h1>
            <img src={path} alt="" />
            <div className="background-img">
                HEY
            </div>
            <div style={{
                backgroundImage: `url(${Shape})`,
                backgroundRepeat: 'no-repeat'
            }}>
                HEY
            </div>
        </div>
    )
}
