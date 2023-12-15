import React, { useState,useEffect } from 'react';
import './App.css';
import Chat from './Chat';
import ChatList from './ChatList';
function App() {

  const [chats, setChats] = useState([1]);
  const [currentChat, setCurrentChat] = useState(null);
  useEffect(() => {
    // Load chat list from local storage on component mount
    const storedChats = localStorage.getItem('chatList');
    if (storedChats) {
      setChats(JSON.parse(storedChats));
    }
  }, []);
  const handleCreateChat = () => {
    const newChatCount = chats.length > 0 ? chats[chats.length - 1] + 1 : 1;
    const newChats = [...chats, newChatCount];
    localStorage.setItem('chatList', JSON.stringify(newChats));

    setChats(newChats);
    setCurrentChat(newChats);
  };

  const handleSelectChat = (chatId) => {
    setCurrentChat(chatId);
  };

  const handleDeleteChat = (chatId) => {
    const updatedChats = chats.filter((id) => id !== chatId);
    localStorage.setItem('chatList', JSON.stringify(updatedChats));
    setChats(updatedChats);
    setCurrentChat(null);
  };

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex' }}>
    <div style={{ width: '20%', height: '100vh', backgroundColor:'black',overflowY:'scroll' }}>
        <div style={{ width: '100%', height: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ width: '90%', height: '90%', display: 'flex', flexDirection: 'column' }}>
        <h1 style={{ fontSize: '30px', color:'white' }}>NewGPT Web</h1>
        <button style={{padding: '8px 6px', fontSize: '20px', borderRadius:'10px', backgroundColor:'grey',outline:'none' }} onClick={handleCreateChat}><span style={{fontSize:'18px',fontWeight:'bold',color:'white'}}>New Chat</span></button>
        </div>
        </div>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ width: '90%', display: 'flex', flexDirection: 'column' }}>
        <ChatList chats={chats} onSelectChat={handleSelectChat} 
            onDelete={handleDeleteChat}/>
        </div>
        </div>
      </div>
    <div style={{ width: '80%', height: '100%', display: 'flex', justifyContent: 'center',backgroundColor:'#F4BF96' }}>
      <div style={{ width: '90%'  }}>
        {currentChat !== null && (
          <Chat
            key={currentChat}
            chatId={currentChat}
          />
        )}
      </div>
      </div>
    </div>
  );
}

export default App;