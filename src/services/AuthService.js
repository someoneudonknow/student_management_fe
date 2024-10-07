import BaseService from "./BaseService";

const BASE_URL = `${import.meta.env.VITE_BASE_URL}/v1/api/auth`

class AuthService extends BaseService {
  constructor() {
    super(BASE_URL)
  }

  async login({ identifier, password }) {
    return await this.post("/login", { identifier, password })
  }

  async signUp({ userName, email, password }) {
    return await this.post("/signup", { userName, email, password })
  }

  async logout() {
    return await this.post("/logout")
  }

  async forgotPassword({ email }) {

  }

  async resetPassword({ otp, uid, newPassword }) {

  }
}

export default AuthService
