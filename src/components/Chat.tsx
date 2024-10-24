import '../css/chat.css'
import { useState, useRef, useEffect } from 'react';
import { LuSendHorizonal } from "react-icons/lu";


const testMessages = [
  { id: 1, text: 'Hej!', sender: 'other' },
  { id: 2, text: 'Hur mår du?', sender: 'self' },
  { id: 3, text: 'Jag mår bra, tack!', sender: 'other' },
  { id: 4, text: 'Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsumLorem ipsumLorem ipsum', sender: 'self' },
  { id: 5, text: 'Lorem ipsum Lorem ipsum Lorem ipsum', sender: 'self' },
  { id: 6, text: 'Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsumLorem ipsumLorem ipsum', sender: 'other' },
  { id: 7, text: 'Lorem ipsu ipsum', sender: 'self' },
  { id: 8, text: 'Lorem ipsumLorem ipsum', sender: 'other' },
  { id: 9, text: 'Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsumLorem ipsumLorem ipsum', sender: 'self' },
  { id: 10, text: 'Lorem  ipsum', sender: 'self' },
  { id: 11, text: 'Lorem ipsum  ipsum', sender: 'other' },
  { id: 12, text: 'ipsum', sender: 'other' },
];

export const Chat = () => {

  const [messages, setMessages] = useState(testMessages);
  const [inputValue, setInputValue] = useState('');
  const endOfMessagesRef = useRef<HTMLDivElement>(null)

  const handleSend = () => {
    if (inputValue.trim()) {
        const newMessage = {
            id: messages.length + 1,
            text: inputValue,
            sender: 'self',
        };
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        setInputValue(''); 
    }
};

useEffect(() => {
  endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
}, [messages]);

  return (
    <>
    <section className='chat-section'>
      <div className='messages-container'>
        {messages.map((msg) => (
          <div key={msg.id} className={`message ${msg.sender}`}>
              {msg.text}
          </div>
        ))}
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
  )
} 
