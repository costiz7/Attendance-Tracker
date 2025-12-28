import { Link, useNavigate } from "react-router-dom";
import './Auth.css';
import { useState } from "react";

export default function Login() {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    async function handleLogin(e){

        e.preventDefault();
        setError('');

        if(!formData.email || formData.email.trim() === ''
            || !formData.password || formData.password.trim() === ''){

                setError("All fields are required!");
                return;

        }

        if(!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))){
            setError("Invalid email. Please try again.");
            return;
        }

        try {
            
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password
                })
            });

            const data = await response.json();

            if(!response.ok){
                throw new Error(data.message || 'Login failed');
            }

            if(data.token){
                localStorage.setItem('token', data.token);
            }
            
            navigate('/home');

        } catch (error) {
            console.error(error);
            setError(error.message);
        }

    }

    return (
        <div className="form-wrapper">
            <div className="title">
                <h1>Log in</h1>
            </div>
            <div className="submit-wrapper">
    
                <div className="input-wrapper">
                    <label htmlFor="email">Email</label>
                    <input type="text" className="inputAuth" id="email" value={ formData.email } onChange={ handleChange }/>
                </div>
                
                <div className="input-wrapper">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="inputAuth" id="password" value={ formData.password } onChange={ handleChange }/>
                </div>

                { error && <div style={{ color: 'red', marginBottom: '10px', textAlign: 'center' }}>{ error }</div>}
                
                <button className="btnSubmit" onClick={ handleLogin }>Log in</button>
                <p>Don't have an account? <Link to="/register">Register here</Link></p>
            </div>
        </div>
        
    );
}


