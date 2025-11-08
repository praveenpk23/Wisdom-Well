import { useState, useRef, useEffect } from "react";
import axios from "axios";

export default function AskAI() {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const chatEndRef = useRef(null);

  // Auto scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const ask = async () => {
    if (!prompt.trim()) return;

    const userMessage = { role: "user", content: prompt };
    setMessages((prev) => [...prev, userMessage]);

    setPrompt("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/ai/ask", { prompt });

      const aiMessage = {
        role: "assistant",
        content: res.data.choices[0].message.content,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "⚠️ Error: Could not reach the server." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full flex flex-col bg-base-200">
      
      {/* ✅ NAVBAR */}
      <div className="navbar bg-base-100 shadow-lg px-6">
        <div className="flex-1">
          <h1 className="text-2xl font-bold">⚡ AI Assistant</h1>
        </div>
      </div>

      {/* ✅ CHAT AREA */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className={`chat ${msg.role === "user" ? "chat-end" : "chat-start"}`}>
            <div className="chat-bubble chat-bubble-primary max-w-[70%] whitespace-pre-wrap">
              {msg.content}
            </div>
          </div>
        ))}

        {/* ✅ Loading animation */}
        {loading && (
          <div className="chat chat-start">
            <div className="chat-bubble bg-base-300 animate-pulse">
              Thinking...
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* ✅ INPUT AREA */}
      <div className="p-4 bg-base-100 border-t flex gap-3">
        <textarea
          className="textarea textarea-bordered w-full resize-none h-20"
          placeholder="Type your message..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />

        <button
          onClick={ask}
          className="btn btn-primary h-20 w-28"
          disabled={loading}
        >
          {loading ? <span className="loading loading-spinner"></span> : "Send"}
        </button>
      </div>
    </div>
  );
}
