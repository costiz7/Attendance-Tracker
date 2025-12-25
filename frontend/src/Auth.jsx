import { useState } from "react";

function Login({ onSwitch }) {

    return (
        <div className="form-wrapper">
            <label htmlFor="username">Username</label>
            <input type="text" className="inputAuth" id="username"/>
            <label htmlFor="password">Password</label>
            <input type="password" className="inputAuth" id="password"/>
            <button className="btnLogin">Login</button>
            <p>OR</p>
            <button className="btnRegister" onClick={ onSwitch }>Create an account</button>
        </div>
    );
}

function Register({ onSwitch }) {

    return (
        <div className="form-wrapper">
            <label htmlFor="username">Username</label>
            <input type="text" className="inputAuth" id="username"/>
            <label htmlFor="email">Email</label>
            <input type="text" className="inputAuth" id="email"/>
            <label htmlFor="enterPassword">Enter Password</label>
            <input type="password" className="inputAuth" id="enterPassword"/>
            <label htmlFor="renterPassword">Confirm Password</label>
            <input type="password" className="inputAuth" id="renterPassword"/>
            <button className="btnRegister">Register</button>
            <p>OR</p>
            <button className="btnLogin" onClick={ onSwitch }>I already have an account</button>
        </div>
    );
}

export default function Auth() {
    const [isLogin, setIsLogin] = useState(true);

    function toggleForm() {
        setIsLogin(!isLogin);
    }

    return (
        <div className="auth-wrapper">
            {
                isLogin ? (<Login onSwitch={toggleForm} />) : (<Register onSwitch={toggleForm} />)
            }
        </div>
    );
}