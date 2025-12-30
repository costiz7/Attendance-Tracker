import { useState } from "react";
import NavBar from "./NavBar";
import './Styles/CreateGroup.css';

export default function CreateGroup(){

    const [groupName, setGroupName] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const token = localStorage.getItem('token');

    async function handleGroup(){

        setError('');
        setMessage('');

        if(!groupName || groupName.trim() === ''){
            setError("Enter a valid name!");
            return;
        }

        try {
            
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/groups`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                     name: groupName
                })
            });

            const data = await response.json();

            if(response.ok){
                setMessage("Group created!");
            }
            else{
                throw new Error(data.message || 'Try again!');
            }

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="menu-wrapper">
            <NavBar />
            <div className="organize-wrapper">
                <h2>Create a group</h2>
                <label className="label-create">Name:</label>
                <input className="input-create" type="text" value={ groupName }  onChange={ (e) => setGroupName(e.target.value)}></input>
                { error && <p style={{color: 'red', marginBottom: '10px', fontSize: '16px'}}>{ error }</p> }
                { message && <p style={{color: 'green', marginBottom: '10px', fontSize: '16px'}}>{ message }</p> }
                <button className="btn-create" onClick={ handleGroup }>Create</button>
            </div>
        </div>
    );
}