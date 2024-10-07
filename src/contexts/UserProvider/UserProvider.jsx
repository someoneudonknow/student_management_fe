import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useState } from "react"
import userReducer, { initUserState, userActions } from "./userReducer"
import AuthService from "../../services/AuthService"
import { enqueueSnackbar, useSnackbar } from "notistack"
import { useNavigate } from "react-router-dom"

const UserContext = createContext()

const userRoles = {
  ADMIN: "admin"
}

const UserProvider = ({ children }) => {
  const [userState, dispatch] = useReducer(userReducer, initUserState);
  const [isLoading, setIsLoading] = useState(false)
  const { enqueuesnackbar } = useSnackbar()
  const navigate = useNavigate()

  useEffect(() => {
    const { user } = userState
    if (user) {
      switch (user.role) {
        case userRoles.ADMIN:
          navigate("/admin")
          break;
        default: navigate("/auth")
      }
    }
  }, [userState])

  const signUp = useCallback(async ({ userName, email, password }) => {
    const authService = new AuthService()
    try {
      setIsLoading(true)
      const res = await authService.signUp({ userName, email, password })
      const data = res.data
      const { message, metadata: { user, tokens } } = data

      dispatch({ type: userActions.SET_USER, payload: user })
      dispatch({ type: userActions.SET_TOKENS, payload: tokens })

      enqueueSnackbar(message, { variant: "success" })
    } catch (e) {
      enqueueSnackbar(e.message, { variant: "error" })
    } finally {
      setIsLoading(false)
    }
  }, [])

  const login = useCallback(async ({ identifier, password }) => {
    const authService = new AuthService()
    try {
      setIsLoading(true)
      const res = await authService.login({ identifier, password })
      const data = res.data
      const { message, metadata: { user, tokens } } = data

      dispatch({ type: userActions.SET_USER, payload: user })
      dispatch({ type: userActions.SET_TOKENS, payload: tokens })

      enqueueSnackbar(message, { variant: "success" })
    } catch (e) {
      enqueueSnackbar(e.message, { variant: "error" })
    } finally {
      setIsLoading(false)
    }
  }, [])

  const logout = useCallback(async () => {
    const authService = new AuthService()
    try {
      setIsLoading(true)
      await authService.logout()

      dispatch({ type: userActions.RESET })
    } catch (e) {
      enqueueSnackbar(e.message, { variant: "error" })
    } finally {
      setIsLoading(false)
    }
  }, [])

  const _value = useMemo(() => ({
    data: userState,
    isLoading,
    signUp,
    login,
    logout
  }), [userState, signUp, isLoading])

  return (
    <UserContext.Provider value={_value}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)

export default UserProvider
