import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import './Styles/YourGroups.css';
import { useState, useEffect, Navigate } from "react";

export default function YourGroups(){

    const [groups, setGroups] = useState([]);
    const [events, setEvents] = useState([]);
    const [error, setError] = useState(null);
    const [activeIndex, setActiveIndex] = useState(null);
    const [loadingEvents, setLoadingEvents] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [groupToDelete, setGroupToDelete] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        setError('');
        const fetchGroups = async () => {
            try {

                const token = localStorage.getItem('token');
                const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/groups`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const data = await response.json();

                setGroups(data);
                
            } catch (error) {
                setError("Groups are not accessible")
            }
        }

        fetchGroups();

    }, []);

    async function fetchEvents(id){

        setLoadingEvents(true);
        setEvents([]);

        try {
            const token = localStorage.getItem('token');

            const fetchPromise = fetch(`${import.meta.env.VITE_BASE_URL}/api/events/group/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            }).then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            });

            const timerPromise = new Promise(resolve => setTimeout(resolve, 1000));

            const [data] = await Promise.all([fetchPromise, timerPromise]);

            setEvents(data);
        } catch (error) {
            setError("Events are not accessible");
        } finally {
            setLoadingEvents(false);
        }
        
    }

    const handleGroupClick = (index, groupId) => {
        if (activeIndex === index) {
            setActiveIndex(null);
            setEvents([]); 
        } else {
            setActiveIndex(index);
            fetchEvents(groupId);
        }
    };

    //functia care doar deschide fereastra
    const initiateDelete = (id) => {
        setGroupToDelete(id);      //tinem minte ID-ul grupului pe care s-a dat click
        setShowDeleteModal(true);  //aratam fereastra
    };

    //functia care inchide fereastra
    const cancelDelete = () => {
        setShowDeleteModal(false);
        setGroupToDelete(null);
    };

    const confirmDelete = async () => {
        if (!groupToDelete) return;

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/groups/${groupToDelete}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.ok) {
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

    const downloadFile = async (URL, filename) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(URL, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if(!response.ok){
                const err = await response.json();
                throw new Error(err.message || "Download failed");
            }

            const blob = await response.blob();

            //cream un link si dam click pe el
            const downloadUrl = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = downloadUrl;
            link.setAttribute("download", filename);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(downloadUrl); //curatam memoria

        } catch (error) {
            console.error(error);
            alert("Could not download file: " + error.message);
        }
    };

    const handleGroupExport = (groupId, groupName) => {
        const url = `${import.meta.env.VITE_BASE_URL}/api/attendances/export/group/${groupId}`;
        const filename = `${groupName}_List.csv`;
        downloadFile(url, filename);
    };

    const handleEventExport = (eventId, eventName) => {
        const url = `${import.meta.env.VITE_BASE_URL}/api/attendances/export/event/${eventId}`;
        const filename = `${eventName}_List.csv`;
        downloadFile(url, filename);
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
                                                <button 
                                                    className="csv-btn group-csv" 
                                                    onClick={() => handleGroupExport(group.id, group.name)}
                                                >
                                                    Group Report
                                                </button>
                                            )}
                                        </div>

                                        <div className="event-wrapper">
                                            {loadingEvents ? (
                                                <p>Loading events...</p>
                                            ) : events.length > 0 ? (
                                                <ul className="events-list">
                                                    {events.map(event => (
                                                        <li key={event.id} className="event-item">
                                                            
                                                            <div className="event-info-left">
                                                                <span className="event-name">{event.name}</span>
                                                            </div>
                                                            
                                                            <div className="event-actions">
                                                                <button 
                                                                    className="icon-btn"
                                                                    onClick={() => handleEventExport(event.id, event.name)}
                                                                    title="Download Attendees List"
                                                                >
                                                                    📥 CSV
                                                                </button>

                                                                <button 
                                                                    className="details-btn" 
                                                                    onClick={() => navigate(`/event/${event.id}`)}
                                                                >
                                                                    See details
                                                                </button>
                                                            </div>

                                                        </li>
                                                    ))}
                                                </ul>
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
                        <p>Do you really want to delete this group? This process cannot be undone.</p>
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