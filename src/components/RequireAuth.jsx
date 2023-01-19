import { useLocation, Navigate } from "react-router-dom";
import { useAuth } from "../helper/auth/hook";
import { useEffect } from "react";

export default function RequireAuth({ children }) {
  const { session, user } = useAuth();
  let location = useLocation();

  useEffect(() => {
    console.log("session", session);
    console.log("user", user);
  }, [session, user]);

  if (!session || !user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
