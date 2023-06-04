import React from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from '../../config';
 
const Login = ({ user, setUser }) => {


    const navigate = useNavigate();

    const changeHandler = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        console.log(user);
        try {
            const response = await axios.post(`${BACKEND_URL}/api/user/login`, user);
            if (response.data.message) {
                toast(response.data.message);
                localStorage.setItem("token", response.data.token);
                setUser(response.data.user);
                navigate('/');
                return;
            }
        } catch (error) {
            toast(error.response.data.message);
        }
        setUser("")
    }
 

    return (
        <div className="reg-container">
            <div style={{
                boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                padding: "3rem"
            }}>
                <h2>Sign In</h2>
                <form onSubmit={submitHandler}>
                    <div className="form-group">
                        <label for="lastname">Email</label>
                        <input onChange={changeHandler} type="email" className="form-control" id="exampleInputlastname" name="email" required />
                    </div>
                    <div className="form-group">
                        <label for="Password">Password</label>
                        <input onChange={changeHandler} type="password" className="form-control" id="exampleInputphoneno" name="password" required />
                    </div>

                    <button style={{ marginTop: "1rem" }} type="submit" className="btn btn-primary" name="create">Sign in</button>
                    <p style={{ marginTop: "1rem" }}>Don’t have an account? <Link to="/register">Sign up</Link> </p>
                </form>
                 
            </div>
        </div>
    )
}

export default Login