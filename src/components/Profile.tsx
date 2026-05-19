import { useState } from "react";
import { auth } from "../lib/firebase";
import { signOut } from "firebase/auth";
import { LogOut, MapPin, Grid, Heart, Bookmark, Edit2 } from "lucide-react";
import { cn } from "../lib/utils";

export default function Profile() {
  const [tab, setTab] = useState("POSTS");
  const user = auth.currentUser;

  return (
    <div className="min-h-full bg-white font-sans text-brand">
      <header className="brutalist-header">
        <h1 className="text-3xl font-black tracking-tighter uppercase">ME</h1>
        <button onClick={() => signOut(auth)} className="brutalist-button px-2 py-2 text-white"><LogOut size={20} /></button>
      </header>

      <div className="p-6 space-y-6">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="w-24 h-24 border-2 border-brand bg-caution p-1 shadow-[6px_6px_0px_0px_rgba(0,102,255,0.2)] relative">
            <img 
              src={user?.photoURL || `https://api.dicebear.com/7.x/pixel-art/svg?seed=${user?.uid}`} 
              className="w-full h-full object-cover border-2 border-brand bg-white" 
              alt="Avatar"
            />
            <button className="absolute -bottom-2 -right-2 bg-brand text-white border-2 border-white p-1.5 hover:bg-caution hover:text-brand transition-colors">
              <Edit2 size={14} />
            </button>
          </div>

          <div className="space-y-1">
            <h2 className="text-2xl font-black tracking-tighter uppercase underline decoration-2 decoration-caution">{user?.displayName || "HYPE_USER_99"}</h2>
            <p className="font-mono text-[10px] font-bold text-zinc-400 flex items-center justify-center gap-1">
              <MapPin size={10} /> JAKARTA_STATION_BLUE_ZONE
            </p>
          </div>

          <div className="flex gap-4 border-2 border-brand w-full py-3 font-mono font-black text-[10px] uppercase bg-zinc-50">
            <div className="flex-1"><p className="text-lg text-brand">124</p><p className="text-zinc-400">Drops</p></div>
            <div className="flex-1 border-x-2 border-brand"><p className="text-lg text-brand">2.5K</p><p className="text-zinc-400">Crew</p></div>
            <div className="flex-1"><p className="text-lg text-brand">892</p><p className="text-zinc-400">Hype</p></div>
          </div>
        </div>

        <div className="flex gap-2 font-mono font-bold text-[10px]">
          {["POSTS", "LIKED", "SAVED"].map(t => (
            <button 
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                "flex-1 py-3 border-2 border-brand transition-all flex items-center justify-center gap-2",
                tab === t ? "bg-brand text-white" : "bg-white text-brand shadow-[4px_4px_0px_0px_#FFDD00]"
              )}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-2">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="aspect-square border-2 border-brand bg-zinc-50 overflow-hidden relative group">
                <img src={`https://picsum.photos/300/300?random=${i + 10}`} className="w-full h-full object-cover transition-all grayscale group-hover:grayscale-0" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
