import { useState, useEffect, useRef } from "react";
import { useAskAiMutation, useGetUserChatsQuery } from "../Redux/aiApiSlice";
import { useGetUserProfileQuery } from "../Redux/UserApiSlice";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function AiChat() {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);
  const [chatId, setChatId] = useState(null);
  const [isThinking, setIsThinking] = useState(false); // new thinking state

  const bottomRef = useRef(null);
  const navigate = useNavigate();

  // Fetch profile
  const { data: profileData } = useGetUserProfileQuery();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!profileData || !profileData._id) {
      navigate("/login");
    }
  }, [profileData, navigate]);

  // Fetch latest user chat
  const { data: chatsData, refetch } = useGetUserChatsQuery({ page: 1, limit: 1 });

  useEffect(() => {
    if (chatsData?.chats?.length > 0 && !chatId) {
      const latestChat = chatsData.chats[0];
      setChatId(latestChat._id);
      setMessages(latestChat.messages || []);
    }
  }, [chatsData, chatId]);

  const [askAi] = useAskAiMutation();

  // Auto-scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isThinking]);

  // Send prompt
 const sendPrompt = async () => {
  if (!prompt.trim()) return;

  // Show user message instantly
  setMessages((prev) => [...prev, { role: "user", content: prompt }]);
  setPrompt("");
  setIsThinking(true);

  try {
    const res = await askAi({ prompt, chatId }).unwrap();

    // Get the latest message from backend
    const latestMessages = res?.messages || [];
    const aiReply = latestMessages[latestMessages.length - 1]?.content || "No response";

    setMessages(latestMessages); // update all messages
    setChatId(res?.chatId || chatId); // update chatId
  } catch (err) {
    console.error(err);
    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: "⚠️ Error talking to AI" },
    ]);
  } finally {
    setIsThinking(false);
  }
};


  // Handle Enter key
  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendPrompt();
    }
  };

  return (
<div style={styles.container}>
  <div style={styles.chatBox}>
    {messages.map((msg, i) => (
      <div
        key={i}
        style={{
          ...styles.message,
          alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
          background: msg.role === "user" ? "#2563eb" : "#0f172a",
        }}
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            p: ({ children }) => <p style={styles.p}>{children}</p>,
            h1: ({ children }) => <h1 style={styles.h1}>{children}</h1>,
            h2: ({ children }) => <h2 style={styles.h2}>{children}</h2>,
            ul: ({ children }) => <ul style={styles.ul}>{children}</ul>,
            li: ({ children }) => <li style={styles.li}>{children}</li>,
            strong: ({ children }) => (
              <strong style={{ color: "#e5e7eb" }}>{children}</strong>
            ),
            code: ({ inline, children }) =>
              inline ? (
                <code style={styles.inlineCode}>{children}</code>
              ) : (
                <pre style={styles.codeBlock}>
                  <code>{children}</code>
                </pre>
              ),
          }}
        >
          {msg.content}
        </ReactMarkdown>
      </div>
    ))}

    {/* 🧠 Thinking indicator */}
    {isThinking && (
      <div style={{ ...styles.message, ...styles.thinking }}>
        <span className="dot">●</span> AI is thinking
      </div>
    )}

    <div ref={bottomRef} />
  </div>

  <div style={styles.inputBox}>
    <textarea
      value={prompt}
      onChange={(e) => setPrompt(e.target.value)}
      onKeyDown={handleKey}
      placeholder="Ask something..."
      style={styles.textarea}
    />
    <button onClick={sendPrompt} disabled={isThinking} style={styles.btn}>
      {isThinking ? "Thinking..." : "Send"}
    </button>
  </div>
</div>

  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    background: "#020617",
    color: "#fff",
  },
  chatBox: {
    flex: 1,
    padding: "16px",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  message: {
    maxWidth: "70%",
    padding: "10px 14px",
    borderRadius: "12px",
    fontSize: "15px",
    lineHeight: 1.4,
    wordBreak: "break-word",
  },
  inputBox: {
    display: "flex",
    padding: "12px",
    borderTop: "1px solid #1e293b",
    gap: "10px",
  },
  textarea: {
    flex: 1,
    resize: "none",
    padding: "10px",
    borderRadius: "8px",
    border: "none",
    outline: "none",
    fontSize: "14px",
    background: "#0f172a",
    color: "#fff",
  },
  btn: {
    padding: "0 18px",
    borderRadius: "8px",
    border: "none",
    background: "#2563eb",
    color: "#fff",
    cursor: "pointer",
  },
};
