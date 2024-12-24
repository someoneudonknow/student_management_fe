import BaseService from "./BaseService"

const BASE_URL = `${import.meta.env.VITE_BASE_URL}/v1/api/classes`

class ClassService extends BaseService {
  constructor() {
    super(BASE_URL)
  }

  async getClasses() {
    return await this.get("/")
  }

  async getClass(id) {
    return await this.get(`/${id}`)
  }

  async create(payload) {
    return await this.post("/", payload)
  }

  async update(id, payload) {
    return await this.patch(`/${id}`, payload)
  }

  async updateClassManager(classId, teacherId, payload) {
    return await this.patch(`/${classId}/teachers/${teacherId}`, payload)
  }

  async remove(id) {
    return await this.delete(`/${id}`)
  }
}

export default ClassService
