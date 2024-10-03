
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
      return {
        ...state,
        user: action.payload
      }
    case userActions.SET_TOKENS:

      return {
        ...state,
        tokens: action.payload
      }
    case userActions.RESET:
      return {
        user: null,
        tokens: null
      }
    default: return state;
  }
}

export default userReducer;
