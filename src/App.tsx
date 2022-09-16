import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './containers/Home/Home';
import Login from './containers/Login/Login';
import Register from './containers/Register/Register';
import "./App.css";
import { login, selectUser, setDisplayName, setphotoURL } from './store/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth, db} from './firebase/firebase';
import { RootState } from './store/store';
import { userLogin } from './store/userAuthSlice';
import PrivateRoute from './components/PrivateRoute';
import { query, collection, onSnapshot, DocumentData, where, doc, updateDoc } from 'firebase/firestore';
import { setRealtimeUsers, setUsers } from './store/realtimeUsersSlice';

function App() {
	const reduxDispatch = useDispatch();

    const getRealtimeUsers = (currentUid: string) => {
		
        reduxDispatch(setRealtimeUsers("GET_REALTIME_USERS_REQUEST"));
		const users: DocumentData[] = [];
        const q = query(collection(db, "users"));
        onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((document: any) => {
				if(currentUid != document.data().uid){
					users.push(document.data());
				}
            });
			reduxDispatch(setRealtimeUsers("GET_REALTIME_USERS_SUCCES"));
			reduxDispatch(setUsers(users));
        })
    }

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
				getRealtimeUsers(userAuth.uid);
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
