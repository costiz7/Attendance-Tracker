import { useNavigate } from "react-router-dom";
import './Home.css';

export default function Home() {
    return (
        <div className="home-wrapper">
            {/*Sometime in the future a Navbar will be implemented */}
            <div className="cards">
                <EventCard title="Groups" imgSrc="./groups.webp" imgAlt="Join an Event Card" path="/groups"/>
                <EventCard title="Join" imgSrc="./join.webp" imgAlt="Join Card" path="/join"/>
                <EventCard title="Organize" imgSrc="./organize.webp" imgAlt="Organize Card" path="/organize"/>
            </div>
        </div>
    );
}

function EventCard({title, imgSrc, imgAlt, path}) {
    const navigate = useNavigate();

    function handleClick() {
        navigate(`/home${path}`);
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