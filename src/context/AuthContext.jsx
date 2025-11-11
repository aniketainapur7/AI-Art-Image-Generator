import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { getSession, isAuthenticated, signIn, signOut, signUp, confirmSignUp } from "../lib/cognito";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [authLoading, setAuthLoading] = useState(true);
  const [authed, setAuthed] = useState(false);
  const [idToken, setIdToken] = useState(null);
  const [userEmail, setUserEmail] = useState(null);

  const refresh = useCallback(async () => {
    try {
      const session = await getSession();
      if (session && session.isValid()) {
        setAuthed(true);
        setIdToken(session.getIdToken().getJwtToken());
        const payload = session.getIdToken().decodePayload?.() || {};
        setUserEmail(payload.email || payload["cognito:username"] || null);
      } else {
        setAuthed(false);
        setIdToken(null);
        setUserEmail(null);
      }
    } catch {
      setAuthed(false);
      setIdToken(null);
      setUserEmail(null);
    } finally {
      setAuthLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  // Exposed actions
  const actions = {
    signUp: (payload) => signUp(payload),
    confirmSignUp: (payload) => confirmSignUp(payload),
    signIn: async (payload) => {
      const res = await signIn(payload);
      await refresh();
      return res;
    },
    signOut: async () => {
      await signOut();
      await refresh();
    },
  };

  return (
    <AuthContext.Provider value={{ authLoading, authed, idToken, userEmail, ...actions }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
