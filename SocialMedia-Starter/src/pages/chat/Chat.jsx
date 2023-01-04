import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { userChats } from "../../api/ChatRequest";
import Conversation from "../../components/conversation/Conversation";
import Logosearch from "../../components/logoSearch/Logosearch";
import Home from "../../img/home.png";
import Noti from "../../img/noti.png";
import Comment from "../../img/comment.png";
import { UilSetting } from "@iconscout/react-unicons";
import { Link } from "react-router-dom";
import "./Chat.css";
import ChatBox from "../../components/chatBox/ChatBox";
import NavIcons from "../../components/navIcons/NavIcons";
import { io } from "socket.io-client";
import { useRef } from "react";

const Chat = () => {
  const { user } = useSelector((state) => state.authReducer.authData);

  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [sendMessage, setSendMessage] = useState(null);
  const [receiveMessage, setReceiveMessage] = useState(null);
  const socket = useRef();

  //sending message to socket server
  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit("send-message", sendMessage);
    }
  },[sendMessage]);

  
  useEffect(() => {
      socket.current = io("http://localhost:8800");
      socket.current.emit("new-user-add", user._id);
      socket.current.on("get-users", (users) => {
          setOnlineUsers(users);
        });
    }, [user]);
    
    //recieve message from the socket server
    useEffect(() => {
      socket.current.on("receive-message", (data) => {
        setReceiveMessage(data);
      });
    }, []);
    
  useEffect(() => {
    const getChats = async () => {
      try {
        const { data } = await userChats(user._id);
        setChats(data);
      } catch (error) {
        console.log(error);
      }
    };
    getChats();
  }, [user._id]);

  const checkOnlineStatus=(chat)=>{
    const chatMember=chat.members.find((member)=>member!==user._id);
    const online= onlineUsers.find((user)=>user.userId===chatMember)
    return online?true:false;
  }
  return (
    <div className="Chat">
      {/* leftsids chat */}
      <div className="Left-side-chat">
        <Logosearch />
        <div className="Chat-container">
          <h2>Chats</h2>
          <div className="Chat-list">
            {chats.map((chat) => (
              <div
                onClick={() => {
                  setCurrentChat(chat);
                }}
              >
                <Conversation data={chat} currentUserId={user._id} online={checkOnlineStatus(chat)} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* rightside chats */}
      <div className="Right-side-chat">
        <div style={{ width: "20rem", alignSelf: "flex-end" }}>
          {/* <div className="navIcons">
           <Link to="../home">
            <img src={Home} alt="" className="" />
           </Link>
            <UilSetting/>
            <img src={Noti}     alt="" className="" />
            <Link to="../chat">

            <img src={Comment} alt="" className="" />
            </Link>
        </div> */}
          <NavIcons />
        </div>
        <ChatBox
          chat={currentChat}
          currentUser={user._id}
          setSendMessage={setSendMessage}
          receiveMessage={receiveMessage}
        />
      </div>
    </div>
  );
};

export default Chat;