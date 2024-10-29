import '../css/chat.css'
import { useState, useRef, useEffect } from 'react';
import { LuSendHorizonal } from "react-icons/lu";
import { useMessageStore } from '../data/messageStore';
import { useUserStore } from '../data/UserStore';
import { addChannelMessage } from '../api/channelApi';


export const Chat = () => {

  const { messages, addMessage, currentChannelId } = useMessageStore();
  const [inputValue, setInputValue] = useState('');
  const endOfMessagesRef = useRef<HTMLDivElement>(null)
  const currentUser = useUserStore((state) => state.user?.username) || 'Guest';

  const filteredMessages = messages.filter(message => message.channel_id === currentChannelId);

  const handleSend = async () => {
    if (inputValue.trim() && currentChannelId) {
      const newMessage = {
        channel_id: currentChannelId,
        sender: currentUser,
        message: inputValue,
      };

      const response = await addChannelMessage(newMessage);

      if (response) {
        
        addMessage(response); 
        setInputValue('');
      }
    }
  };

    useEffect(() => {
      endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [filteredMessages]);

  return (
    <>
    <section className='chat-section'>
      <div className='messages-container'>
        {filteredMessages.length > 0 ? (
          filteredMessages.map((msg) => (
            <div key={msg._id} className="message-wrapper">
              <div className="message-info">
                {msg.sender !== currentUser && (
                  <>
                    <img src={msg.img} alt='' className="profile-image" />
                    <p className="username">{msg.username}</p>
                  </>
                )}
              </div>
              <div className={`message ${msg.sender === currentUser ? 'self' : 'other'}`}>
                {msg.message}
              </div>
            </div>
          ))
        ) : (
          <p>There's no messages fot this channel yet.</p> 
        )}
        <div ref={endOfMessagesRef} />
      </div>
      <div className='input-container'>
        <input
          type='text'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder='Write a message...'
        />
        <button onClick={handleSend}><LuSendHorizonal className='send-icon'/></button>
      </div>
    </section>
    </>
);
} 
