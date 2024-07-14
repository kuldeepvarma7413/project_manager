import './css/popup.css'
import { useState } from 'react';
import { Upload } from 'lucide-react';
import { organization_id } from '../App';
import Snackbar from './snackbar';


function AddEmployee(){
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [designation, setDesignation] = useState('');
    const [department, setDepartment] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [image, setImage] = useState(process.env.PUBLIC_URL+'/raw/default-user.png'); // New state for the image
    const organisationId = organization_id; // New state for the organisation id

    // snackbae state
    const [snackbar, setSnackbar] = useState(false);
    const [snackbarContent, setSnackbarContent] = useState('Unable to Add Employee');
    const [snackbarColor, setSnackbarColor] = useState('red');

    const handleImageChange=(e)=>{
        const file=e.target.files[0];
        const reader=new FileReader();
        reader.onloadend=()=>{
            setImage(reader.result);
        }
        if(file){
            reader.readAsDataURL(file);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name && email && designation && department && phone && address && image) {
            if(image === process.env.PUBLIC_URL+'/raw/default-user.png'){
                setSnackbar(true);
                setSnackbarContent('Please upload an image');
                setSnackbarColor('red');
                return;
            }
            // send post request
            const Data = new FormData();
            Data.append('name', name);
            Data.append('email', email);
            Data.append('designation', designation);
            Data.append('department', department);
            Data.append('organisation_id', organisationId);
            Data.append('phone', phone);
            Data.append('address', address);
            Data.append('photo', image);
            console.log('Data ', image);
            fetch('http://127.0.0.1:7413/add-employee',{method:'POST', body: Data})
            .then(res => {
                if (res.ok) {
                    setSnackbar(true);
                    setSnackbarContent('Employee added successfully');
                    setSnackbarColor('green');
                    // reset form
                    setName('');
                    setEmail('');
                    setDesignation('');
                    setDepartment('');
                    setPhone('');
                    setAddress('');
                    setImage(process.env.PUBLIC_URL+'/raw/default-user.png');
                } else {
                    setSnackbar(true);
                    setSnackbarContent('Unable to add Employee');
                    setSnackbarColor('red');
                }
            })
            .catch((e) => {
                setSnackbar(true);
                setSnackbarContent('Network Error');
                setSnackbarColor('red');
            });
        } else {
            console.log('Please fill in all fields');
        }
    }

    return(
        <>
            <div className='add_employee_container popup_content'>
                <h1>Add Employee</h1>
                <form onSubmit={handleSubmit}>
                    <div className="left">
                        <input type='text' required value={name} placeholder='Name' onChange={(e) => setName(e.target.value)}/>
                        <input type='email' required value={email} placeholder='Email' onChange={(e) => setEmail(e.target.value)}/>
                        <input type='text' required value={designation} placeholder='Designation' onChange={(e) => setDesignation(e.target.value)}/>
                        <input type='text' required value={department} placeholder='Department' onChange={(e) => setDepartment(e.target.value)}/>
                        <input type='text' required value={phone} placeholder='Phone Number' onChange={(e) => setPhone(e.target.value)}/>
                        <input type='text' required value={address} placeholder='Address' onChange={(e) => setAddress(e.target.value)}/>
                    </div>
                    <div className="right">
                        <img src={image} alt="" />
                        <label htmlFor="image" className="upload-icon" ><Upload color="white" size={20}/></label>
                        <input type='file' id='image' onChange={handleImageChange}/> {/* New image field */}
                        <div className='btnCont'>
                            <button type='submit'>Update</button>
                        </div>
                    </div>
                </form>
            </div>
            {snackbar && <Snackbar content={snackbarContent} bgcolor={snackbarColor}/>}
        </>
    )
}

export default AddEmployee
