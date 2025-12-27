import './ConfirmationPage.css';
import { useNavigate } from 'react-router-dom';

export default function ConfirmationPage(){
    const navigate = useNavigate();

    function goToLogin(){
        navigate('/login');
    }

    return (
        <div className="page-wrapper">
            <div className="header-wrapper">
                <h1>You're in!</h1>
            </div>
            <img src="/yourein.webp" alt="You're In Icon" />
            <button onClick={ goToLogin }>Go to the Log-in page</button>
        </div>
    );
}