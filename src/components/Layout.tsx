import { Outlet, Link, useLocation } from "react-router-dom";
import { Home, MessageCircle, Video, Wallet, User } from "lucide-react";
import { cn } from "../lib/utils";

const NavItem = ({ to, icon: Icon, label }: { to: string, icon: any, label: string }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link 
      to={to} 
      className={cn(
        "flex flex-col items-center justify-center py-2 flex-1 transition-all",
        isActive ? "text-brand scale-110" : "text-fg hover:text-brand/70"
      )}
    >
      <Icon size={24} strokeWidth={isActive ? 3 : 2} />
      <span className="text-[10px] font-mono font-bold mt-1 uppercase">{label}</span>
    </Link>
  );
};

export default function Layout() {
  const location = useLocation();
  const isChatRoom = location.pathname.includes("/chat/") && location.pathname !== "/chat";
  const isLive = location.pathname.includes("/live/");

  return (
    <div className="h-screen flex flex-col bg-bg text-fg overflow-hidden max-w-md mx-auto border-x-2 border-brand shadow-2xl">
      <main className="flex-1 overflow-y-auto pb-20 relative">
        <Outlet />
      </main>

      {/* Hide footer in specific rooms for full immersion */}
      {!isChatRoom && !isLive && (
        <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t-2 border-brand flex items-center justify-around z-50 h-16 shadow-[0px_-4px_10px_rgba(0,102,255,0.1)]">
          <NavItem to="/" icon={Home} label="Feed" />
          <NavItem to="/chat" icon={MessageCircle} label="Chat" />
          <NavItem to="/live/featured" icon={Video} label="Live" />
          <NavItem to="/wallet" icon={Wallet} label="Vault" />
          <NavItem to="/profile" icon={User} label="Me" />
        </nav>
      )}
    </div>
  );
}
