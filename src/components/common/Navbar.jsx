import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
 
const Navbar = () => {

	const navigate  = useNavigate();

	const token = localStorage.getItem("token");
	 
	const logoutHandler = () =>{
		localStorage.removeItem("token");
        navigate("/login");
	}

	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
			<div className="container">
				<NavLink className="navbar-brand" hrefLang="https://" to="/">
					Contact List
				</NavLink>
				<button
					className="navbar-toggler collapsed"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#mobileMenu"
					aria-controls="mobileMenu"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="toggler-icon top-bar"></span>
					<span className="toggler-icon middle-bar"></span>
					<span className="toggler-icon bottom-bar"></span>
				</button>
				<div className="collapse navbar-collapse" id="mobileMenu">
					<ul className="navbar-nav me-auto mb-2 mb-lg-0">

						<li className="nav-item">
							<NavLink
								className="nav-link"
								to="/contacts"
							>
								Contacts
							</NavLink>
						</li>

						<li className="nav-item">
							<NavLink
								className="nav-link"
								to="/contacts/create"
							>
								Add Contact
							</NavLink>
						</li>

					</ul>
					{
					 token && <button onClick={logoutHandler} className="btn btn-primary">Logout</button>
					}
				</div>
			</div>
		</nav>
	);
};

export default Navbar;