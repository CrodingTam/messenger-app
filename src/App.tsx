import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './containers/Home/Home';
import Login from './containers/Login/Login';
import Register from './containers/Register/Register';
import "./App.css";
import { login, logout, selectUser, setDisplayName } from './store/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from './firebase/firebase';

function App() {
	const user = useSelector(selectUser);
	const reduxDispatch = useDispatch();

	// check at page load if a user is authenticated
	useEffect(() => {
		reduxDispatch(logout());
		onAuthStateChanged(auth, (userAuth: User | null) => {
			if (userAuth) {
				reduxDispatch(login({
					email: userAuth.email,
					displayName: userAuth.displayName
				}));
			}
			reduxDispatch(setDisplayName(userAuth?.displayName))
		});
	}, []);

	console.log(user);
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />}></Route>,
				<Route path="/register" element={<Register />}></Route>
				<Route path="/login" element={<Login />}></Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
