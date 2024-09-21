import BaseService from "./BaseService";

const BASE_URL = import.meta.env.BASE_URL

class AuthService extends BaseService {
  constructor() {
    super(BASE_URL)
  }

  async login(username, password) {
  }
}
