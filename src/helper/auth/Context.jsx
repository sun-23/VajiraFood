import { createContext, useEffect, useState } from "react";
import { supabase } from "../supbaseClient";

const initialState = { session: null, user: null };
export const AuthContext = createContext(initialState);

export function AuthProvider({ children }) {
  const [state, setState] = useState(initialState);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setState({ session: session, user: session?.user ?? null });
      console.log("session", session);
      setIsLoading(false);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setState({ session: session, user: session?.user ?? null });
      console.log("session", session);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (event == "PASSWORD_RECOVERY") {
        const newPassword = prompt("What would you like your new password to be?");
        const { data, error } = await supabase.auth
          .updateUser({ password: newPassword })
 
        if (data) alert("Password updated successfully!")
        if (error) alert("There was an error updating your password.")
      }
    })
  }, []);

  return (
    <AuthContext.Provider value={state}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
}
