import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import './Styles/YourGroups.css';
import { useState, useEffect } from "react";

export default function YourGroups(){

    const [groups, setGroups] = useState([]);
    const [events, setEvents] = useState([]);
    const [error, setError] = useState(null);
    const [activeIndex, setActiveIndex] = useState(null);
    const [loadingEvents, setLoadingEvents] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [groupToDelete, setGroupToDelete] = useState(null);

    const navigate = useNavigate();

    // 1. Initial fetch for all groups belonging to the user
    useEffect(() => {
        setError('');
        const fetchGroups = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/groups`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                const data = await response.json();
                setGroups(data);
                
            } catch (error) {
                setError("Groups are not accessible")
            }
        }
        fetchGroups();
    }, []);

    // 2. Fetches events for a specific group ID
    // Clears previous events immediately to avoid showing wrong data
    async function fetchEvents(id){
        setLoadingEvents(true);
        setEvents([]); 

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/events/group/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (!response.ok) throw new Error('Network response was not ok');
            
            const data = await response.json();
            setEvents(data);

        } catch (error) {
            setError("Events are not accessible");
        } finally {
            setLoadingEvents(false);
        }
    }

    // 3. Handles accordion toggle logic
    // If clicking the active group, close it. Otherwise, open and fetch data.
    const handleGroupClick = (index, groupId) => {
        if (activeIndex === index) {
            setActiveIndex(null);
            setEvents([]); 
        } else {
            setActiveIndex(index);
            fetchEvents(groupId);
        }
    };

    // 4. Modal logic for deletion
    const initiateDelete = (id) => {
        setGroupToDelete(id);
        setShowDeleteModal(true);
    };

    const cancelDelete = () => {
        setShowDeleteModal(false);
        setGroupToDelete(null);
    };

    // 5. Performs the actual delete API call
    const confirmDelete = async () => {
        if (!groupToDelete) return;

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/groups/${groupToDelete}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.ok) {
                // Update local state to remove the deleted group without refreshing
                setGroups(prevGroups => prevGroups.filter(group => group.id !== groupToDelete));
                setActiveIndex(null);
                setEvents([]);
            } else {
                const errData = await response.json();
                setError(errData.message || "Could not delete group");
            }
        } catch (error) {
            setError("System error while deleting");
        } finally {
            setShowDeleteModal(false);
            setGroupToDelete(null);
        }
    }

    // 6. Generic file download helper
    // Uses Blob to create a temporary download link
    const downloadFile = async (url, filename) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(url, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if(!response.ok){
                const err = await response.json();
                throw new Error(err.message || "Download failed");
            }

            const blob = await response.blob();
            const downloadUrl = window.URL.createObjectURL(blob);
            
            const link = document.createElement("a");
            link.href = downloadUrl;
            link.setAttribute("download", filename);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(downloadUrl);

        } catch (error) {
            console.error(error);
            alert("Could not download file: " + error.message);
        }
    };

    return (
        <div className="menu-wrapper">
            <NavBar />
            <div className="yourGroups-wrapper">
                <h1>Your Groups</h1>
                <div className="group-wrapper">
                    {groups.map((group, index) => {
                        const isActive = activeIndex === index;
                        return (
                            <div key={group.id} className={`accordion-item ${isActive ? 'active' : ''}`}>
                                <div className="accordion-header" onClick={() => handleGroupClick(index, group.id)}>
                                    <h3>{group.name}</h3>
                                    <span>{isActive ? '-' : '+'}</span>
                                </div>
                                {isActive && (
                                    <div className="accordion-content">
                                        <div className="content-actions">
                                            <h4>Events List</h4>
                                            {events.length > 0 && (
                                                <button className="csv-btn group-csv" onClick={() => downloadFile(`${import.meta.env.VITE_BASE_URL}/api/attendances/export/group/${group.id}`, `${group.name}_List.csv`)}>
                                                    Group To CSV
                                                </button>
                                            )}
                                        </div>

                                        <div className="event-wrapper">
                                            {loadingEvents ? (<p>Loading events...</p>) : events.length > 0 ? (
                                                <div className="events-list">
                                                    {events.map(event => (
                                                        <div key={event.id} className="event-item"> 
                                                            <div className="event-info-left">
                                                                <span className="event-name">{event.name}</span>
                                                            </div>
                                                            <div className="event-actions">
                                                                <button className="icon-btn" onClick={() => downloadFile(`${import.meta.env.VITE_BASE_URL}/api/attendances/export/event/${event.id}`, `${event.name}_List.csv`)}>
                                                                    To CSV
                                                                </button>
                                                                <button className="details-btn" onClick={() => navigate(`/event/${event.id}`)}>
                                                                    See Event
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <p>No events in this group.</p>
                                            )}
                                        </div>

                                        <button className="btn-delete" onClick={() => initiateDelete(group.id)}>
                                            Delete Group
                                        </button>
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>
            </div>

            {showDeleteModal && (
                <div className="modal-overlay">
                    <div className="modal-box">
                        <h3>Are you sure?</h3>
                        <p>This process cannot be undone.</p>
                        <div className="modal-buttons">
                            <button className="modal-btn cancel" onClick={cancelDelete}>Cancel</button>
                            <button className="modal-btn confirm" onClick={confirmDelete}>Yes, Delete</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}