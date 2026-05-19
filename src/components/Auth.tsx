import { useState } from "react";
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup 
} from "firebase/auth";
import { auth, googleProvider } from "../lib/firebase";
import { LogIn, UserPlus } from "lucide-react";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-bg text-fg p-6 font-sans">
      <div className="w-full max-w-sm space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-6xl font-black tracking-tighter italic uppercase text-brand">
            SYNC.
          </h1>
          <p className="font-mono text-[10px] uppercase font-bold text-zinc-400 tracking-[0.2em]"> System_Access_Point_v2.1 </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-4">
            <input
              type="email"
              placeholder="EMAIL_ADDRESS"
              className="brutalist-input w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="PASSWORD"
              className="brutalist-input w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="text-brand font-mono text-xs font-bold uppercase">{error}</p>}

          <button type="submit" className="brutalist-button-primary w-full py-4 flex items-center justify-center gap-2">
            {isLogin ? <LogIn size={20} /> : <UserPlus size={20} />}
            {isLogin ? "ENTER_SYSTEM" : "REGISTER_USER"}
          </button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center"><span className="w-full border-t-2 border-fg"></span></div>
          <div className="relative flex justify-center text-xs uppercase bg-bg px-2 font-mono font-bold">Or sync with</div>
        </div>

        <button 
          onClick={handleGoogle}
          className="brutalist-button w-full flex items-center justify-center gap-2"
        >
          <img src="https://www.google.com/favicon.ico" className="w-4 h-4 invert" alt="G" />
          GOOGLE_IDENTITY
        </button>

        <p className="text-center font-mono text-xs font-bold uppercase cursor-pointer hover:text-brand transition-colors" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Need access? Get registered" : "Already registered? Sign in"}
        </p>
      </div>
    </div>
  );
}
