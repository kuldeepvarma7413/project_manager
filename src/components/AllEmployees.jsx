import React, { useEffect, useState } from 'react';
import './css/AllEmployees.css';
import { Pencil, Trash2 } from 'lucide-react';
import Popup from './popupEmployee';
import { organization_id } from '../App';

const AllEmployees = () => {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await fetch(`http://localhost:7413/get-employees?organizationId=${organization_id}`);

                if (response.ok) {
                    const data = await response.json();
                    console.log(data);
                    setEmployees(data);
                } else {
                    console.error('Failed to fetch employees');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchEmployees();
    }, []);

    const deleteEmployee = async (_id) => {
        try {
            const response = await fetch(`http://localhost:7413/delete-employee?id=${_id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                // Remove the deleted employee from the state
                setEmployees(employees.filter(employee => employee._id !== _id));
                // show snackbar
            } else {
                console.error('Failed to delete employee');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    // loader
    const [loadingMessage, setLoadingMessage] = useState('Loading...')

    useEffect(() => {
        const timer = setTimeout(()=>{
            setLoadingMessage('No employees found')
        }, 2500);

        return ()=> clearTimeout(timer);
    }, []);

    const [empData, setEmpData] = useState({});
    const [showPopup, setShowPopup] = useState(false);
    const handleEdit = (employee) => {
        setEmpData(employee);
        setShowPopup(true);
    };

    // update employee in local
    const changeData = (employee) => {
        setEmployees(employees => employees.map((emp) => {
            if(emp._id === employee._id){                
                return employee;
            }
            return emp;
        }));
    };

    return (
        <div className='all-employee-container'>
            {/* <h1>All Employees</h1> */}
            <li className='employee-list-card head-list'>
                <p>No.</p>
                <p>Name</p>
                <p>Email</p>
                <p>Designation</p>
                <p>Department</p>
                <p>Phone</p>
                <p>Address</p>
                <p>Photo</p>
                <p>Action</p>
            </li>
            <ul className='employee-list'>
                {employees.length===0? (
                    <p>{loadingMessage}</p>
                ):(
                    employees.map((employee, index) => (
                        <li key={employee._id} className='employee-list-card'>
                            <p>{index + 1}</p>
                            <p>{employee.name}</p>
                            <p>{employee.email}</p>
                            <p>{employee.designation}</p>
                            <p>{employee.department}</p>
                            <p>{employee.phone}</p>
                            <p>{employee.address}</p>
                            <img src={employee.photo} alt="Employee Photo" />
                            <div className='actions'>
                                <Pencil onClick={()=> {handleEdit(employee)}} size={20} className='edit-icon'/>
                                <Trash2 onClick={() => deleteEmployee(employee._id)} size={20} className='delete-icon'/>
                            </div>
                        </li>
                    ))
                )}
                {showPopup && <Popup onclose={()=>setShowPopup(false)} employeeData={empData} updateEmp={changeData} />}
            </ul>
        </div>
    );
};

export default AllEmployees;
