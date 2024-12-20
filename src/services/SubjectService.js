import BaseService from "./BaseService"

const BASE_URL = `${import.meta.env.VITE_BASE_URL}/v1/api/subjects`

class SubjectService extends BaseService {
  constructor() {
    super(BASE_URL)
  }

  async getSubjects() {
    return await this.get("/")
  }

  async create(data) {
    return await this.post("", data)
  }

  async deleteSubject(id) {
    return await this.delete(`/${id}`)
  }

  async update(id, payload) {
    return await this.patch(`/${id}`, payload)
  }
}

export default SubjectService
