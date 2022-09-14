import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './containers/Home/Home';
import Login from './containers/Login/Login';
import Register from './containers/Register/Register';
import "./App.css";
import { login, selectUser, setDisplayName, setphotoURL } from './store/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth} from './firebase/firebase';
import { RootState } from './store/store';
import { userLogin } from './store/userAuthSlice';
import PrivateRoute from './components/PrivateRoute';

function App() {
	const userFirstName = useSelector((state:RootState) => state.register.firstName);
    const userLastName = useSelector((state:RootState) => state.register.lastName);
	const userEmail = useSelector((state:RootState) => state.register.email);
	const user = useSelector(selectUser);
	const reduxDispatch = useDispatch();
	const userAuthInfo = useSelector((state:RootState) => state.userAuth.userInfo);

	// check at page load if a user is authenticated
	useEffect(() => {
		reduxDispatch(userLogin({type:"USER_LOGIN_REQUEST"}));
		onAuthStateChanged(auth, (userAuth: User | null) => {
			if (userAuth) {
				reduxDispatch(login({
					email: userAuth.email,
					displayName: userAuth.displayName
				}));
				const registeredUser = {
					displayName: userAuth.displayName,
					uid: userAuth.uid,
					email: userAuth.email,
					photoURL: userAuth.photoURL
				}
				localStorage.setItem("user", JSON.stringify(registeredUser));
				reduxDispatch(userLogin({type:"USER_LOGIN_SUCCES", user: registeredUser}));
			}
			reduxDispatch(setDisplayName(userAuth?.displayName));
			reduxDispatch(setphotoURL(userAuth?.photoURL));
		});
	}, []);

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<PrivateRoute />}>
					<Route path="/" element={<Home />}></Route>
				</Route>
				<Route path="/register" element={<Register />}></Route>
				<Route path="/login" element={<Login />}></Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
