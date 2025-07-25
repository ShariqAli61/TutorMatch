// function Chat() {
//     return <div className="text-center mt-10">Chat with your teacher.</div>;
//   }
  
//   export default Chat;



import { useState } from "react";
import { FaPaperclip, FaPaperPlane, FaSearch } from "react-icons/fa";

export default function Chat() {
  const [messages, setMessages] = useState([
    { sender: "Teacher", text: "Hello! How can I help you today?", time: "10:00 AM" },
  ]);
  const [input, setInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSend = () => {
    if (input.trim() !== "") {
      const newMessage = { sender: "Parent", text: input, time: new Date().toLocaleTimeString() };
      setMessages([...messages, newMessage]);
      setInput("");
    }
  };

  const filteredMessages = messages.filter(m =>
    m.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Secure Chat</h1>

      {/* Search Bar */}
      <div className="flex items-center mb-4">
        <FaSearch className="text-gray-500 mr-2" />
        <input
          type="text"
          placeholder="Search messages..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border rounded-md flex-1 dark:bg-gray-700 dark:text-white"
        />
      </div>

      {/* Message History */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow h-80 overflow-y-auto space-y-2 mb-4">
        {filteredMessages.map((msg, i) => (
          <div key={i} className={`p-2 rounded ${msg.sender === "Parent" ? "bg-blue-100 dark:bg-blue-700" : "bg-gray-200 dark:bg-gray-600"}`}>
            <p className="text-sm font-semibold">{msg.sender}:</p>
            <p>{msg.text}</p>
            <p className="text-xs text-right">{msg.time}</p>
          </div>
        ))}
      </div>

      {/* Chat Input */}
      <div className="flex items-center space-x-2">
        <label className="cursor-pointer">
          <FaPaperclip />
          <input type="file" className="hidden" />
        </label>
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="p-2 border rounded-md flex-1 dark:bg-gray-700 dark:text-white"
        />
        <button onClick={handleSend} className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md">
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
}
