import './ConfirmationPage.css';
import userIcon from './assets/user.png';
import { useNavigate } from 'react-router-dom';

export default function ConfirmationPage(){
    const navigate = useNavigate();

    function goToLogin(){
        navigate('/login');
    }

    return (
        <div className="page-wrapper">
            <h1>You're in!</h1>
            <img className="poza" src={userIcon} alt="userImg" />
            <button className="btn-goLogin" onClick={ goToLogin }>Go to login page</button>
        </div>
    );
}