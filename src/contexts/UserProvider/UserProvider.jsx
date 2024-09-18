import { createContext, useContext, useMemo, useReducer } from "react"
import userReducer, { initUserState, userActions } from "./userReducer"

const UserContext = createContext()

const UserProvider = ({children}) => {
  const [userState, dispatch] = useReducer(userReducer, initUserState);

  const _value = useMemo(() => ({
    data: userState,
    setUser: (user) => {
     dispatch({type: userActions.SET_USER, payload: user}) 
    }
  }), [userState])

  return (
    <UserContext.Provider value={_value}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)

export default UserProvider
