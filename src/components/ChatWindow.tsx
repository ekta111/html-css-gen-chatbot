"use client";

import React, { useEffect, useRef, useState } from "react";
import { BsSend } from "react-icons/bs";
import { MdOutlineChat } from "react-icons/md";
import { useChat } from "ai/react";

interface ChatMessage {
  role: string;
  content: string;
}
const ChatWindow = () => {
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const { input, handleInputChange,setInput } = useChat();
  const [loading, setLoading] = useState<boolean>(false);
  const [chat, setChat] = useState<ChatMessage[]>([]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);


  // Handle form submission
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return; // Prevent empty submissions

    const prompt = input ;
    setInput('')
    setChat((prev) => [...prev, { role: "user", content: input }])
    setLoading(true); // Start loading

    try {
      // Fetch response directly from your backend
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [{ role: 'user', content: prompt }] }),
      });


      if (!response.ok) {
        throw new Error('Failed to fetch response from the server');
      }

      const data = await response.json();
      console.log(data, 'response'); // Log the server's response for debugging

      if (data?.choices?.[0]?.message?.content) {
        setChat((prev) => [...prev, { role: data?.choices?.[0]?.message?.role, content: data?.choices?.[0]?.message?.content }])
      }
    } catch (error) {
      console.error('Error generating code:', error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="flex w-[95%] h-[97%] bg-gray-100 rounded-3xl">
      {/* Chat and Input Area */}
      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b rounded-tr-3xl">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">HTML & CSS Generator</h2>
          </div>
        </div>

        {/* Display messages */}
        {chat.length > 0 ? (
         <div className="flex-1 p-4 overflow-y-scroll">
         {chat.map((m, index) => (
           <div
             key={index}
             className="whitespace-pre-wrap break-words mt-3"
             style={{ maxWidth: "100%" }} // Optional: Ensure the content respects container width
           >
             {m.role === "user" ? "User: " : "AI: "}
             {m.role !== "user" ? (
               <pre className="bg-gray-100 text-sm text-gray-800 p-4 rounded-lg border-2 whitespace-pre-wrap break-words">
                 <code>{m.content}</code>
               </pre>
             ) : (
               m.content
             )}
               <div ref={chatEndRef} />
           </div>
         ))}
       </div>
       
        ) : (
          <div className="h-full flex items-center justify-center">
            <div className="flex flex-col items-center">
              <MdOutlineChat size={80} className="text-gray-400" />
              <span className="text-gray-400 text-lg font-semibold">
                Start your First Conversation
              </span>
            </div>
          </div>
        )}

        {/* Form to handle message input */}
        <form onSubmit={handleFormSubmit}>
          <div className="p-4 relative bg-white border-t rounded-br-3xl flex">
            <input
              type="text"
              className="flex-1 pl-4 pr-10 border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder={loading ? "Generating response...":"Type your prompt..."}
              value={input}
              onChange={handleInputChange}
              disabled={loading} // Disable input while loading
            />

            <button
              type="submit"
              className={`flex absolute right-8 top-[26px] space-x-3 ${loading ? "cursor-not-allowed opacity-50" : ""
                }`}
              disabled={loading} // Disable button while loading
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-blue-900"></div>
              ) : (
                <BsSend size={20} className="text-gray-600" />
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatWindow;
