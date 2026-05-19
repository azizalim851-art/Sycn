import { useState, useEffect } from "react";
import { Phone, Video, X, Mic, MicOff, VideoOff, PhoneOff } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../lib/utils";

interface CallOverlayProps {
  type: "voice" | "video";
  userName: string;
  onClose: () => void;
}

export default function CallOverlay({ type, userName, onClose }: CallOverlayProps) {
  const [status, setStatus] = useState("CONNECTING...");
  const [muted, setMuted] = useState(false);
  const [videoOff, setVideoOff] = useState(false);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const startTimeout = setTimeout(() => setStatus("CONNECTED"), 2000);
    const interval = setInterval(() => {
      setStatus((prev) => (prev === "CONNECTED" ? prev : prev));
      if (status === "CONNECTED") setTimer((t) => t + 1);
    }, 1000);

    return () => {
      clearTimeout(startTimeout);
      clearInterval(interval);
    };
  }, [status]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-brand flex flex-col items-center justify-center p-6 text-white"
    >
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="w-full h-full bg-[radial-gradient(#ffffff_2px,transparent_2px)] [background-size:32px_32px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center space-y-8 w-full max-w-sm">
        <div className="text-center space-y-2">
          <div className="w-32 h-32 mx-auto border-4 border-white bg-caution p-2 shadow-[8px_8px_0px_0px_rgba(255,255,255,0.3)]">
            <div className="w-full h-full bg-white flex items-center justify-center text-4xl border-2 border-brand text-brand font-black">
              {userName.charAt(0)}
            </div>
          </div>
          <h2 className="text-3xl font-black italic tracking-tighter uppercase mt-4">{userName}</h2>
          <p className="font-mono text-xs font-bold tracking-widest">{status === "CONNECTED" ? formatTime(timer) : status}</p>
        </div>

        {type === "video" && (
          <div className="w-full aspect-video bg-black border-2 border-white relative overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,0.2)]">
            {videoOff ? (
              <div className="flex items-center justify-center h-full font-mono text-xs uppercase">CAMERA_OFF</div>
            ) : (
              <div className="flex items-center justify-center h-full text-zinc-800 font-sans font-black text-6xl opacity-20 select-none">
                VIDEO_FEED
              </div>
            )}
            <div className="absolute bottom-2 right-2 w-24 h-32 bg-zinc-800 border-2 border-white flex items-center justify-center">
               <p className="text-[8px] font-mono">SELF_VIEW</p>
            </div>
          </div>
        )}

        <div className="flex gap-6 pt-12">
          <button 
            onClick={() => setMuted(!muted)}
            className={cn(
              "p-4 border-2 border-white transition-all active:translate-y-1",
              muted ? "bg-white text-brand" : "bg-transparent text-white"
            )}
          >
            {muted ? <MicOff size={24} /> : <Mic size={24} />}
          </button>

          {type === "video" && (
            <button 
              onClick={() => setVideoOff(!videoOff)}
              className={cn(
                "p-4 border-2 border-white transition-all active:translate-y-1",
                videoOff ? "bg-white text-brand" : "bg-transparent text-white"
              )}
            >
              {videoOff ? <VideoOff size={24} /> : <Video size={24} />}
            </button>
          )}

          <button 
            onClick={onClose}
            className="p-4 bg-white text-brand border-2 border-brand shadow-[4px_4px_0px_0px_#FFDD00] active:shadow-none active:translate-y-1 transition-all"
          >
            <PhoneOff size={24} />
          </button>
        </div>
        
        <p className="font-mono text-[10px] opacity-60 uppercase tracking-tighter">ENCRYPTED_SIGNAL_STREAM_v2.4</p>
      </div>
    </motion.div>
  );
}
