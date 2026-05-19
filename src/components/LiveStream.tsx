import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { X, Users, Heart, MessageSquare, Send, Zap } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../lib/utils";

export default function LiveStream() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([
    { id: "1", user: "STREET_KID", text: "INSANE FIT FR" },
    { id: "2", user: "DRIP_HUNTER", text: "PRICE CHECK?" },
    { id: "3", user: "ZENITH", text: "COP COP COP COP" },
  ]);
  const [viewers, setViewers] = useState(1204);
  const [likes, setLikes] = useState(0);

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Mock viewer count increment
    const interval = setInterval(() => setViewers(v => v + Math.floor(Math.random() * 5)), 3000);
    
    // Attempt camera access for "Live" feel
    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
      .then(stream => {
        if (videoRef.current) videoRef.current.srcObject = stream;
      })
      .catch(err => console.log("Camera access denied or unavailable", err));

    return () => clearInterval(interval);
  }, []);

  const addComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;
    setComments([...comments, { id: Date.now().toString(), user: "YOU", text: comment.toUpperCase() }]);
    setComment("");
  };

  return (
    <div className="h-screen w-full bg-zinc-50 relative flex flex-col font-mono text-brand overflow-hidden">
      {/* Video Background / Fallback */}
      <div className="absolute inset-0 z-0 bg-white">
        <video 
          ref={videoRef} 
          autoPlay 
          playsInline 
          muted 
          className="w-full h-full object-cover scale-x-[-1] opacity-40 grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-transparent to-white/90" />
      </div>

      {/* Overlay UI */}
      <div className="relative z-10 flex flex-col h-full p-4">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-brand text-white px-2 py-0.5 border-2 border-brand font-black italic text-xs animate-pulse">LIVE</div>
            <div className="flex items-center gap-1 bg-white/80 px-2 py-0.5 border-2 border-brand text-xs font-black">
              <Users size={12} /> {viewers.toLocaleString()}
            </div>
          </div>
          <button onClick={() => navigate("/")} className="bg-white p-2 border-2 border-brand rounded-none shadow-[2px_2px_0px_0px_#FFDD00]">
            <X size={20} />
          </button>
        </header>

        <div className="mt-4 flex items-center gap-2">
            <div className="w-10 h-10 border-2 border-brand bg-caution p-0.5">
                <img src="https://api.dicebear.com/7.x/pixel-art/svg?seed=hype" className="w-full h-full border border-brand/20" />
            </div>
            <div>
                <p className="text-brand font-black text-sm uppercase tracking-tighter">HYPE_MASTER_STREAM</p>
                <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">AUCTIONING_V2.0</p>
            </div>
        </div>

        <div className="flex-1" />

        {/* Chat Overlay */}
        <div className="h-48 overflow-y-auto space-y-2 mb-4 scroll-smooth no-scrollbar">
          {comments.map((c, i) => (
            <motion.div 
              key={c.id} 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-start gap-2 text-xs bg-white/40 backdrop-blur-sm p-1 border-l-2 border-brand"
            >
              <span className="font-black text-brand italic">{c.user}</span>
              <span className="font-bold text-zinc-600">{c.text}</span>
            </motion.div>
          ))}
        </div>

        {/* Controls */}
        <div className="flex gap-2">
          <form onSubmit={addComment} className="flex-1 flex gap-2">
            <input 
              type="text" 
              placeholder="SAY_SOMETHING..." 
              className="flex-1 bg-white border-2 border-brand px-3 py-2 text-xs focus:outline-none focus:border-caution shadow-[2px_2px_0px_0px_#FFDD00]"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button className="bg-brand text-white border-2 border-brand px-3 active:translate-y-0.5"><Send size={16} /></button>
          </form>
          <button 
            onClick={() => {
                setLikes(l => l + 1);
            }} 
            className="bg-caution text-brand p-3 border-2 border-brand active:scale-95 transition-all shadow-[2px_2px_0px_0px_#0066FF]"
          >
            <Heart size={20} fill={likes > 0 ? "currentColor" : "none"} />
          </button>
        </div>
      </div>

      {/* Floating Hearts Animation Container */}
      <AnimatePresence>
        {Array.from({ length: likes % 10 }).map((_, i) => (
             <motion.div
             key={i}
             initial={{ bottom: 80, right: 60, opacity: 1, scale: 0 }}
             animate={{ bottom: 400, right: 60 + Math.random() * 40, opacity: 0, scale: 1.5 }}
             exit={{ opacity: 0 }}
             className="absolute pointer-events-none z-50 text-brand"
           >
             <Heart size={24} fill="currentColor" />
           </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
