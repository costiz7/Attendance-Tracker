import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import './Auth.css';

export default function Register() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    async function handleRegister(e) {  

        e.preventDefault();
        setError('');

        if(!formData.username || formData.username.trim() === '' 
            || !formData.email || formData.email.trim() === ''
            || !formData.password || formData.password.trim() === ''
            || !formData.confirmPassword || formData.confirmPassword.trim() === ''){

                setError("All the fields are required!");
                return;

        }

        if(formData.username.length < 3){
            setError("The size of username must be over 3 characters!");
            return;
        }

        if(!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))){
            setError("Invalid email. Please try again.");
            return;
        }

        if(formData.password.length < 6){
            setError("Password must contain at least 6 characters.");
            return;
        }

        if(formData.password !== formData.confirmPassword){
            setError("Passwords are not matching");
            return;
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: formData.username,
                    email: formData.email,
                    password: formData.password
                })
            });
            
            const data = await response.json();

            if(!response.ok){
                throw new Error(data.message || 'Registration failed');
            }

            navigate('/confirmationPage');

        } catch (error) {
            console.error(error);
            setError(error.message);
        }

    }

    return (
        <div className="form-wrapper">
            <div className="title">
                <h1>Register</h1>
            </div>
            <div className="submit-wrapper">

                <div className="input-wrapper">
                    <label htmlFor="username">Username</label>
                    <input type="text" className="inputAuth" id="username" value={formData.username} onChange={handleChange}/>
                </div>
                
                <div className="input-wrapper">
                    <label htmlFor="email">Email</label>
                    <input type="text" className="inputAuth" id="email" value={formData.email} onChange={handleChange}/>
                </div>

                <div className="input-wrapper">
                    <label htmlFor="enterPassword">Enter Password</label>
                    <input type="password" className="inputAuth" id="password" value={formData.password} onChange={handleChange}/>
                </div>
                
                <div className="input-wrapper">
                    <label htmlFor="renterPassword">Confirm Password</label>
                    <input type="password" className="inputAuth" id="confirmPassword" value={formData.confirmPassword} onChange={handleChange}/>
                </div>
                
                {error && <div style={{ color: 'red', marginBottom: '10px', textAlign: 'center' }}>{error}</div>}

                <button className="btnSubmit" onClick={handleRegister}>Register</button>
                <p>Already have an account? <Link to="/login">Login here</Link></p>
            </div>
            
        </div>
    );
}