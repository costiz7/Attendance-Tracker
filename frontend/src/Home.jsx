//IN LUCRUUUUU NU UMBLATZIIII
/////////////////////////////
import { useNavigate } from "react-router-dom";
import './Home.css';

export default function Home() {
    return (
        <div className="main-menu-wrapper">
            <EventCard title="Groups" imgSrc="./groups.webp" imgAlt="Join an Event Card" path="/groups"/>
            <EventCard title="Join" imgSrc="./join.webp" imgAlt="Join Card" path="/join"/>
            <EventCard title="Organize" imgSrc="./organize.webp" imgAlt="Organize Card" path="/organize"/>
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
            <h1>{title}</h1>
            <img src={imgSrc} alt={imgAlt}/>
        </div>
    );
}