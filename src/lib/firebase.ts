import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// These are injected by the platform during set_up_firebase
const firebaseConfig = {
  apiKey: "AIzaSyDgl3V8h6MQDugJDrt08QL7v0bQK3WcF14",
  authDomain: "tuned-micron-b6tp2.firebaseapp.com",
  projectId: "tuned-micron-b6tp2",
  storageBucket: "tuned-micron-b6tp2.firebasestorage.app",
  messagingSenderId: "755556218850",
  appId: "1:755556218850:web:4896d670734e7d1de1ebbb",
};

// In AI Studio, we can check for existence of config or rely on the injected values.
// But we should use the config if available.
let config = firebaseConfig;
try {
  // If we had a config file, we'd read it here.
  // For now, initialization will use the environment-injected context.
} catch (e) {}

const app = initializeApp(config);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
