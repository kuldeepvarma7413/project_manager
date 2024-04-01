import './css/addEmployee.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddEmployee(){
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [designation, setDesignation] = useState('');
    const [department, setDepartment] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [image, setImage] = useState(null); // New state for the image
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name && email && designation && department && phone && address && image) {
            // send post request
            const Data = new FormData();
            Data.append('name', name);
            Data.append('email', email);
            Data.append('designation', designation);
            Data.append('department', department);
            Data.append('phone', phone);
            Data.append('address', address);
            Data.append('photo', image);
            console.log(Data.get('photo'));
            fetch('http://127.0.0.1:7413/add-employee',{method:'POST', body: Data}).then(res=>res.json()).then(data=>console.log(data)).catch(err=>console.log(err));
            // Rest of the code...
            // fetch('http://127.0.0.1:7413/add-employee', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
            //     body: formData
            // })
            //     .then(response => response.json())
            //     .then(data => {
            //         // Handle the response data
            //         console.log(data);
            //         // reset form data
            //         setName('');
            //         setEmail('');
            //         setDesignation('');
            //         setDepartment('');
            //         setPhone('');
            //         setAddress('');
            //         setImage(null);
            //     })
            //     .catch(error => {
            //         // Handle any errors
            //         console.error(error);
            //     });
                
        } else {
            console.log('Please fill in all fields');
        }
    }

    return(
        <>
            <div className='outer-container-addEmployee'>
                <h1>Add Employee</h1>
                <form onSubmit={handleSubmit}>
                        <input type='text' required value={name} placeholder='Name' onChange={(e) => setName(e.target.value)}/>
                        <input type='email' required value={email} placeholder='Email' onChange={(e) => setEmail(e.target.value)}/>
                        <input type='text' required value={designation} placeholder='Designation' onChange={(e) => setDesignation(e.target.value)}/>
                        <input type='text' required value={department} placeholder='Department' onChange={(e) => setDepartment(e.target.value)}/>
                        <input type='text' required value={phone} placeholder='Phone Number' onChange={(e) => setPhone(e.target.value)}/>
                        <input type='text' required value={address} placeholder='Address' onChange={(e) => setAddress(e.target.value)}/>
                        <input type='file' required onChange={(e) => setImage(e.target.files[0])}/> {/* New image field */}
                        <div className='btnCont'>
                            <button type='submit'>Add Employee</button>
                        </div>
                </form>
            </div>
        </>
    )
}

export default AddEmployee
