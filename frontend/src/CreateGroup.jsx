import { useState } from "react";
import NavBar from "./NavBar";
import './Styles/CreateGroup.css';
import { useNavigate } from "react-router-dom";

//Create Group component
export default function CreateGroup(){

    const [groupName, setGroupName] = useState('');
    const [error, setError] = useState('');
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    async function handleGroup(){
        setError('');

        if(!groupName || groupName.trim() === ''){
            setError("Enter a valid name!");
            return;
        }

        try {
            //Create the group in our database with a GET callss
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
                navigate('/home/organize/createdgroup');
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
                <h1>Create a group</h1>
                <div className="create-group-input-wrapper">
                    <label className="label-create-group">Name</label>
                    <input className="input-create-group" type="text" value={ groupName }  onChange={ (e) => setGroupName(e.target.value)}></input>
                    <button className="btn-create-group" onClick={ handleGroup }>Create</button>
                </div>
                
                { error && <p id="error-message">{ error }</p> }
            </div>
        </div>
    );
}