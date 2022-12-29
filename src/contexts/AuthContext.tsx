import { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged, User, UserCredential } from "firebase/auth";
import {
  auth,
  logIn,
  register,
  logOut,
  logInWithGoogle,
} from "../features/auth";

type ValueType = {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  user: User | null;
  logIn: (user: { email: string; password: string }) => Promise<UserCredential>;
  register: (user: {
    email: string;
    password: string;
  }) => Promise<UserCredential>;
  logOut: () => Promise<void>;
  logInWithGoogle: () => Promise<UserCredential>;
  accessToken: string;
  setAccessToken: React.Dispatch<React.SetStateAction<string>>;
};

const AuthContext = createContext({} as ValueType);

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("access-token") || ""
  );

  const value: ValueType = {
    user,
    loading,
    setLoading,
    logIn,
    logOut,
    logInWithGoogle,
    register,
    accessToken,
    setAccessToken,
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) setUser(currentUser);
      else setUser(null);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);
