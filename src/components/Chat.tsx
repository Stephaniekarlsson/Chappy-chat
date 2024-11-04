import '../css/chat.css'
import { useState, useRef, useEffect } from 'react';
import { LuSendHorizonal } from "react-icons/lu";
import { useMessageStore } from '../data/messageStore';
import { useUserStore } from '../data/UserStore';
import { Message } from '../data/messageStore'
import { DmMessage } from '../api/dmApi';

import { handleSendDm } from '../functions/ChatFunctions';
import { handleSendChannelMessage } from '../functions/ChatFunctions';

export const Chat = () => {

  const { messages, currentChannelId, setMessages} = useMessageStore();
  const [inputValue, setInputValue] = useState('');
  const endOfMessagesRef = useRef<HTMLDivElement>(null)
  const currentUser = useUserStore((state) => state.user?.username) || 'Guest';
  const currentDmUser = useMessageStore((state) => state.currentDmUser);


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
        if (currentDmUser) {
          await handleSendDm(inputValue, setInputValue, currentUser, currentDmUser, setMessages);
        } else if (currentChannelId) {
          await handleSendChannelMessage(inputValue, setInputValue, currentUser, currentChannelId, setMessages);
        }
      }
    };
    
    
    

    useEffect(() => {
      endOfMessagesRef.current?.scrollIntoView({ behavior: 'auto' });
  }, [filteredMessages]);

  return (
    <>
    <section className='chat-section'>
      <div className='messages-container'>
        {filteredMessages.length > 0 ? (
          filteredMessages.map((msg) => {
            const isChannelMessage = 'channel_id' in msg;

            return (
            <div 
              key={isChannelMessage ? msg._id : `${msg.sender}-${msg.receiver}-${msg.message}`} 
              className="message-wrapper"
            >
              <div className="message-info">
                {msg.sender !== currentUser && 'img' in msg && (
                  <>
                    <img src={msg.img} alt='' className="profile-image" />
                    <p className="username">{'username' in msg ? msg.username : msg.sender}</p>
                  </>
                )}
              </div>
              <div className={`message ${msg.sender === currentUser ? 'self' : 'other'}`}>
                {msg.message}
              </div>
            </div>
          );
        })
      ) : (
        <p>There's no messages for this channel yet.</p>
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
