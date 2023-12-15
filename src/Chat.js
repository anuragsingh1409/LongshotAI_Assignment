
import React, { useState, useEffect } from 'react';
import { IoSend } from "react-icons/io5";
import { RiRobot2Fill } from "react-icons/ri";
import { FaUserAlt } from "react-icons/fa";
import { FaCopy } from "react-icons/fa";
import { BiCheckDouble } from "react-icons/bi";
import API_KEY from './env';

const Chat = ({ chatId, onDelete }) => {
  const [input, setInput] = useState('');
  const [latestResponse, setLatestResponse] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [copy, setCopy] = useState(true);
  const chatKey = `chat-${chatId}`; // Use the chatId in the local storage key

  useEffect(() => {
    // Load chat history from local storage on component mount
    const storedChat = localStorage.getItem(chatKey);
    console.log(storedChat)
    if (storedChat) {
      setChatHistory(JSON.parse(storedChat));
    }
  }, [chatKey]);

  const handleQuery = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        'https://api-v2.longshot.ai/custom/api/generate/instruct',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${API_KEY}`,
          },
          body: JSON.stringify({ text: input }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();
      const newResponse = data.copies[0].content;

      // Update latest response state
      setLatestResponse(newResponse);

      // Update chat history
      const newChatHistory = [...chatHistory, { input, response: newResponse }];
      setChatHistory(newChatHistory);
      localStorage.setItem(chatKey, JSON.stringify(newChatHistory));

      // Clear the input for the next query
      setInput('');
    } catch (error) {
      console.error('Error fetching response:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleQuery();
    }
  };

  const handleCopyResponse = () => {
    navigator.clipboard.writeText(latestResponse);
    setCopy(false);
  };
  const handleDone = () => {
    setCopy(true);
  };

  return (
    <div style={{ width: '100%', display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center', margin: '0' }}>
      <div style={{ width: '90%', display: 'flex', height: '95%', flexDirection: 'column', justifyContent: chatHistory.length?'space-between':'end' }}>
      <div style={{ width: '100%', height: '90%', overflowY: 'auto' }}>
        {chatHistory.slice(0, chatHistory.length-1).map((chat, index) => (
          <div style={{ fontSize: '25px', width: '100%' }} key={index}>
            <div style={{ display: 'flex', backgroundColor: '31304D', alignItems: 'center' }}>
            {/* <p style={{ width: '110px', padding: '0 10px' }}>You:</p> */}
            <FaUserAlt style={{ width: '40px', height:'40px', margin: '0 5px',color:'#818FB4'}}/><p> {chat.input}</p>
            </div>
            <div style={{ display: 'flex', backgroundColor: '#FCF5ED', alignItems: 'center'  }}>
            {/* <p style={{ width: '110px', padding: '0 10px' }}>NewGPT:</p> */}
            <RiRobot2Fill style={{ width: '50px', height:'50px', margin: '0 5px',color:'#363062' }}/><p> {chat.response}</p>
          </div>
          </div>
        ))}
        {
          chatHistory.length && <div style={{ fontSize: '25px', width: '100%' }} >
            
            <div style={{ display: 'flex', backgroundColor: '#F4BF96', alignItems: 'center' }}>
            <FaUserAlt style={{ width: '40px', height:'40px', margin: '0 5px',color:'#818FB4'}}/><p> {chatHistory[chatHistory.length - 1].input}</p>
            </div>
            <div style={{ display: 'flex', backgroundColor: '#FCF5ED', alignItems: 'center', justifyContent: 'space-between'  }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
            <RiRobot2Fill style={{ width: '50px', height:'50px', margin: '0 5px',color:'#363062' }}/><p> {chatHistory[chatHistory.length - 1].response}</p>
            </div>
            <div>
            {latestResponse && copy? (<FaCopy style={{ padding: '3px 6px', fontSize: '20px', margin: '0 10px',color:'#2d2b2b' }} onClick={handleCopyResponse} />):
            (<BiCheckDouble onClick={handleDone} />)
            }
          </div>
          </div>
          </div>
        }
        {loading && <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}><p style={{ fontSize: '20px' }}>Loading...</p></div>}
          </div>
        
        <div style={{ width: '100%', height: '40px',display:'flex',alignItems:'center' }}>
          <input
            type="text"
            value={input}
            style={{ width: '90%', padding: '10px 10px', fontSize: '20px',borderRadius:'10px' }}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your query..."
          />
          <IoSend style={{ padding: '2px 9px',width:'30px',height:'30px'}} onClick={handleQuery}/>
        </div>
      </div>
    </div>
  );
};

export default Chat;