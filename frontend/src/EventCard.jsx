import { useNavigate } from "react-router-dom";
import './Styles/EventCard.css';

export default  function EventCard({title, imgSrc, imgAlt, path}) {
    const navigate = useNavigate();

    function handleClick() {
        navigate(`${path}`);
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