import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import QRCode from "react-qr-code";
import './Styles/EventDashboard.css';
import NavBar from './NavBar';

//Our event dashboard component for seeing event details
export default function EventDashboard() {
    const { id } = useParams();

    const [event, setEvent] = useState(null);
    const [attendees, setAttendees] = useState([]);

    let eventStatus = "CLOSED";
    let isEventOpen = false;

    if(event) {
        const now = new Date();
        const start = new Date(event.startTime);
        const end = new Date(event.endTime);

        if(now >= start && now <= end) {
            eventStatus = "OPENED";
            isEventOpen = true;
        } else if(now < start) {
            eventStatus = "UPCOMING";
            isEventOpen = false;
        }
    }

    //Fetch Event details
    useEffect(() => {
        const fetchEventDetails = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/events/${id}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                const data = await response.json();
                if(response.ok) {
                    setEvent(data);
                }
            } catch (error) {
                console.error(err);
            }
        };
        if(id) {
            fetchEventDetails();
        }
    }, [id]);

    //Fetch Attendees (auto-refresh)
    useEffect(() => {
        const fetchAttendees = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/attendances/event/${id}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                const data = await response.json();
                if(response.ok) {
                    setAttendees(data);
                }
            } catch (error) {
                console.error(err);
            }
        };

        fetchAttendees();
        const intervalId = setInterval(fetchAttendees, 3000);
        return () => clearInterval(intervalId);
    }, [id]);

    if (!event) {
        return (
            <div className="event-dashboard-wrapper">
                <NavBar />
            </div>
        );
    }

    return (
        <div className="event-dashboard-wrapper">
            <NavBar />
            <div className="event-wrapper">
                <div className="info-card">
                    <div className="header-wrapper">
                        <h1 className="event-title">{event.name}</h1>
                    </div>
                    <div className="event-card-wrapper">
                        <div className="status-wrapper">
                            <span className={`${isEventOpen ? 'status-open' : 'status-closed'}`}>{eventStatus}</span>
                        </div>
                        <div className="qr-wrapper">
                            <QRCode value={event.accessCode} size={250} bgColor='#FFFFFF' fgColor='#000000'/>
                        </div>

                        <div className="code-wrapper">
                            <h2 className="code-text">{event.accessCode}</h2>
                        </div>

                        <div className="date-wrapper">
                            <div className="date-row">
                                <span>BEG - </span>
                                <strong>{new Date(event.startTime).toLocaleString('ro-RO', {
                                    year: 'numeric',
                                    month: 'numeric',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}</strong>
                            </div>
                            <div className="date-row">
                                <span>END - </span>
                                <strong>{new Date(event.endTime).toLocaleString('ro-RO', {
                                    year: 'numeric',
                                    month: 'numeric',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}</strong>
                            </div>
                        </div>
                    </div>
                    
                </div>

                <div className="attendees-section">
                    <h1>Live Attendees - {attendees.length} </h1>

                    <div className="attendees-list">
                        {attendees.length === 0 ? (
                            <p className="no-data-text">No attendees yet.</p>
                        ) : (
                            attendees.map((att) => (
                                <div key={att.id} className="attendee-wrapper">
                                    <span className="attendee-name">#{att.userId} - {att.user.name}</span>
                                    <span className="attendee-email">{att.user.email}</span>
                                    <span className="attendee-time">
                                        {new Date(att.joinedAt).toLocaleString('ro-RO', {
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </span>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}