import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {toast} from "react-toastify";
import axios from "axios";
import { BACKEND_URL } from "../../config";

const ContactEdit = (props) => {
	 
	const [contact, setContact] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber:"",
    });

	const { _id } = useParams();
	const navigate = useNavigate();

	useEffect(
		function () {
			async function updateRoom() {
				try {
					const response = await axios.post(`${BACKEND_URL}/${_id}`,{
						creatorEmail: props.user.email
					});
				    console.log(response.data.contact);
					setContact({ ...response.data.contact});
					
				} catch (error) {
					console.log(error);
				}
			}
			updateRoom();
		},
		[props]
	);

	function handleSubmit(event) {
		event.preventDefault();
		async function updateCrud() {
			try {
				const response = await axios.put(`${BACKEND_URL}/${contact._id}`, {...contact,creatorEmail: props.user.email});
				if(response.data){
					toast(response.data.message);
				}
			} catch (error) {
				console.log(error);
			}
		}
		updateCrud();
	}

	function handleChange(event) {
		setContact({ ...contact, [event.target.name]: event.target.value });
	}

	function handleCancel() {
		navigate(`/contacts/${contact._id}`);
	}

	return (
		<div className="container">
			<h1>Edit Contact (id: {contact._id})</h1>
			<hr />
			<form onSubmit={handleSubmit}>
				<div className="form-group">
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
				<div className="form-group">
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
 
                <div className="form-group">
					<label>Email</label>
					<input
						name="email"
						type="email"
						pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,63}$"
						required
						value={contact.email}
						onChange={handleChange}
						className="form-control"
					/>
				</div>
				<div className="form-group">
					<label>Phone Number</label>
					<input
						name="phoneNumber"
						type="tel"
						required
						value={contact.phoneNumber}
						onChange={handleChange}
						className="form-control"
					/>
				</div>
                <div className="btn-group py-4">
					<button type="submit" className="btn btn-primary">
						Update
					</button>
					<button
						type="button"
						onClick={handleCancel}
						className="btn btn-secondary"
					>
						Cancel
					</button>
				</div>
			</form>
		</div>
	);
}

export default ContactEdit;