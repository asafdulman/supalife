import { NavLink } from "react-router-dom";
import { useState, useEffect } from 'react';

export default function BottomBar() {

    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);

    const debounce = (func, wait, immediate) => {
        var timeout;
        return function () {
            var context = this, args = arguments;
            var later = function () {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    };

    const handleScroll = debounce(() => {
        const currentScrollPos = window.pageYOffset;
        setVisible((prevScrollPos > currentScrollPos && prevScrollPos - currentScrollPos > 35) || currentScrollPos < 10);
        setPrevScrollPos(currentScrollPos);
    }, 100);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [prevScrollPos, visible, handleScroll]);
    
    return (
        <div className={visible ? 'bottom-bar-box-visiable' : 'bottom-bar-box-not-visiable' }>
            <NavLink to="/">
                <div className="bottom-bar-cat-box">
                    <i className="fas fa-2x fa-house-user"></i>
                    <span>Home</span>
                </div>
            </NavLink>
            <NavLink to="categories">
                <div className="bottom-bar-cat-box">
                    <i className="fas fa-2x fa-chart-pie"></i>
                    <span>Categoeries</span>
                </div>
            </NavLink>
            <NavLink to="actions">
                <div className="bottom-bar-cat-box">
                    <i className="fas fa-2x fa-tasks"></i>
                    <span>Actions</span>
                </div>
            </NavLink>
            <NavLink to="dailyrating">
                <div className="bottom-bar-cat-box">
                    <i className="fas fa-2x fa-signal"></i>
                    <span>Stats</span>
                </div>
            </NavLink>
            <NavLink to="ratethisday">
                <div className="bottom-bar-cat-box">
                    <i className="fas fa-2x fa-star"></i>
                    <span>Rate</span>
                </div>
            </NavLink>
        </div>
    )
}
