import { addDoc, collection, doc, DocumentData, onSnapshot, orderBy, query, setDoc, updateDoc, where } from "firebase/firestore";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/Layout/Layout";
import { db } from "../../firebase/firebase";
import { setConversations, setRealtimeConversation, setRealtimeUsers, setUsers } from "../../store/realtimeUsersSlice";
import { RootState } from "../../store/store";
import "./styleHome.css";

const Home = () => {
    const realtimeUsers = useSelector((state:RootState) => state.realtimeUsers);
    const [chatStarted, setChatStarted] = useState(false);
    const [currentChatFriend, setCurrentChatTabName] = useState("");
    const [message, setMessage] = useState("");
    const [chatableUserUid, setChatableUserUid] = useState("");

    const userInfo = useSelector((state:RootState) => state.userAuth.userInfo)
    const conversationsArr = useSelector((state:RootState) => state.realtimeUsers.conversations);
    const reduxDispatch = useDispatch();

    const initChat = (user: any) => {
        setChatStarted(true);
        setCurrentChatTabName(user.displayName);
        setChatableUserUid(user.uid)
        getRealtimeConversation({ uid_1: userInfo.uid, uid_2: user.uid })
	}

    const submitMessage = async (e: any) => {
        const messageObject = {
            user_uid_1: userInfo.uid,
            user_uid_2: chatableUserUid,
            message
        }
        if(message !== ""){
            await updateMessage(messageObject);
        }
    }

    const updateMessage = async (msgObject: any) => {
        const docref = collection(db, "conversations");
        Object.preventExtensions(msgObject);
        await addDoc(docref, {
            ...msgObject,
            isView: false,
            createdAt: new Date()
        })
        .then(() => console.log("message is sent"))
        .catch((error) => alert(error));
    }

    	
    const getRealtimeConversation = async (convObj:{uid_1:string, uid_2:string}) => {
		const conversations: DocumentData[] = [];
        const q = query(collection(db, "conversations"), orderBy("createdAt", "desc"));
        onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((document: any) => {
                //Kivalogassuk, akikkel volt uzenet valtas
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
            }
        })
    }

    return(
       
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
                        <div className="chatHeader"> {currentChatFriend !== "" ? currentChatFriend : "Welcome here, I hope, you will like it! Below, you can chat with our friends, try it out!" } </div>
                    </div>

                    <div className="messageSections">
                        {chatStarted ? (conversationsArr.map(con => 
                            <div style={{ textAlign: con.user_uid_1 == userInfo.uid ? "right" : "left" }}>
                                <p className="messageStyle">{con.message}</p>
                            </div>
                        )
                        ) : null}
                     
                    </div>
                    
                    {chatStarted ? (  
                        <div className="chatControls">
                            <textarea className="messTextArea" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="You can write message here"/>
                            <button onClick={submitMessage}>Send</button>
                        </div>
                    ) : null} 
                  
                </div>
              

            </div>
        </Layout>
    )
}

export default Home;
