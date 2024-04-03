import React, { useState } from "react";
import { X, Upload } from 'lucide-react';
import './css/popup.css';

function Popup() {
    const [employee, setEmployee] = useState({
        name: '',
        email: '',
        designation: '',
        department: '',
        phone: '',
        address: '',
        image: null
    });

    const handleChange = (e) => {
        setEmployee({
            ...employee,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your logic to handle the form submission here
        console.log(employee);
    };

    const { name, email, designation, department, phone, address } = employee; // Destructure the state variables

    return (
        <>
            <div className="popup">
                <div className="popup_content">
                    <form onSubmit={handleSubmit}>
                        <div className="left">
                            <label>Name</label>
                            <input type='text' required value={name} name="name" placeholder='Name' onChange={handleChange}/>
                            <label>Email</label>
                            <input type='email' required value={email} name="email" placeholder='Email' onChange={handleChange}/>
                            <label>Designation</label>
                            <input type='text' required value={designation} name="designation" placeholder='Designation' onChange={handleChange}/>
                            <label>Department</label>
                            <input type='text' required value={department} name="department" placeholder='Department' onChange={handleChange}/>
                            <label>Phone</label>
                            <input type='text' required value={phone} name="phone" placeholder='Phone Number' onChange={handleChange}/>
                            <label>Address</label>
                            <input type='text' required value={address} name="address" placeholder='Address' onChange={handleChange}/>
                        </div>
                        <div className="right">
                            <p className="close-btn"><X color="white"/></p>
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcrQkR-hTtbC12xL-PRRlBqKhthbxpz9YBvG8ingR6u5ZmHzXn0hg1cfbkQKAEo4yOtOw&usqp=CAU" alt="" />
                            <label htmlFor="image" className="upload-icon" ><Upload color="white" size={20}/></label>
                            <input type='file' id="image" required onChange={(e) => setEmployee({ ...employee, image: e.target.files[0] })}/> {/* New image field */}
                            <div className='btnCont'>
                                <button type='submit'>Update</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Popup;
