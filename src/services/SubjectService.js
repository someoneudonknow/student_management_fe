import BaseService from "./BaseService"

const BASE_URL = `${import.meta.env.VITE_BASE_URL}/v1/api/subjects`

class SubjectService extends BaseService {
  constructor() {
    super(BASE_URL)
  }

  async getSubjects() {
    return await this.get("/")
  }
}

export default SubjectService;