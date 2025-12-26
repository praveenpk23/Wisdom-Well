import { useGetUserChatsQuery } from "../Redux/aiChatApiSlice";

export default function ChatSidebar({ activeChatId, onSelectChat }) {
  const { data: chats = [] } = useGetUserChatsQuery();

  return (
    <div className="w-64 bg-base-100 border-r border-base-300 overflow-y-auto">
      <div className="p-4 font-semibold text-lg">Chats</div>

      {chats.map((chat) => (
        <div
          key={chat._id}
          onClick={() => onSelectChat(chat._id)}
          className={`px-4 py-3 cursor-pointer text-sm hover:bg-base-200 ${
            activeChatId === chat._id ? "bg-base-200 font-semibold" : ""
          }`}
        >
          {chat.title}
        </div>
      ))}
    </div>
  );
}
