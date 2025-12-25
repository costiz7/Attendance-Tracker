import { Link } from "react-router-dom";
import './Auth.css';

export default function Register() {

    return (
        <div className="form-wrapper">
            <div className="title">
                <h1>Register</h1>
            </div>
            <div className="submit-wrapper">

                <div className="input-wrapper">
                    <label htmlFor="username">Username</label>
                    <input type="text" className="inputAuth" id="username"/>
                </div>
                
                <div className="input-wrapper">
                    <label htmlFor="email">Email</label>
                    <input type="text" className="inputAuth" id="email"/>
                </div>

                <div className="input-wrapper">
                    <label htmlFor="enterPassword">Enter Password</label>
                    <input type="password" className="inputAuth" id="enterPassword"/>
                </div>
                
                <div className="input-wrapper">
                    <label htmlFor="renterPassword">Confirm Password</label>
                    <input type="password" className="inputAuth" id="renterPassword"/>
                </div>
                

                <button className="btnSubmit">Register</button>
                <p>Already have an account? <Link to="/login">Login here</Link></p>
            </div>
            
        </div>
    );
}