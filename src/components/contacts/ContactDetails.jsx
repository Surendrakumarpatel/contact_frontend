import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { BACKEND_URL } from "../../config";


const ContactDetails = ({ user }) => {
    const [crud, setCrud] = useState({});
    const { _id } = useParams();

    useEffect(() => {
        async function getCrudById () {
            try {
                const response = await axios.post(`${BACKEND_URL}/${_id}`, {
                    creatorEmail: user.email
                });
                console.log(response.data.contact);
                setCrud(response.data.contact);
            } catch (error) {
                console.log("error", error);
            }
        }
        getCrudById();
    },[]);
 
    return (
        <div className="container">
            <p>
                <b>User Name</b>: {`${crud?.firstName} ${crud?.lastName}`}
            </p>
            <p>
                <b>User Email</b>: {crud?.email}
            </p>
            <p>
                <b>Phone Number</b>: {crud?.phoneNumber}
            </p>


            <div className="btn-group ">
                <Link to={`/contacts/${crud._id}/edit`} className="btn btn-primary">
                    Edit
                </Link>
                <Link to="/contacts" className="btn btn-secondary">
                    Close
                </Link>
            </div>
            <hr />
        </div>
    );
}

export default ContactDetails;