import './Styles/Home.css';
import NavBar from './NavBar.jsx';
import EventCard from "./EventCard.jsx";

export default function Home() {
    return (
        <div className="home-wrapper">
            <NavBar />
            <div className="cards">
                <EventCard title="Join an Event" imgSrc="/join.webp" imgAlt="Join Card" path="/home/join"/>
                <EventCard title="Organize" imgSrc="/organize.webp" imgAlt="Organize Card" path="/home/organize"/>
            </div>
        </div>
    );
}

