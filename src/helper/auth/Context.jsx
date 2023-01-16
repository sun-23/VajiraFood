import { createContext, useEffect, useState, useContext } from 'react'
import { supabase } from '../supbaseClient'

const initialState = { session: null, user: null }
export const AuthContext = createContext(initialState)

export function AuthProvider({ children }) {
  const [state, setState] = useState(initialState)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setState({ session, user: session?.user ?? null })
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setState({ session, user: session?.user ?? null })
    })
  }, [])

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>
}