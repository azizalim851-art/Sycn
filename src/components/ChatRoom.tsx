import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Send, Sparkles, Smile, Image as ImageIcon, Phone, Video } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../lib/utils";
import CallOverlay from "./CallOverlay";

interface Message {
  id: string;
  sender: "me" | "them" | "ai";
  text: string;
  timestamp: string;
}

export default function ChatRoom() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [callType, setCallType] = useState<"voice" | "video" | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", sender: "them", text: "YOO! HAVE YOU SEEN THE NEW DROP?", timestamp: "10:00" },
    { id: "2", sender: "me", text: "NOT YET, IS IT CONCRETE-CORE?", timestamp: "10:01" },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim()) return;

    const myMsg: Message = { id: Date.now().toString(), sender: "me", text: input, timestamp: "NOW" };
    setMessages(prev => [...prev, myMsg]);
    setInput("");

    // AI Trigger if user mentions AI or specific keyword
    if (input.toLowerCase().includes("@ai") || id === "ai_assistant") {
      getAiResponse(input);
    }
  };

  const getAiResponse = async (userMsg: string) => {
    setIsAiLoading(true);
    try {
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          message: `User is in a streetwear app chat. Style: Hype, Simple Modern, Urban. Colors: Blue, Yellow, White. User said: ${userMsg}`,
          history: messages.map(m => ({ role: m.sender === "me" ? "user" : "model", parts: [{ text: m.text }] }))
        }),
      });
      const data = await response.json();
      const aiMsg: Message = { id: Date.now().toString() + "ai", sender: "ai", text: data.text, timestamp: "AI_TIME" };
      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-bg text-fg font-sans">
      <AnimatePresence>
        {callType && (
          <CallOverlay 
            type={callType} 
            userName={id?.replace("_", " ") || "USER"} 
            onClose={() => setCallType(null)} 
          />
        )}
      </AnimatePresence>

      <header className="brutalist-header">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="hover:text-brand"><ArrowLeft size={24} /></button>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 border-2 border-brand bg-caution flex items-center justify-center text-sm text-black">
              {id === "ai_assistant" ? "🤖" : "🕶️"}
            </div>
            <div>
              <h2 className="font-mono font-black text-xs uppercase leading-none">{id?.replace("_", " ")}</h2>
              <p className="text-[10px] font-mono font-bold text-success uppercase tracking-widest">SYSTEM_LINKED</p>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setCallType("voice")} className="p-2 border-2 border-brand text-brand hover:bg-brand hover:text-white transition-colors active:translate-y-0.5"><Phone size={18} /></button>
          <button onClick={() => setCallType("video")} className="p-2 border-2 border-brand text-brand hover:bg-brand hover:text-white transition-colors active:translate-y-0.5"><Video size={18} /></button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-6 no-scrollbar bg-[radial-gradient(#e5e5e5_1px,transparent_1px)] [background-size:20px_20px]">
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, x: msg.sender === "me" ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={cn(
              "flex flex-col max-w-[85%]",
              msg.sender === "me" ? "ml-auto items-end" : "mr-auto items-start"
            )}
          >
            <div className={cn(
              "p-3 border-2 border-brand font-medium leading-tight",
              msg.sender === "me" 
                ? "bg-brand text-white shadow-[-4px_4px_0px_0px_#FFDD00]" 
                : msg.sender === "ai"
                ? "bg-caution text-brand shadow-[4px_4px_0px_0px_#0066FF] font-mono italic"
                : "bg-white text-black shadow-[4px_4px_0px_0px_#FFDD00]"
            )}>
              {msg.text}
            </div>
            <span className="text-[8px] font-mono font-bold uppercase mt-1 text-zinc-400">{msg.sender} | {msg.timestamp}</span>
          </motion.div>
        ))}
        {isAiLoading && (
          <div className="bg-caution text-brand p-2 border-2 border-brand w-24 text-center font-mono text-[10px] animate-pulse shadow-[4px_4px_0px_0px_#0066FF]">
            AI_THINKING...
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t-2 border-brand bg-white">
        {id !== "ai_assistant" && (
           <button 
           onClick={() => setInput("@ai ")}
           className="mb-2 flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase text-brand hover:scale-105 transition-transform"
         >
           <Sparkles size={14} /> CALL_DAEMON_AI
         </button>
        )}
        <form onSubmit={handleSend} className="flex gap-2">
          <button type="button" className="p-2 border-2 border-brand hover:bg-zinc-100"><ImageIcon size={20} /></button>
          <div className="flex-1 relative">
            <input 
              type="text" 
              placeholder="TYPE_MESS_..."
              className="brutalist-input w-full pr-10"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="button" className="absolute right-2 top-1/2 -translate-y-1/2 text-brand"><Smile size={18} /></button>
          </div>
          <button type="submit" className="brutalist-button px-4 flex items-center justify-center">
            <Send size={20} />
          </button>
        </form>
      </div>
    </div>
  );
}
