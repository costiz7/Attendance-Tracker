import './Styles/SuccessPage.css';
import { useNavigate } from 'react-router-dom';

export default function SuccessPage({ title, btnText, path }){
    const navigate = useNavigate();

    function handleClick(){
        navigate(path);
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