import { useState } from "react";
import NavBar from "./NavBar";
import './Styles/CreateGroup.css';

export default function CreateGroup(){

    const [groupName, setGroupName] = useState('');
    const token = localStorage.getItem('token');

    async function handleGroup(){
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
                console.log("Grup creat!");
            }
            else{
                console.log("Eroare");
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
                <label>Name:</label>
                <input type="text" value={ groupName }  onChange={ (e) => setGroupName(e.target.value)}></input>
                <button className="btn-create" onClick={ handleGroup }>Create</button>
            </div>
        </div>
    );
}