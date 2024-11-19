import BaseService from "./BaseService"

const BASE_URL = `${import.meta.env.VITE_BASE_URL}/v1/api/students`

class StudentService extends BaseService {
  constructor() {
    super(BASE_URL)
  }

  async createStudent(payload) {
    return await this.post("", payload)
  }

  async getAllStudents({ limit = 10, page = 1 }) {
    return await this.get("", { params: { page, limit } })
  }

  async batchDelete({ ids }) {
    return await this.post("/batchDelete", {
      ids,
    })
  }

  async deleteStudent({ id }) {
    return await this.delete(`/${id}`)
  }

  async updateStudent({ id, payload }) {
    return await this.patch(`/${id}`, payload)
  }

  async filterStudent(queryString) {
    return await this.get(`/filter?${queryString}`)
  }
}

export default StudentService
