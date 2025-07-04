import { useState, useEffect, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "@/types/user.type";

type SessionStatus = "loading" | "authenticated" | "unauthenticated";

interface Session {
  user: User;
}

interface UseSessionReturn {
  data: Session | null;
  status: SessionStatus;
  update: (data?: any) => Promise<Session | null>;
  clear: () => Promise<void>;
}

const STORAGE_KEY = "user_session";

export function useSession(): UseSessionReturn {
  const [data, setData] = useState<Session | null>(null);
  const [status, setStatus] = useState<SessionStatus>("loading");

  const loadSession = useCallback(async () => {
    try {
      setStatus("loading");
      const stored = await AsyncStorage.getItem(STORAGE_KEY);

      if (stored) {
        const user = JSON.parse(stored);
        setData({ user });
        setStatus("authenticated");
        console.log("Session loaded from storage:", user);
      } else {
        setData(null);
        setStatus("unauthenticated");
        console.log("No session found in storage");
      }
    } catch (error) {
      console.error("Error loading session:", error);
      setData(null);
      setStatus("unauthenticated");
    }
  }, []);

  const update = useCallback(
    async (newData?: any): Promise<Session | null> => {
      try {
        if (newData) {
          await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
          const session = { user: newData };
          setData(session);
          setStatus("authenticated");
          return session;
        } else {
          await loadSession();
          return data;
        }
      } catch (error) {
        console.error("Error updating session:", error);
        return null;
      }
    },
    [data, loadSession]
  );

  const clear = useCallback(async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      setData(null);
      setStatus("unauthenticated");
      console.log("Session cleared");
    } catch (error) {
      console.error("Error clearing session:", error);
    }
  }, []);

  useEffect(() => {
    loadSession();
  }, [loadSession]);

  return {
    data,
    status,
    update,
    clear,
  };
}

export type { SessionStatus };
