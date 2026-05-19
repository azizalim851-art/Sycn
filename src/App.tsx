/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "./lib/firebase";
import Layout from "./components/Layout";
import Feed from "./components/Feed";
import Chat from "./components/Chat";
import ChatRoom from "./components/ChatRoom";
import LiveStream from "./components/LiveStream";
import Wallet from "./components/Wallet";
import Auth from "./components/Auth";
import Profile from "./components/Profile";

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-white font-mono bg-[radial-gradient(#e5e5e5_1px,transparent_1px)] [background-size:20px_20px]">
        <div className="border-2 border-black p-4 animate-pulse">
          LOADING_HYPE_...
        </div>
      </div>
    );
  }

  if (!user) {
    return <Auth />;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Feed />} />
          <Route path="chat" element={<Chat />} />
          <Route path="chat/:id" element={<ChatRoom />} />
          <Route path="live/:id" element={<LiveStream />} />
          <Route path="wallet" element={<Wallet />} />
          <Route path="profile" element={<Profile />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}

