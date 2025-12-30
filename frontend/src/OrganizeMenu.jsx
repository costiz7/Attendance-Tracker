import NavBar from "./NavBar";
import EventCard from "./EventCard.jsx";
import './Styles/OrganizeMenu.css'

export default function OrganizeMenu() {
    return (
        <div className="organize-menu-wrapper">
            <NavBar />
            <div className="cards">
                <EventCard title="Create a Group" imgSrc="/creategroup.webp" imgAlt="Create a Group Card" path="/home/organize/creategroup" />
                <EventCard title="Create an Event" imgSrc="/createevent.webp" imgAlt="Create a Event Card" path="/home/organize/createevent" />
                <EventCard title="Your Groups" imgSrc="/yourgroups.webp" imgAlt="Your Groups Card" path="/home/organize/yourgroups" />
            </div>
        </div>
    );
}