import BaseService from "./BaseService"

const BASE_URL = `${import.meta.env.VITE_BASE_URL}/v1/api/classes`

class ClassService extends BaseService {
  constructor() {
    super(BASE_URL)
  }

  async getClasses() {
    return await this.get("/")
  }
}

export default ClassService
