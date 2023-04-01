import { React } from 'react';
import { Link } from 'react-router-dom';
import "./userEggsBtn.css";

export const UserEggsBtn = () => {
    return (
        <Link to="/my-eggs" className="my-egg-link">
            <span className="btn-label">View your eggs</span>
        </Link>
    )
    
}