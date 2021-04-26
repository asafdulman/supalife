import { NavLink } from "react-router-dom";
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { hideBottomBar, showBottomBar } from "../store/actions/bottomBarActions";

export default function BottomBar() {

    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const isShown = useSelector(state => state.bottomBarReducer.isShown)
    const loggedInUser = useSelector(state => state.userReducer.loggedInUser)
    const dispatch = useDispatch()

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
        ((prevScrollPos > currentScrollPos && prevScrollPos - currentScrollPos > 5) || currentScrollPos < 10) ? dispatch(showBottomBar()) :dispatch(hideBottomBar()) 
        // setVisible((prevScrollPos > currentScrollPos && prevScrollPos - currentScrollPos > 5) || currentScrollPos < 10);
        setPrevScrollPos(currentScrollPos);
    }, 100);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [prevScrollPos, isShown, handleScroll]);

    return (
        <div className={isShown ? 'bottom-bar-box-visiable' : 'bottom-bar-box-not-visiable'}>
            <NavLink activeClassName="selected-ling" exact to="/">
                <div className="bottom-bar-cat-box">
                    <i className="fas fa-2x fa-house-user"></i>
                    <span>{loggedInUser ? loggedInUser.userName : 'Home'}</span>
                </div>
            </NavLink>
            <NavLink activeClassName="selected-ling" to="categories">
                <div className="bottom-bar-cat-box">
                    <i className="fas fa-2x fa-chart-pie"></i>
                    <span>Categories</span>
                </div>
            </NavLink>
            <NavLink activeClassName="selected-ling" to="actions">
                <div className="bottom-bar-cat-box">
                    <i className="fas fa-2x fa-tasks"></i>
                    <span>Actions</span>
                </div>
            </NavLink>
            <NavLink activeClassName="selected-ling" to="dailyrating">
                <div className="bottom-bar-cat-box">
                    <i className="fas fa-2x fa-signal"></i>
                    <span>Stats</span>
                </div>
            </NavLink>
            <NavLink activeClassName="selected-ling" to="ratethisday">
                <div className="bottom-bar-cat-box">
                    <i className="fas fa-2x fa-star"></i>
                    <span>Rate</span>
                </div>
            </NavLink>
        </div>
    )
}
