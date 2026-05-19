import { useState } from "react";
import { CreditCard, ArrowUpRight, ArrowDownLeft, Plus, History, Settings, ExternalLink, Send, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../lib/utils";

const HISTORY = [
  { id: 1, type: "OUT", amount: 159.00, desc: "OFFWHITE_SOCKS_COL", date: "2024.05.18" },
  { id: 2, type: "IN", amount: 500.00, desc: "RELOAD_CREDIT", date: "2024.05.15" },
  { id: 3, type: "OUT", amount: 42.00, desc: "STICKER_BOMB_V3", date: "2024.05.12" },
  { id: 4, type: "OUT", amount: 89.99, desc: "GIFT_TO_SK8_LORD", date: "2024.05.10" },
];

export default function Wallet() {
  const [isTransferOpen, setIsTransferOpen] = useState(false);
  const [transferAmount, setTransferAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  const handleTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Transferred $${transferAmount} to ${recipient}`);
    setIsTransferOpen(false);
    setTransferAmount("");
    setRecipient("");
  };

  return (
    <div className="min-h-full bg-white font-mono p-4 space-y-6 text-brand">
      <header className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-black tracking-tighter uppercase font-sans text-brand flex items-center gap-2">
          VAULT <span className="text-[10px] bg-caution text-brand px-1 h-fit">v 2.0</span>
        </h1>
        <button className="brutalist-button px-2 py-2"><Settings size={20} /></button>
      </header>

      {/* Balance Card */}
      <div className="brutalist-card bg-brand p-6 text-white space-y-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10"><CreditCard size={120} /></div>
        
        <div>
          <p className="text-[10px] font-bold uppercase opacity-80 mb-1 tracking-widest">TOTAL_VAULT_BALANCE</p>
          <p className="text-5xl font-black tracking-tighter font-sans">$4,208.50</p>
        </div>

        <div className="flex gap-3 relative z-10">
          <button 
            onClick={() => setIsTransferOpen(true)}
            className="flex-1 bg-caution text-brand border-2 border-brand p-3 font-bold text-xs uppercase flex items-center justify-center gap-2 active:translate-y-0.5 shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]"
          >
            <Send size={14} /> TRF_FUNDS
          </button>
          <button className="flex-1 bg-white text-brand border-2 border-brand p-3 font-bold text-xs uppercase flex items-center justify-center gap-2 active:translate-y-0.5">
            <Plus size={14} /> TOP_UP
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="brutalist-card p-4 space-y-1 bg-white border-brand">
          <p className="text-[10px] font-bold text-zinc-400 uppercase">MONTHLY_SPEND</p>
          <p className="text-xl font-bold font-sans tracking-tight text-brand">$842.10</p>
        </div>
        <div className="brutalist-card p-4 space-y-1 bg-caution border-brand">
          <p className="text-[10px] font-bold text-brand uppercase">VAULT_POINTS</p>
          <p className="text-xl font-bold font-sans tracking-tight text-brand">12.4K</p>
        </div>
      </div>

      {/* Transaction History */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between font-black uppercase text-sm border-b-2 border-brand pb-1">
          <div className="flex items-center gap-2 text-brand"><History size={18} /> TXN_LOGS</div>
          <button className="text-[10px] hover:underline flex items-center gap-1 opacity-60">EXPORT_CSV <ExternalLink size={10} /></button>
        </div>

        <div className="space-y-0.5">
          {HISTORY.map(tx => (
            <div key={tx.id} className="flex items-center justify-between py-4 border-b-2 border-dotted border-brand/20">
              <div className="flex flex-col">
                <p className="font-bold text-sm uppercase tracking-tight text-brand">{tx.desc}</p>
                <div className="flex gap-2">
                    <span className="text-[9px] text-zinc-400 font-bold">{tx.date}</span>
                    <span className="text-[9px] text-success font-black tracking-widest">SUCCESS</span>
                </div>
              </div>
              <p className={cn(
                "font-black text-lg",
                tx.type === "IN" ? "text-success" : "text-brand"
              )}>
                {tx.type === "IN" ? "+" : "-"}${tx.amount.toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Transfer Modal */}
      <AnimatePresence>
        {isTransferOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-brand/40 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="brutalist-card w-full max-w-sm p-6 bg-white relative"
            >
              <button 
                onClick={() => setIsTransferOpen(false)}
                className="absolute top-4 right-4 text-brand hover:rotate-90 transition-transform"
              >
                <X size={24} />
              </button>

              <h2 className="text-2xl font-black italic tracking-tighter uppercase text-brand mb-6">INITIATE_TRANSFER</h2>
              
              <form onSubmit={handleTransfer} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-brand">RECIPIENT_ID</label>
                  <input 
                    type="text" 
                    placeholder="@HYPE_USER_..."
                    className="brutalist-input w-full"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-brand">AMOUNT_USD</label>
                  <input 
                    type="number" 
                    placeholder="0.00"
                    className="brutalist-input w-full"
                    value={transferAmount}
                    onChange={(e) => setTransferAmount(e.target.value)}
                    required
                  />
                </div>

                <div className="pt-4">
                  <button type="submit" className="brutalist-button-primary w-full py-4 bg-brand text-white shadow-[4px_4px_0px_0px_#FFDD00]">
                    EXECUTE_TRANSFER
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
