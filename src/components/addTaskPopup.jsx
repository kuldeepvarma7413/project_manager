import React, { useState, useRef } from 'react';
import './css/taskPopup.css';
import { organization_id } from '../App';

const TaskPopup = ({onclose, containerId, onadd, employees}) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [phase, setPhase] = useState('');
    const [assigned_to, setAssignedTo] = useState('');
    const [deadline, setDeadline] = useState('');
    const [progress, setProgress] = useState('0');
    const organisationId = organization_id;
    // const containerId = props.containerId
    const container_id = containerId


    // reference to error message
    const [errorMessage, setErrorMessage] = useState('');

    const popupBackRef = useRef();

    const closePopup = (e) => {
        if (popupBackRef.current === e.target) {
          onclose();
        }
    };

    const handleCancel = (e) => {
        e.preventDefault();
        onclose();
    };

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your logic here to handle the form submission
        // check if all fields are filled
        if (!title || !description || !phase || !assigned_to || !deadline || !progress) {
            console.log('Please fill all fields');
            setErrorMessage('Please fill all fields');
            return ;
        }
        // check if progress is between 0 and 100
        if (progress < 0 || progress > 100) {
            console.log('Progress should be between 0 and 100');
            setErrorMessage('Progress should be between 0 and 100');
            return;
        }
        // check if deadline is in future
        if (new Date(deadline) < new Date()) {
            setErrorMessage('Deadline should be in future');
            console.log('Deadline should be in future');
            return;
        }
        // create task object
        const task = {
            title,
            description,
            phase,
            assigned_to,
            deadline,
            progress,
            organization_id,
            container_id
        };
        console.log(task);
        // Add your logic here to handle the form submission
        // send put request
        fetch('http://localhost:7413/add-task', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        })
            .then(response => response.json())
            .then(returnedTask => {
                console.log('Success:', returnedTask);
                // Close the popup
                // add task in local too
                onadd(returnedTask);
                onclose();
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        // Add the task to the database
        // Close the popup
    };

    return (
        <div className='task-popup' ref={popupBackRef} onClick={closePopup}>
            <form onSubmit={handleSubmit}>
                <h2>Add Task</h2>
                <p className='error'>{errorMessage}</p>
                <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />

                <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
                <div className='fields'>
                    

                    <select id="phase" value={phase} onChange={(e) => setPhase(e.target.value)}>
                        <option value="">Select Phase</option>
                        <option value="Planning">Planning</option>
                        <option value="Analysis">Analysis</option>
                        <option value="Design">Design</option>
                        <option value="Implementation">Implementation</option>
                        <option value="Testing">Testing</option>
                        <option value="Deployment">Deployment</option>
                        <option value="Maintenance">Maintenance</option>
                    </select>

                    <select id="assigned_to" value={assigned_to} onChange={(e) => setAssignedTo(e.target.value)}>
                        <option value="">Assign to</option>
                        {employees.map( e => <option key={e._id} value={e._id}>{e.name}</option>)}
                        {/* Add options dynamically based on employees in the same organisation */}
                    </select>

                    <input type="date" id="deadline" value={deadline} onChange={(e) => setDeadline(e.target.value)} placeholder="Deadline" />

                    <input type="number" id="progress" value={progress} onChange={(e) => setProgress(e.target.value)} placeholder="Progress" />
                </div>
                <div className='actions'>
                    <button type="submit">Add</button>
                    <button onClick={handleCancel}>Close</button>
                </div>
            </form>
        </div>
    );
};

export default TaskPopup;