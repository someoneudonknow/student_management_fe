import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useState } from "react"
import userReducer, { initUserState, userActions } from "./userReducer"
import AuthService from "../../services/AuthService"
import { enqueueSnackbar } from "notistack"
import { useNavigate } from "react-router-dom";
import { ADMIN } from "../../constants/roles.js";

const UserContext = createContext()

const UserProvider = ({ children }) => {
  const [userState, dispatch] = useReducer(userReducer, initUserState);
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const signUp = useCallback(async ({ userName, email, password }) => {
    const authService = new AuthService()
    try {
      setIsLoading(true)
      const res = await authService.signUp({ userName, email, password })
      const data = res.data
      const { message, metadata: { user, tokens } } = data

      dispatch({ type: userActions.SET_USER, payload: user })
      dispatch({ type: userActions.SET_TOKENS, payload: tokens })

      if (user.role === ADMIN) {
        navigate("/admin")
      }

      enqueueSnackbar("Đăng kí thành công", {
        variant: "success",
        SnackbarProps: {
          id: "register-success-snackbar"
        }
      })
    } catch (e) {
      enqueueSnackbar("Đăng kí thất bại", {
        variant: "error",
        SnackbarProps: {
          id: "register-failed-snackbar"
        }
      })
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

      if (user.role === ADMIN) {
        navigate("/admin")
      }

      enqueueSnackbar("Đăng nhập thành công", {
        variant: "success",
        SnackbarProps: {
          id: "login-success-snackbar"
        }
      })
    } catch (e) {
      enqueueSnackbar("Đăng nhập thất bại", {
        variant: "error",
        SnackbarProps: {
          id: "login-failed-snackbar"
        }
      })
    } finally {
      setIsLoading(false)
    }
  }, [])

  const logout = useCallback(async () => {
    const authService = new AuthService()
    try {
      setIsLoading(true)
      await authService.logout()

      navigate("/auth")

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
