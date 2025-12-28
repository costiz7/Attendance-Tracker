import './NavBar.css';
import { useNavigate } from 'react-router-dom';

export default function NavBar() {
    const navigate = useNavigate();

    function handleHomeBtn() {
        navigate('/home');
    }

    function handleLogOutBtn() {
        navigate('/login');
        //Clear all th info about the user when logging out
        localStorage.clear();
    }

    return (
        <div className="navbar-wrapper">
                <div className="home-btn">
                    <img className="nav-icon" src="./homeBtn.webp" alt="Home Button" onClick={handleHomeBtn}/>
                </div>
                <div className="logo">
                    <h1>Attendance Tracker</h1>
                </div>
                <div className="who-is">
                    <p className="name">Hi, {localStorage.getItem('user')}</p>
                    <div className="logout-btn">
                        <img className="nav-icon" src="./logoutBtn.webp" alt="Log Out Button" onClick={handleLogOutBtn}/>
                    </div>
                </div>
        </div>
    );
}