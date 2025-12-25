import { Link } from "react-router-dom";
import './Auth.css';

export default function Login() {

    return (
        <div className="form-wrapper">
            <div className="title">
                <h1>Log in</h1>
            </div>
            <div className="submit-wrapper">
    
                <div className="input-wrapper">
                    <label htmlFor="username">Username</label>
                    <input type="text" className="inputAuth" id="username"/>
                </div>
                
                <div className="input-wrapper">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="inputAuth" id="password"/>
                </div>
                
                <button className="btnSubmit">Log in</button>
                <p>Don't have an account? <Link to="/register">Register here</Link></p>
            </div>
        </div>
        
    );
}


