import { useState, useEffect } from "react";
import { Plus, Heart, MessageCircle, Share2, MoreHorizontal } from "lucide-react";
import { motion } from "motion/react";

const STORIES = [
  { id: 1, name: "SUPREME", img: "https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&w=200&h=200&q=80" },
  { id: 2, name: "OFFWHITE", img: "https://images.unsplash.com/photo-1631137281104-01850afc496a?auto=format&fit=crop&w=200&h=200&q=80" },
  { id: 3, name: "BAPE", img: "https://images.unsplash.com/photo-1564224293316-d02d598882f1?auto=format&fit=crop&w=200&h=200&q=80" },
  { id: 4, name: "STUSSY", img: "https://images.unsplash.com/photo-1549174291-76495f2d7216?auto=format&fit=crop&w=200&h=200&q=80" },
  { id: 5, name: "PALACE", img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=200&h=200&q=80" },
];

const POSTS = [
  {
    id: 1,
    user: "HypeBeast_24",
    avatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=1",
    image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=80",
    caption: "New drop alert. Pure concrete vibes.",
    likes: 1204,
    tags: ["#streetwear", "#hype", "#concrete"]
  },
  {
    id: 2,
    user: "Skate_Rogue",
    avatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=2",
    image: "https://images.unsplash.com/photo-1547447134-cd3f5c716030?auto=format&fit=crop&w=800&q=80",
    caption: "Midnight session at the rails. Zero gravity.",
    likes: 850,
    tags: ["#skate", "#night", "#city"]
  }
];

export default function Feed() {
  return (
    <div className="bg-white min-h-full font-sans text-brand">
      <header className="brutalist-header">
        <h1 className="text-3xl font-black tracking-tighter uppercase italic">FEED</h1>
        <div className="flex gap-4">
          <button className="brutalist-button px-2 py-2"><Plus size={20} /></button>
        </div>
      </header>

      {/* Stories Bar */}
      <div className="flex overflow-x-auto p-4 gap-4 border-b-2 border-brand/10 no-scrollbar bg-zinc-50/30">
        {STORIES.map(story => (
          <div key={story.id} className="flex flex-col items-center gap-1 flex-shrink-0">
            <div className="w-16 h-16 border-2 border-brand p-0.5 bg-white shadow-[2px_2px_0px_0px_#FFDD00]">
              <img src={story.img} className="w-full h-full object-cover grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all border border-brand/20" />
            </div>
            <span className="text-[10px] font-mono font-bold uppercase text-brand/60">{story.name}</span>
          </div>
        ))}
      </div>

      {/* Feed Posts */}
      <div className="divide-y-2 divide-brand/10">
        {POSTS.map(post => (
          <motion.article 
            key={post.id} 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="p-6 space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 border-2 border-brand overflow-hidden bg-caution">
                  <img src={post.avatar} className="w-full h-full object-cover" />
                </div>
                <span className="font-mono font-black uppercase text-sm tracking-tight">{post.user}</span>
              </div>
              <MoreHorizontal size={20} className="text-brand/40" />
            </div>

            <div className="brutalist-card overflow-hidden shadow-[6px_6px_0px_0px_#FFDD00]">
              <img src={post.image} className="w-full aspect-square object-cover" />
              <div className="absolute top-4 right-4 bg-brand text-white font-mono text-[10px] px-2 py-1 uppercase font-bold border border-white">
                NEW_DROP
              </div>
            </div>

            <div className="flex items-center gap-6 py-2">
              <button className="hover:text-brand transition-colors flex items-center gap-1.5 font-mono font-bold uppercase text-xs"><Heart size={20} /> {post.likes}</button>
              <button className="hover:text-brand transition-colors flex items-center gap-1.5 font-mono font-bold uppercase text-xs"><MessageCircle size={20} /> 42</button>
              <button className="hover:text-brand transition-colors ml-auto"><Share2 size={20} /></button>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium leading-tight text-zinc-500">
                <span className="font-black underline mr-2 text-brand">{post.user}</span>
                {post.caption}
              </p>
              <div className="flex gap-2">
                {post.tags.map(tag => (
                  <span key={tag} className="text-[10px] font-mono font-bold bg-brand text-white px-2 py-0.5 uppercase">{tag}</span>
                ))}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
