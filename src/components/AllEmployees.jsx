import React, { useEffect, useState } from 'react';
import './css/AllEmployees.css';

// icons
import { MdDelete } from "react-icons/md";

const AllEmployees = () => {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await fetch('http://localhost:7413/get-employees?organizationId=your_organization_id');

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
                    <p>No employees found</p>
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
                            <MdDelete onClick={() => deleteEmployee(employee._id)} size={26} className='delete-icon'/>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
};

export default AllEmployees;
