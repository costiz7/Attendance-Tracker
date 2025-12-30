import './Styles/SuccessPage.css';
import { useNavigate, useLocation } from 'react-router-dom';

export default function SuccessPage({ title, btnText, path }){
    const navigate = useNavigate();
    const location = useLocation(); //this hook reads data sent through navigation

    function handleClick(){
        if (location.state && location.state.createdEventId) {
            navigate(`/event/${location.state.createdEventId}`);
        } else {
            navigate(path);
        }
    }

    return (
        <div className="page-wrapper">
            <div className="header-wrapper">
                <h1>{title}</h1>
            </div>
            <img src="/checkmark.webp" alt="Success Icon" />
            <button onClick={ handleClick }>{btnText}</button>
        </div>
    );
}