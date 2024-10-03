import { createContext, useCallback, useContext, useMemo, useReducer, useState } from "react"
import userReducer, { initUserState, userActions } from "./userReducer"
import AuthService from "../../services/AuthService"
import { enqueueSnackbar, useSnackbar } from "notistack"

const UserContext = createContext()

const authService = new AuthService()

const UserProvider = ({ children }) => {
  const [userState, dispatch] = useReducer(userReducer, initUserState);
  const [isLoading, setIsLoading] = useState(false)
  const { enqueuesnackbar } = useSnackbar()

  const signUp = useCallback(async ({ userName, email, password }) => {
    try {
      setIsLoading(true)
      const res = await authService.signUp({ userName, email, password })
      const data = res.data
      const { message, metadata: { user, tokens } } = data

      dispatch({ type: userActions.SET_USER, payload: user })

      enqueueSnackbar(message, { variant: "success" })
    } catch (e) {
      const message = e?.response.data.message || e?.message;
      enqueueSnackbar(message, { variant: "error" })
    } finally {
      setIsLoading(false)
    }
  }, [])

  const _value = useMemo(() => ({
    data: userState,
    isLoading,
    signUp
  }), [userState, signUp, isLoading])

  return (
    <UserContext.Provider value={_value}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)

export default UserProvider
