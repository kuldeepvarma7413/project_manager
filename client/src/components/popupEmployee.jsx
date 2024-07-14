import React, { useRef, useState } from "react";
import { X, Upload } from "lucide-react";
import "./css/popup.css";

function Popup({ onclose, employeeData, updateEmp }) {
  const popupBackRef = useRef();
  const [employee, setEmployee] = useState({
    _id: employeeData._id,
    name: employeeData.name,
    email: employeeData.email,
    designation: employeeData.designation,
    department: employeeData.department,
    phone: employeeData.phone,
    address: employeeData.address,
    photo: employeeData.photo,
  }); // State variables for employee details

  const closePopup = (e) => {
    if (popupBackRef.current === e.target) {
      onclose();
    }
  };

  const handleSubmit = async (e) => {
    console.log("submitted")
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:7413/update-employee?id=${employeeData._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employee),
      });
      if (response.ok) {
        updateEmp(employee)
        onclose();
        console.log("Employee updated successfully");
      } else {
        console.log("Failed to update employee");
      }
    } catch (error) {
      console.log("Error updating employee:", error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const updatedEmployee = { ...employee, photo: reader.result };
      setEmployee(updatedEmployee);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <>
      <div ref={popupBackRef} onClick={closePopup} className="popup">
        <div className="popup_content">
          <form onSubmit={handleSubmit} className="popup-form">
            <div className="left">
              <label>Name</label>
              <input
                type="text"
                required
                value={employee.name}
                name="name"
                placeholder="Name"
                onChange={handleChange}
              />
              <label>Email</label>
              <input
                type="email"
                required
                value={employee.email}
                name="email"
                placeholder="Email"
                onChange={handleChange}
              />
              <label>Designation</label>
              <input
                type="text"
                required
                value={employee.designation}
                name="designation"
                placeholder="Designation"
                onChange={handleChange}
              />
              <label>Department</label>
              <input
                type="text"
                required
                value={employee.department}
                name="department"
                placeholder="Department"
                onChange={handleChange}
              />
              <label>Phone</label>
              <input
                type="text"
                required
                value={employee.phone}
                name="phone"
                placeholder="Phone Number"
                onChange={handleChange}
              />
              <label>Address</label>
              <input
                type="text"
                required
                value={employee.address}
                name="address"
                placeholder="Address"
                onChange={handleChange}
              />
            </div>
            <div className="right">
              <p className="close-btn">
                <X onClick={onclose} color="white" />
              </p>
              <img src={employee.photo} alt="" />
              <label htmlFor="image" className="upload-icon">
                <Upload color="white" size={12} />
              </label>
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={handleImageChange}
              />{" "}
              {/* New image field */}
              <div className="btnCont">
                <button type="submit">Update</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Popup;
