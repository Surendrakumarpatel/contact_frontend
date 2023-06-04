import React from 'react'
import "./Style.css";
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { BACKEND_URL } from '../../config';


const Register = ({user, setUser}) => {

    
    const changeHandler = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        console.log(user);
        
        async function postCrud() {
            try {
                const response = await axios.post(`${BACKEND_URL}/api/user/register`, user, {
                    header: {
                        "Content-Type": "application/json"
                    },
                });
                if (response.data.message) {
                    console.log(response.data.message);
                    toast(response.data.message);
                    
                }
                navigate("/login");

            } catch (error) {
                toast(error.response.data.message);
            }
        }
        postCrud();
    }

    return (
        <div className="reg-container">
            <div style={{
                boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                padding: "3rem"
            }}>
                <h2>Sign up</h2>
                <form onSubmit={submitHandler}>
                    <div className="form-group">
                        <label for="firstname">Name</label>
                        <input onChange={changeHandler} type="text" className="form-control" id="exampleInputfirstname" name="name" required />
                    </div>
                    <div className="form-group">
                        <label for="lastname">Email</label>
                        <input onChange={changeHandler} type="email" className="form-control" id="exampleInputlastname" name="email" required />
                    </div>
                    <div className="form-group">
                        <label for="Password">Password</label>
                        <input onChange={changeHandler} type="password"  className="form-control" id="exampleInputphoneno" name="password" required />
                    </div>

                    <div className="form-group">
                        <label for="Confirm Password">Confirm Password</label>
                        <input onChange={changeHandler} type="password"  className="form-control" id="exampleInputPassword" name="cPassword" required />
                    </div>
                    <button style={{ marginTop: "1rem" }} type="submit" className="btn btn-primary" name="create">Sign up</button>
                    <p style={{ marginTop: "1rem" }}>Already have an account <Link to="/login">Sign in</Link> </p>
                </form>
            </div>
        </div>


    )
}

export default Register