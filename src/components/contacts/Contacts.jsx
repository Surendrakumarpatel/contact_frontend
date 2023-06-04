import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {toast} from "react-toastify";
import { useParams } from "react-router-dom";
import { BACKEND_URL } from "../../config";

const Contacts = ({
	user
}) => {

	const {_id} = useParams();
	console.log(_id);

    const [contacts, setContacts] = useState([]);
 
    const CancelBooking = (id) => {
		console.log("Cancel Booking " + id)
		axios.get(`/api/contacts/cancel/${id}`);
	}


	useEffect(() => {
		async function getCruds() {
			try {
				const response = await axios.post(`${BACKEND_URL}/api/contacts/getAll`, {
                    creatorEmail: user.email
				});
				console.log(response.data);
				setContacts(response.data.contacts);
			} catch (error) {
				console.log("error", error);
			}
		}
		getCruds();
	}, [_id]);

	const deleteContact = (_id) => {
		async function deleteCrud() {
			try {
				const response = await axios.delete(`${BACKEND_URL}/${_id}/${user.email}`);
				if(response.data){
					toast(response.data.message);
					setContacts((prevItems) => prevItems.filter((item) => item._id !== _id));
				}
			} catch (error) {
				console.log(error);
			}
		}
		deleteCrud();
	}

  return (
    <div className="container">
			<div>
				<h2>
					Contacts
				</h2>
				 
			</div>

			<div className="table-responsive">
				<table className="table riped  table-hover table-bordered container">
					<thead>
						<tr>
							<th>Id</th>
							<th>User Name</th>
							<th>Email</th>
							<th>Phone Number</th>
							<th>View</th>
							<th>Edit</th>
							<th>Delete</th>
						</tr>
					</thead>
					<tbody>
						{contacts &&
							contacts.map((contact, index) => {

								const {firstName, lastName, email, phoneNumber} = contact;
								return (
									<tr key={contact._id}>
										<td>{`${index+1}`}</td>
										<td>{`${firstName} ${lastName}`}</td>
										<td>{email}</td>
										<td>{phoneNumber}</td>
										<td>
											<Link to={`/contacts/${contact._id}`} className="btn btn-warning">
												View
											</Link>
										</td>
										<td>
											<Link
												to={`/contacts/${contact._id}/edit`}
												className="btn btn-success"
											>
												Edit
											</Link>
										</td>
										<td>
											<button
												className="btn btn-danger"
												onClick={() => deleteContact(contact._id)}
											>
												Delete
											</button>
										</td>
									</tr>
								);
							})}
					</tbody>
				</table>
			</div>
		</div>
  )
}

export default Contacts