import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './containers/Home/Home';
import Login from './containers/Login/Login';
import Register from './containers/Register/Register';
import "./App.css";
import { login, setDisplayName, setphotoURL } from './store/userSlice';
import { useDispatch } from 'react-redux';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth, db} from './firebase/firebase';
import { userLogin } from './store/userAuthSlice';
import PrivateRoute from './components/PrivateRoute';
import { query, collection, onSnapshot, DocumentData } from 'firebase/firestore';
import { setRealtimeUsers, setUsers } from './store/realtimeUsersSlice';

/**
 * 
 * @returns a BrowserRouter, which is a router for use in web browsers. Provides the cleanest URLs.
 */
function App() {
	//use dispatch
	const reduxDispatch = useDispatch();

	/**
	 * 
	 * @param currentUid applies the current user uid
	 * Create a new inmutable instance of quary with our collection
	 * With forEach, we go through the elements of the document and push the necessary ones to users array
	 *  We update our users state with our brand new users array from there
	 */
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

	/**
	 * we add an observer for changes to the user's sign-in state.
	 * set local storage for private route
	 * pass the current user uid for getRealTimeUsers
	 * dispatch some necessary action for login handling
	 * set display name and photo url for header in case of logged in state
	 * we pass the registered user into userInfo, cause of this we can reach it anywhere more easily
	 */
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
