import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

function ChatBotHelper() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi! I’m RentBot. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { from: 'user', text: input };
    const botReply = getBotReply(input);

    setMessages([...messages, userMessage, { from: 'bot', text: botReply }]);
    setInput('');
  };

  const getBotReply = (msg) => {
    const lower = msg.toLowerCase();
    if (lower.includes('book') || lower.includes('car')) {
      return 'You can book a car from the "Popular Rentals" section or go to the Booking page.';
    } else if (lower.includes('price')) {
      return 'Prices vary based on the car. Check Popular Rentals for current deals.';
    } else if (lower.includes('help')) {
      return 'Sure! Ask me anything about car rentals, booking, or account setup.';
    } else {
      return 'Sorry, I didn’t understand that. Try asking about booking, pricing, or help.';
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="w-80 h-96 bg-white shadow-xl rounded-2xl flex flex-col border border-gray-300">
          <div className="flex justify-between items-center p-3 border-b">
            <h4 className="font-semibold text-gray-700">RentBot Assistant</h4>
            <button onClick={() => setIsOpen(false)}><X size={20} /></button>
          </div>
          <div className="flex-1 p-3 overflow-y-auto space-y-2">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`text-sm p-2 rounded-lg max-w-xs ${
                  msg.from === 'bot'
                    ? 'bg-gray-100 text-gray-800 self-start'
                    : 'bg-blue-600 text-white self-end ml-auto'
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>
          <div className="p-3 border-t flex items-center gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask me something..."
              className="flex-1 border rounded-lg px-3 py-1 text-sm"
            />
            <button
              onClick={handleSend}
              className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm"
            >
              Send
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg"
          aria-label="Open chatbot"
        >
          <MessageCircle size={24} />
        </button>
      )}
    </div>
  );
}

export default ChatBotHelper;
