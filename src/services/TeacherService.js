import BaseService from "./BaseService"

const BASE_URL = `${import.meta.env.VITE_BASE_URL}/v1/api/teachers`

class TeacherService extends BaseService {
  constructor() {
    super(BASE_URL)
  }

  async createTeacher(payload) {
    return await this.post("", payload)
  }

  async getAllTeachers({ limit = 10, page = 1 }) {
    return await this.get("", { params: { page, limit } })
  }

  async batchDelete({ ids }) {
    return await this.post("/batchDelete", {
      ids,
    })
  }

  async deleteTeacher({ id }) {
    return await this.delete(`/${id}`)
  }

  async updateTeacher({ id, payload }) {
    return await this.patch(`/${id}`, payload)
  }

  async filterTeacher(queryString) {
    return await this.get(`/filters?${queryString}`)
  }
}

export default TeacherService
