// src/ChatList.js
import React from 'react';
import { MdDelete } from "react-icons/md";

const ChatList = ({ chats, onSelectChat , onDelete }) => {
  return (
    <div style={{ width: '100%', margin: '20px 0' }}>
      <h2 style={{ fontSize: '25px', color:"white" }}>Previous Chats</h2>
      <div style={{ width: '100%' }}>
      {chats.map((chatId, index) => (
        <div style={{width: '100%', margin: '10px 0', display: 'flex', alignItems: 'center'}}>
        <button style={{ width: '85%', padding: '8px 6px', fontSize: '20px', borderRadius:'10px', backgroundColor:'grey' }} key={index} onClick={() => onSelectChat(chatId)}>
          <span style={{fontSize:'18px',fontWeight:'bold',color:'white'}}>Chat {chatId}</span>
        </button>
        <MdDelete style={{ width: '15%', padding: '3px 6px', color: 'white', fontSize: '30px',color:"#ef7878" }} key={index} onClick={() => {
            localStorage.removeItem(`chat-${chatId}`);
            onDelete(chatId)}} />
        </div>
      ))}
    </div>
    </div> 
  );
};

export default ChatList;
