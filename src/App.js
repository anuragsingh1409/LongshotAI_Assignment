// src/App.js
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
    <div style={{ width: '20%', height: '100vh', backgroundColor:'black' }}>
        <div style={{ width: '100%', height: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ width: '90%', height: '90%', display: 'flex', flexDirection: 'column' }}>
        <h1 style={{ fontSize: '30px', color:'white' }}>NewGPT Web</h1>
        <button style={{padding: '8px 6px', fontSize: '20px', borderRadius:'10px', backgroundColor:'grey' }} onClick={handleCreateChat}><span style={{fontSize:'18px',fontWeight:'bold',color:'white'}}>New Chat</span></button>
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

// src/App.jsx
// App.js

// import { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// import './App.css';
// import Chat from './Chat';
// import ChatContainer from './ChatContainer';

// function App() {
//   const [chatCount, setChatCount] = useState(1);
//   const [chats, setChats] = useState([1]);

//   const handleCreateChat = () => {
//     const newChatCount = chatCount + 1;
//     setChatCount(newChatCount);
//     setChats([...chats, newChatCount]);
//   };

//   return (
//     <Router>
//       <div className="app-container">
//         <header className="App-header" style={{ textAlign: "center" }}>
//           <h1>NewGPT</h1>
//         </header>

//         <div className="row createNewIcon">
//           <button className='' onClick={handleCreateChat}>New Chat</button>
//         </div>

//         <div className="app-content">
//           <div className="chat-list">
//             <h2>Chats</h2>
//             <ul>
//               {chats.map((chatId) => (
//                 <li key={chatId}>
//                   <Link to={`/chat/${chatId}`}>Chat {chatId}</Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           <Routes>
//             <Route path="/chat/:id" element={<ChatContainer />}>
//             </Route>
//           </Routes>
//         </div>
//       </div>
//     </Router>
//   );
// }

// export default App;


// src/App.jsx
// import { useState } from 'react';
// import './App.css';
// import Chat from './Chat';

// function App() {
//   const [chatCount, setChatCount] = useState(1);
//   const [chats, setChats] = useState([1]);

//   const handleCreateChat = () => {
//     const newChatCount = chatCount + 1;
//     setChatCount(newChatCount);
//     setChats([...chats, newChatCount]);
//   };

//   const handleDeleteChat = (chatId) => {
//     const updatedChats = chats.filter((id) => id !== chatId);
//     setChats(updatedChats);
//   };

//   return (
//     <>
   
      
//       <header className="App-header" style={{textAlign:"center"}}>
//         <h1>ChatGPT Web App</h1>
//       </header>
      
//       <div className="row createNewIcon"><button className='' onClick={handleCreateChat}>Create New</button></div>
//     <div className="App ">
//       <main>
        
//         {chats.map((chatId) => (
//           <Chat key={chatId} chatId={chatId} onDelete={handleDeleteChat} />
//         ))}
//       </main>
//     </div>
    
//     </>
//   );
// }

// export default App;


