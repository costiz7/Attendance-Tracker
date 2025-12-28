import { useNavigate } from "react-router-dom";
import './Home.css';
import NavBar from './NavBar.jsx';

export default function Home() {
    return (
        <div className="home-wrapper">
            <NavBar />
            <div className="cards">
                <EventCard title="Join an Event" imgSrc="./join.webp" imgAlt="Join Card" path="/join"/>
                <EventCard title="Organize" imgSrc="./organize.webp" imgAlt="Organize Card" path="/organize"/>
            </div>
        </div>
    );
}

function EventCard({title, imgSrc, imgAlt, path}) {
    const navigate = useNavigate();

    function handleClick() {
        navigate(path);
    }

    return(
        <div className="card-wrapper" onClick={handleClick}>
            <div className="card-header">
                <h1>{title}</h1>
            </div>
            <img src={imgSrc} alt={imgAlt}/>
        </div>
    );
}