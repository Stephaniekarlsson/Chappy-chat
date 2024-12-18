import '../css/chat.css'
import { useState, useRef, useEffect } from 'react';
import { LuSendHorizonal } from "react-icons/lu";
import { useMessageStore } from '../data/messageStore';
import { useUserStore } from '../data/UserStore';
import { Message } from '../data/messageStore'
import { DmMessage } from '../api/dmApi';
import { handleSendDm } from '../functions/ChatFunctions';
import { handleSendChannelMessage } from '../functions/ChatFunctions';
import { BsSendSlash } from "react-icons/bs";
import owl_img from '../assets/hi_owl3.png';

export const Chat = () => {

  const { messages, currentChannelId, setMessages} = useMessageStore();
  const [inputValue, setInputValue] = useState('');
  const endOfMessagesRef = useRef<HTMLDivElement>(null)
  const currentUser = useUserStore((state) => state.user?.username) || 'Guest';
  const currentDmUser = useMessageStore((state) => state.currentDmUser);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const users = useUserStore((state) => state.users);

  const filteredMessages = currentDmUser
  ? messages.filter((message): message is DmMessage => {
      return 'receiver' in message && 
             ((message.sender === currentUser && message.receiver === currentDmUser) ||
              (message.sender === currentDmUser && message.receiver === currentUser));
    })
  : messages.filter((message): message is Message => {
      return 'channel_id' in message && message.channel_id === currentChannelId;
    });



const handleSend = async () => {
  if (inputValue.trim()) {
    setIsLoading(true); 
    try {
      if (currentDmUser) {
        await handleSendDm(inputValue, setInputValue, currentUser, currentDmUser, currentChannelId, setMessages); 
      } else if (currentChannelId) {
        await handleSendChannelMessage(inputValue, setInputValue, currentUser, currentChannelId, currentDmUser, setMessages); 
      }
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsLoading(false); 
    }
  }
};
  
    const getUserInfo = (sender: string) => {
      const user = users.find(user => user.username === sender);
      return user ? { image: user.image, username: user.username } : { image: 'https://i.postimg.cc/C5hXKtCL/Designer-10.jpg', username: sender };
    };
    
    useEffect(() => {
      endOfMessagesRef.current?.scrollIntoView({ behavior: 'auto' });
  }, [filteredMessages]);

  const handlePressEnter = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isLoading) {
      handleSend();
    }
  };

  const timeStamp = (timestamp: string | undefined) => {
    if (!timestamp) return '';
  
    const date = new Date(timestamp);
  
    const day = date.getDate(); 
    const month = date.toLocaleString('default', { month: 'short' }); 
    const year = date.getFullYear(); 
    const hours = date.getHours(); 
    const minutes = date.getMinutes(); 
  
    const formatMinutes = minutes < 10 ? `0${minutes}` : minutes;
  
    return `${day} ${month} ${year}, ${hours}:${formatMinutes}`;
  };
  

  return (
    <>
      <section className='chat-section'>
        {(currentChannelId || currentDmUser) ? (
          <div className='messages-container'>
            {filteredMessages.length > 0 ? (
              filteredMessages.map((msg) => {
                const isChannelMessage = 'channel_id' in msg;
  
                return (
                  <div 
                    key={isChannelMessage ? msg._id : `${msg.sender}-${msg.receiver}-${msg.timestamp}`} 
                    className="message-wrapper"
                  >
                    <div className="message-info">
                      {msg.sender !== currentUser && (
                        <>
                          <img src={getUserInfo(msg.sender).image} alt='' className="profile-image" />
                          <p className="username">{getUserInfo(msg.sender).username}</p>
                        </>
                      )}
                    </div>
                    <div className={`message ${msg.sender === currentUser ? 'self' : 'other'}`}>
                      {msg.message}
                    </div>
                    <div className={`message-timestamp ${msg.sender === currentUser ? 'self' : 'other'}`}>
                      {timeStamp(msg.timestamp)} 
                    </div>              
                  </div>
                );
              })
            ) : (
              <div className="empty-chat-container">
                <p className='empty-chat-message'>Start chat</p>
                <img src={owl_img} alt="owl image" className='empty-chat-img'/>
              </div>
            )}
            <div ref={endOfMessagesRef} />
          </div>
        ) : null}
  
        {(currentChannelId || currentDmUser) && (
          <div className='input-container'>
            <input
              type='text'
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handlePressEnter}
              placeholder='Write a message...'
            />
            <button onClick={handleSend} disabled={isLoading}>
              {isLoading ? <BsSendSlash className='send-icon' /> : <LuSendHorizonal className='send-icon' />}
            </button>
          </div>
        )}
      </section>
    </>
  );
  
  
} 
