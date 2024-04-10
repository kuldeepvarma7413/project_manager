import './css/rightSection.css'
import Container from './container'
import { useEffect, useState } from 'react'
import TaskPopup from './addTaskPopup'
import { organization_id } from '../App'

function RightSection(){
    // employees
    const [employees, setEmployees] = useState([]);

    // popup
    const [showTaskPopup, setShowPopup] = useState(false);
    const [containerId, setContainerId] = useState('');

    // create hook to show popup declared above
    const closePopup = () => {
        setShowPopup(false);
    }

    const showPopup = (containerId) => {
        setContainerId(containerId);
        setShowPopup(true);
    }

    // fetch and store all tasks
    const [tasks, setTasks] = useState([]);
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await fetch('http://localhost:7413/get-tasks');

                if (response.ok) {
                    const data = await response.json();
                    setTasks(data);
                } else {
                    console.error('Failed to fetch tasks');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchTasks();
    }, []);

    // add task locally
    const addcard = (task) => {
        setTasks([...tasks, task]);
    }

    // filter tasks based on containerId
    const filterTasks = (containerId) => {
        containerId = containerId.toString();
        const filteredTasks = tasks.filter(task => task.container_id === containerId);
        return filteredTasks;
    }

    // fetch all employees
    // useEffect to fetch all employees and append in select tag of assigned to
    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await fetch(`http://localhost:7413/get-employees?organizationId=${organization_id}`);
    
                if (response.ok) {
                    const data = await response.json();
                    setEmployees(data);
                } else {
                    console.error('Failed to fetch employees');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };
        // call obj
        fetchEmployees();
    }, []);

    // handle drop
    const handleDrop=async (e, containerId)=>{
        e.preventDefault();
        const cardId = e.dataTransfer.getData("cardId");
        console.log(cardId, containerId);
        // update card container id in front and back both
        setTasks(tasks.map(task => {
            if(task._id === cardId){
                task.container_id = containerId;
            }
            return task;
        }));
        // update container id in backend
        try {
            const response = await fetch(`http://localhost:7413/change-container?taskId=${cardId}&containerId=${containerId}`, {
                method: 'PUT',
            });

            if (response.ok) {
                console.log('Task container updated successfully');
            } else {
                console.error('Failed to update task container');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return(
        <>
        <div className="outer-container-right">
            <Container containerId="1" title="No Project Phase" bgcolor="rgb(171 210 255)" showPop={showPopup} tasks={filterTasks(1)} handleDrop={handleDrop}></Container>
            <Container containerId="2" title="In Planning" bgcolor="rgb(252 255 162)"  showPop={showPopup} tasks={filterTasks(2)} handleDrop={handleDrop}></Container>
            <Container containerId="3" title="Estimation" bgcolor="rgb(208 255 156)"  showPop={showPopup} tasks={filterTasks(3)} handleDrop={handleDrop}></Container>
            <Container containerId="4" title="Active" bgcolor="rgb(251 144 144)"  showPop={showPopup} tasks={filterTasks(4)} handleDrop={handleDrop}></Container>
            <Container containerId="5" title="Review" bgcolor="rgb(130 255 124)"  showPop={showPopup} tasks={filterTasks(5)} handleDrop={handleDrop}></Container>
        </div>
        {/* {showTaskPopup && <TaskPopup onclose={closePopup} containerId={containerId} />} */}
        {showTaskPopup && <TaskPopup onclose={closePopup} containerId={containerId} onadd={addcard} employees={employees}/>}
        </>
    )
}

export default RightSection