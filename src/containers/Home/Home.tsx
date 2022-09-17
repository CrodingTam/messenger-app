import { addDoc, collection, doc, DocumentData, onSnapshot, orderBy, query, setDoc, updateDoc, where } from "firebase/firestore";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/Layout/Layout";
import { db } from "../../firebase/firebase";
import { setConversations, setRealtimeConversation, setRealtimeUsers, setUsers } from "../../store/realtimeUsersSlice";
import { RootState } from "../../store/store";
import "./styleHome.css";
import styled from 'styled-components';

/**
 * @returns a specific home layout container
 */
const Home = () => {
    /**
     * selectors, use states, redux dispatch
     */
    const realtimeUsers = useSelector((state:RootState) => state.realtimeUsers);
    const [chatStarted, setChatStarted] = useState(false);
    const [currentChatFriend, setCurrentChatTabName] = useState("");
    const [currentChatFriendPhoto, setCurrentChatFriendPhoto] = useState("");
    const [message, setMessage] = useState("");
    const [chatableUserUid, setChatableUserUid] = useState("");
    const userInfo = useSelector((state:RootState) => state.userAuth.userInfo)
    const users = useSelector((state:RootState) => state.realtimeUsers);
    const reduxDispatch = useDispatch();

    /**
     * 
     * @param user selected user
     * Here we initialize the chat 
     * Pass the necessary values for functions
     */
    const initChat = (user: any) => {
        setChatStarted(true);
        setCurrentChatTabName(user.displayName);
        setCurrentChatFriendPhoto(user.photoURL);
        setChatableUserUid(user.uid)
        getRealtimeConversation({ uid_1: userInfo.uid, uid_2: user.uid })
	}

    /**
     * save uids for users and messages to an object, and pass it as a paramater for update message
     */
    const submitMessage = async () => {
        const messageObject = {
            user_uid_1: userInfo.uid,
            user_uid_2: chatableUserUid,
            message
        }
        console.log(messageObject);
        if(message !== ""){
            await updateMessage(messageObject);
        }
    }

    /** update conversations collection(from database) with brand new messages */
    const updateMessage = async (msgObject: {}) => {
        const docref = collection(db, "conversations");
        await addDoc(docref, {
            ...msgObject,
            isView: false,
            createdAt: new Date()
        })
        .then(() => console.log("conversation is updated"))
        .catch((error) => alert(error));

    }

    /**
     * 
     * @param convObj in conversation object we store the current user and the possible chat partner
     * Create a new inmutable instance of quary with our collection and ordering by created time
     * With forEach, we go through the elements of the document and push the necessary ones to conversations array
     * We update our conversation state with our brand new conversations array from there, by this, we made it possible to go through with map function below
     */
    const getRealtimeConversation = async (convObj:{uid_1:string, uid_2:string}) => {
        const q = query(collection(db, "conversations"), orderBy("createdAt", "asc"));
        onSnapshot(q, (querySnapshot) => {
            const conversations: DocumentData[] = [];
            querySnapshot.forEach((document: any) => {
                if(document.data().user_uid_1 == convObj.uid_1 && document.data().user_uid_2 == convObj.uid_2 
                    ||
                    document.data().user_uid_1 == convObj.uid_2 && document.data().user_uid_2 == convObj.uid_1){
                    conversations.push(document.data());
                }
            });
            if(conversations.length > 0){
                reduxDispatch(setRealtimeConversation("GET_REALTIME_MESSAGES"))
                reduxDispatch(setConversations(conversations));
            }else{
                reduxDispatch(setRealtimeConversation("GET_REALTIME_MESSAGES_FAILURE"))
                reduxDispatch(setConversations(conversations));
            }
          
        })
    }

    return(
        /** Create layout for home page */
        <Layout>
            <div >
                <div className="listOfUsers">
                    {realtimeUsers.users.length > 0 ? 
                    realtimeUsers.users.map((user:any) => {
                        return (
                            <div key={user.uid}>
                                <div className="userContainer"> 
                                    <img src={`../../images/profileImages/${user.photoURL}`} className="userPhotos" onClick={() => initChat(user)}></img>
                                    <span className="userDisplayName">{user.displayName}</span>
                                    <span>{user.isOnline ? (<i className='bx bxs-check-circle'></i>) : (<i className='bx bx-circle'></i>)}</span>
                                </div>
                               
                            </div>
                        )
                    }) : ""}
                </div>
                
                <div className="homePageContainer">
                    <div className="chatArea">
                        <div className="chatHeader"> 
                            {currentChatFriendPhoto !== "" ? (
                                  <img src={`../../images/profileImages/${currentChatFriendPhoto}`} className="userPhotos" style={{marginLeft:"-6%", padding:"2%", marginBottom:"2%"}}></img>
                            ) : null}
                            {currentChatFriend !== "" ? currentChatFriend : "Welcome here, I hope, you will like it! Below, you can chat with our friends, try it out!" } 
                            
                        </div>
                    </div>

                    <div className="messageSections">
                        {chatStarted ? (users.conversations.map(con => 
                            <div style={{ textAlign: con.user_uid_1 == userInfo.uid ? "right" : "left" }} className="messagesContainer">
                                <p className="messageStyle" style={{ backgroundColor: con.user_uid_1 == userInfo.uid ? "black" : "grey" }}>{con.message}</p>
                            </div>
                        )
                        ) : null}
                    </div>
                    
                    {chatStarted ? (  
                        <div className="chatControls">
                            <textarea className="messTextArea" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="You can write message here"/>
                            <button onClick={submitMessage}>Send</button>
                        </div>
                    ) : ( 
                        <div className="chatControls">
                            <textarea className="messTextArea"/>
                            <button></button>
                        </div>
                    )} 
                  
                </div>
            </div>
        </Layout>
    )
}

export default Home;
