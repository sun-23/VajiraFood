import { useContext } from "react";
import { AuthContext } from "./Context";

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    console.log("useAuth must be used within a AuthProvider");
  return context;
}
