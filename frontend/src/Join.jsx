import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Html5QrcodeScanner } from "html5-qrcode";
import './Join.css';
import NavBar from "./NavBar";

export default function Join(){

    const navigate = useNavigate();
    const [scanResult, setScanResult] = useState(null);
    const [manualCode, setManualCode] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {

        const readerElement = document.getElementById("reader");
        if (readerElement) {
            readerElement.innerHTML = "";
        }

        const scanner = new Html5QrcodeScanner(
            "reader",
            { 
                fps: 10,
                qrbox: {
                    width: 200,
                    height: 200
                },
                rememberLastUsedCamera: false
            },
            false
        );

        const onScanSuccess = (decodedText) => {
            scanner.clear();
            setScanResult(decodedText);
            handleAttendance(decodedText);
        };

        const onScanFailure = (error) => {
            //Ignore
        };

        scanner.render(onScanSuccess, onScanFailure);

       return () => {
            scanner.clear().catch(error => {
                console.warn("Eroare la ștergerea scanner-ului (poate fi ignorată):", error);
            });
        };
    }, []);

    const handleAttendance = async (eventId) => {
        const token = localStorage.getItem('token');

        if(!token){
            setMessage("You are not authenticated");
            return;
        }

        if(!eventId) {
            setMessage("Invalid code. Please try again!");
            return;
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/attendance`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ eventId: eventId })
            });

            const data = await response.json();

            if(response.ok){
                setMessage("Attendance logged successfully!");
                setTimeout(() => navigate('/home'), 2000);
            } else {
                setMessage(`Error: ${data.message || 'Something went wrong'}`);
            }
        } catch (error) {
            console.error(error);
            setMessage("Network error");
        }
    };

    const handleManualSubmit = (e) => {
        e.preventDefault();
        handleAttendance(manualCode);
    }

    return (
        <div className="menu-wrapper">
            <NavBar />
            <div className="join-wrapper">
                <h1>Join an event</h1>
                <h3>Scan the QR code</h3>

                <div id="reader"></div>

                {scanResult && <p>Cod detectat: {scanResult}</p>}

                <p>OR</p>

                <form onSubmit={handleManualSubmit}>
                    <input 
                        type="text" 
                        id="manualCode"
                        placeholder="Enter the Code"
                        value={manualCode}
                        onChange={(e) => setManualCode(e.target.value)}
                        className="code-input"
                    />
                    <button type="submit" className="join-button">
                        Send
                    </button>
                </form>

                {message && <h3 style={{color: message.includes('Error') ? 'red' : 'green'}}>{message}</h3>}
            </div>
        </div>
        
    );
}