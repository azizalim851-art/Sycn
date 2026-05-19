import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Plus, Bot } from "lucide-react";
import { cn } from "../lib/utils";

const CHATS = [
  { id: "ai_assistant", name: "HYPE_ALGORITH_AI", lastMsg: "Check out the latest drops in Tokyo.", time: "NOW", avatar: "🤖", unread: 1, isAI: true },
  { id: "user_1", name: "SK8_LORD", lastMsg: "Yo, did you get the raffle?", time: "2m", avatar: "🕶️", unread: 2 },
  { id: "user_2", name: "CONCRETE_QUEEN", lastMsg: "See you at the pop-up.", time: "1h", avatar: "🛹", unread: 0 },
];

export default function Chat() {
  const [search, setSearch] = useState("");

  return (
    <div className="h-full flex flex-col bg-white text-brand">
      <header className="brutalist-header">
        <h1 className="text-3xl font-black tracking-tighter uppercase italic">CHATS</h1>
        <button className="brutalist-button px-2 py-2"><Plus size={20} /></button>
      </header>

      <div className="p-4 border-b-2 border-brand/10 bg-zinc-50/50">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
          <input 
            type="text" 
            placeholder="SEARCH_LOGS..." 
            className="brutalist-input w-full pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto divide-y-2 divide-brand/10">
        {CHATS.map(chat => (
          <Link 
            key={chat.id} 
            to={`/chat/${chat.id}`}
            className="flex items-center gap-4 p-4 hover:bg-zinc-50 transition-colors group relative overflow-hidden"
          >
            <div className={cn(
              "w-12 h-12 border-2 border-brand flex items-center justify-center text-2xl flex-shrink-0 z-10",
              chat.isAI ? "bg-brand text-white" : "bg-caution text-brand"
            )}>
              {chat.avatar}
            </div>
            
            <div className="flex-1 min-w-0 z-10">
              <div className="flex items-center justify-between mb-0.5">
                <span className="font-mono font-black text-sm uppercase truncate tracking-tight">{chat.name}</span>
                <span className="font-mono text-[10px] font-bold text-zinc-400">{chat.time}</span>
              </div>
              <p className="text-xs text-zinc-500 truncate font-medium uppercase tracking-tight">{chat.lastMsg}</p>
            </div>

            {chat.unread > 0 && (
              <div className="absolute right-4 top-1/2 -translate-y-1/2 bg-brand text-white text-[10px] font-mono font-bold px-1.5 py-0.5 border border-brand shadow-[2px_2px_0px_0px_#FFDD00]">
                {chat.unread}
              </div>
            )}
            
            <div className="absolute inset-0 bg-brand/5 -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
          </Link>
        ))}
      </div>

      <div className="p-4">
        <div className="brutalist-card bg-brand p-4 text-white flex items-center justify-between shadow-[4px_4px_0px_0px_#FFDD00]">
          <div className="flex items-center gap-3">
            <Bot size={24} />
            <div>
              <p className="font-mono font-black text-[10px] uppercase leading-none opacity-80">AI Assistant Active</p>
              <p className="text-xs font-black uppercase tracking-tighter text-caution">Street_Gen_AI_V.2</p>
            </div>
          </div>
          <button className="bg-white text-brand font-mono font-bold text-[10px] px-3 py-1 uppercase border-2 border-brand active:translate-y-0.5">Sync</button>
        </div>
      </div>
    </div>
  );
}
