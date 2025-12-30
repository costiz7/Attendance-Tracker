import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './Styles/CreateEvent.css';
import NavBar from "./NavBar";

export default function CreateEvent() {
    //State for form data
    const [formData, setFormData] = useState({
        groupId: '',
        name: '',
        startTime: '',
        endTime: ''
    });

    const navigate = useNavigate();

    //State for user's groups and errors
    const [groups, setGroups] = useState([]);
    const [error, setError] = useState('');

    //Fetch groups in our previous state
    useEffect(() => {
        const fetchGroups = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/groups`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                const data = await response.json();

                if(response.ok) {
                    setGroups(data);
                }
            } catch (error) {
                console.error("Error fetching groups: ", error);
            }
        };

        fetchGroups();
    }, []);

    //This function updates our formInput
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleClick = async (e) => {
        e.preventDefault();
        setError('');

        if (!formData.groupId || !formData.name || !formData.startTime || !formData.endTime) {
            setError("All fields are required!");
            return;
        }

        if (new Date(formData.endTime) <= new Date(formData.startTime)) {
            setError("End time must be after start time!");
            return;
        }

        const token = localStorage.getItem('token');

        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/events`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    groupId: formData.groupId,
                    name: formData.name,
                    startTime: new Date(formData.startTime).toISOString(),
                    endTime: new Date(formData.endTime).toISOString()
                })
            });

            const data = await response.json();

            if (response.ok) {
                navigate('/home/organize/createdevent'); 
            } else {
                throw new Error(data.message || 'Failed to create event');
            }

        } catch (err) {
            console.error(err);
            setError(err.message);
        }
    };
    

    return (
        <div className="create-event-wrapper">
            <NavBar />
            <div className="event-form-wrapper">
                <h1>Create an Event</h1>

                <form className="event-form">
                    <div className="input-group">
                        <label htmlFor="groupId">Select Group</label>
                        <select name="groupId" id="groupId" className="event-input" value={formData.groupId} onChange={handleChange}>
                            <option value="">-- Choose a group --</option>
                            {groups.map((group) => (
                                <option key={group.id} value={group.id}>{group.name} #{group.id}</option>
                            ))}
                        </select>
                    </div>

                    <div className="input-group">
                        <label htmlFor="name">Event Name</label>
                        <input 
                            type="text" 
                            name="name" 
                            id="name"
                            className="event-input" 
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="startTime">Start Time</label>
                        <input 
                            type="datetime-local" 
                            name="startTime" 
                            id="startTime"
                            className="event-input"
                            value={formData.startTime}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="endTime">End Time</label>
                        <input 
                            type="datetime-local" 
                            name="endTime" 
                            id="endTime"
                            className="event-input"
                            value={formData.endTime}
                            onChange={handleChange}
                        />
                    </div>

                    { error && <p id="error-message">{error}</p> }

                    <button className="btn-create-event" onClick={handleClick}>Create Event</button>
                </form>
            </div>
        </div>
    );
}