
export const initUserState = {
  user: null,
  tokens: null,
}

export const userActions = {
  SET_USER: "user/set"
}

const userReducer = (state, action) => {
  switch (action.type) {
    case userActions.SET_USER:
      return {
        ...state,
        user: action.payload
      }
    default: return state;
  }
}

export default userReducer;
