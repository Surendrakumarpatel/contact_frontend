import React, { useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BACKEND_URL } from '../../config';
  
const CreateContact = ({ user }) => {
 
    const [contact, setContact] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber:"",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        async function postCrud() {
			try {
				const response = await axios.post(`${BACKEND_URL}/api/contacts/createContact`, {
                    ...contact,
                    creatorEmail: user.email
                });
				if (response.data.message) {
                    console.log(response.data.message);
					toast(response.data.message);
					return;
				}
			 	 
			} catch (error) {
				console.log("error", error);
			}
		}
		postCrud();
    }

    const handleChange = (e) => {
        setContact({ ...contact, [e.target.name]: e.target.value });
    }

    return (
        <div className="container" style={{ maxWidth: "400px" }}>
            <h1>Add Contact</h1>
            <hr />
            <form onSubmit={handleSubmit}>
                <div className="form-group my-2">
                    <label>First Name</label>
                    <input
                        name="firstName"
                        type="text"
                        required
                        value={contact.firstName}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>
                <div className="form-group my-2">
                    <label>Last Name</label>
                    <input
                        name="lastName"
                        type="text"
                        required
                        value={contact.lastName}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>
                <div className="form-group my-2">
                    <label>Email</label>
                    <input
                        name="email"
                        type="email"
                        required
                        value={contact.email}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>
                <div className="form-group my-2">
                    <label>Phone Number</label>
                    <input
                        type="tel" 
                        name="phoneNumber" 
                        required
                        value={contact.phoneNumber}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>

                <div className="btn-group my-4">
                    <input type="submit" value="Submit" className="btn btn-primary" />
                     
                </div>
            </form>
        </div>
    )
}

export default CreateContact