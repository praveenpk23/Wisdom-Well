import { useState, useEffect, useRef } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function AskAI() {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const chatEndRef = useRef(null);

  // ✅ Scroll to bottom auto
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ✅ Message send
  const ask = async () => {
    if (!prompt.trim()) return;

    const userMsg = { role: "user", content: prompt };
    setMessages((prev) => [...prev, userMsg]);

    setPrompt("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/ai/ask", { prompt });

      const text = res.data.choices[0].message.content;

      const aiMsg = { role: "assistant", content: text.trim() };
      setMessages((prev) => [...prev, aiMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "⚠️ Could not reach server." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Enter to send
  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      ask();
    }
  };

  // ✅ Copy message
  const copyContent = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="h-screen w-full flex flex-col bg-base-200">

      {/* ✅ CHAT AREA */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">

        {messages.map((msg, i) => (
          <div key={i}>
            
            {/* ✅ USER MESSAGE */}
            {msg.role === "user" && (
              <div className="flex justify-end">
                <div className="max-w-xl bg-primary text-primary-content px-4 py-3 rounded-2xl shadow-md text-sm">
                  {msg.content}
                </div>
              </div>
            )}

            {/* ✅ ASSISTANT MESSAGE - PERPLEXITY STYLE */}
            {msg.role === "assistant" && (
              <div className="flex justify-start">
                <div className="relative bg-base-100 border border-base-300 px-6 py-5 rounded-xl shadow-sm max-w-3xl text-sm leading-relaxed prose prose-sm dark:prose-invert">
                  
                  {/* ✅ COPY BUTTON */}
                  <button
                    onClick={() => copyContent(msg.content)}
                    className="absolute top-2 right-2 text-xs px-2 py-1 rounded-md bg-base-300 hover:bg-base-200 transition"
                  >
                    Copy
                  </button>

                  {/* ✅ BEAUTIFUL MARKDOWN OUTPUT */}
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {msg.content}
                  </ReactMarkdown>
                </div>
              </div>
            )}
          </div>
        ))}

        {/* ✅ LOADING MESSAGE */}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-base-300 px-4 py-3 rounded-xl animate-pulse text-sm">
              Thinking...
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* ✅ FIXED INPUT BAR */}
      <div className="
        p-5 bg-base-100 border-t border-base-300 
        flex flex-col items-center gap-3
        sticky bottom-0
      ">

        <textarea
          className="
            textarea textarea-bordered w-full max-w-3xl 
            rounded-xl resize-none text-sm
          "
          placeholder="Ask anything..."
          value={prompt}
          onKeyDown={handleKey}
          onChange={(e) => setPrompt(e.target.value)}
        />

        <button
          onClick={ask}
          disabled={loading}
          className="btn btn-primary w-40 h-12 rounded-full shadow-md"
        >
          {loading ? <span className="loading loading-spinner"></span> : "Send"}
        </button>

      </div>
    </div>
  );
}
