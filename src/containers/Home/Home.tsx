import React from "react";
import { useSelector } from "react-redux";
import Layout from "../../components/Layout/Layout";
import { RootState } from "../../store/store";
import "./styleHome.css";

const Home = () => {
    const realtimeUsers = useSelector((state:RootState) => state.realtimeUsers);
    console.log(realtimeUsers.users.length);
    return(
       
        <Layout>
           
            <div >
                <div className="listOfUsers">
                    {realtimeUsers.users.length > 0 ? 
                    realtimeUsers.users.map((user:any) => {
                        return (
                            <div key={user.uid}><img src={`../../images/profileImages/${user.photoURL}`} className="userPhotos" onClick={() => {console.log(user.displayName)}}></img></div>
                        )
                    }) : ""}
                </div>
                
                <div className="homePageContainer">
                    <div className="chatArea">
                        <div className="chatHeader"> Rizwan Khan </div>
                    </div>

                    <div className="messageSections">

                        <div style={{ textAlign: 'left' }}>
                            <p className="messageStyle" >Hello User</p>
                        </div>

                    </div>

                    <div className="chatControls">
                        <textarea className="messTextArea" />
                        <button>Send</button>
                    </div>
                </div>
              

            </div>
        </Layout>
    )
}

export default Home;

function reduxDispatch(arg0: any) {
    throw new Error("Function not implemented.");
}


function query(arg0: any) {
    throw new Error("Function not implemented.");
}


function collection(db: any, arg1: string): any {
    throw new Error("Function not implemented.");
}


function onSnapshot(q: any, arg1: (querySnapshot: any) => void) {
    throw new Error("Function not implemented.");
}
