import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Chat.css'; // Custom styles

const Chat = ({ otherUserId, userId, token }) => {
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState('');

  const fetchMessages = async () => {
    try {
      const res = await axios.get(`/api/messages/all/${otherUserId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessages(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error('Failed to load messages:', err);
    }
  };

  const sendMessage = async () => {
    if (!newMsg.trim()) return;

    try {
      const res = await axios.post('/api/messages/send', {
        teacherId: otherUserId,
        message: newMsg
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setMessages([...messages, res.data.data]);
      setNewMsg('');
    } catch (err) {
      console.error('Send error:', err);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [otherUserId]);

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`chat-bubble ${msg.studentId === userId ? 'sent' : 'received'}`}
          >
            {msg.message}
            <span className="timestamp">{new Date(msg.sentAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
        ))}
      </div>

      <div className="chat-input-area">
        <input
          type="text"
          value={newMsg}
          onChange={(e) => setNewMsg(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
