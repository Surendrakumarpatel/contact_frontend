import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from './components/common/Navbar';
import CreateContact from './components/contacts/CreateContact';
import Contacts from './components/contacts/Contacts';
import Home from './components/Home';
import ContactDetails from './components/contacts/ContactDetails';
import ContactEdit from './components/contacts/ContactEdit';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { useState } from 'react';

function App() {

	const [user, setUser] = useState(null);


	return (
		<div className="App">
			<Router>
				<Navbar user={user} />

				<Routes>
					<Route exact path="/" element={<ProtectedRoute user={user}>
						<Home />
					</ProtectedRoute>} />
					<Route exact path="/contacts/create" element={<ProtectedRoute  user={user}>
						<CreateContact user={user} />
					</ProtectedRoute>} />
					<Route exact path="/contacts" element={<ProtectedRoute user={user}>
						<Contacts user={user} />
					</ProtectedRoute>} />
					<Route exact path="/contacts/:_id" element={<ProtectedRoute user={user}>
						<ContactDetails user={user} />
					</ProtectedRoute>} />
					<Route exact path="/contacts/:_id/edit" element={<ProtectedRoute user={user}>
						<ContactEdit user={user} />
					</ProtectedRoute>} />)
					<Route exact path="/register" element={<Register user={user} setUser={setUser} />} />
					<Route exact path="/login" element={<Login user={user} setUser={setUser} />} />
				</Routes>
			</Router>
		</div>
	);
}
export default App;
