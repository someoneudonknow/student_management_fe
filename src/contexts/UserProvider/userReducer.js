import Cookies from "js-cookie"
import { ACCESS_TOKEN_KEY, CLIENT_ID_KEY, REFRESH_TOKEN_KEY } from "../../constants/keys"

export const initUserState = {
  user: null,
  tokens: null,
}

export const userActions = {
  SET_USER: "user/set",
  SET_TOKENS: "user/tokens/set",
  RESET: "user/info/reset"
}

const userReducer = (state, action) => {
  switch (action.type) {
    case userActions.SET_USER:
      Cookies.set(CLIENT_ID_KEY, action.payload.id)

      return {
        ...state,
        user: action.payload
      }
    case userActions.SET_TOKENS:
      const { accessToken, refreshToken } = action.payload

      Cookies.set(ACCESS_TOKEN_KEY, accessToken.token, {
        expires: new Date(accessToken.expiresIn)
      })

      Cookies.set(REFRESH_TOKEN_KEY, refreshToken.token, {
        expires: new Date(refreshToken.expiresIn)
      })

      return {
        ...state,
        tokens: action.payload
      }
    case userActions.RESET:
      Cookies.remove(ACCESS_TOKEN_KEY)
      Cookies.remove(REFRESH_TOKEN_KEY)
      Cookies.remove(CLIENT_ID_KEY)

      return {
        user: null,
        tokens: null
      }
    default: return state;
  }
}

export default userReducer;
