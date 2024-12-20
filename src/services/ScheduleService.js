import BaseService from "./BaseService"

const BASE_URL = `${import.meta.env.VITE_BASE_URL}/v1/api/schedules`

class ScheduleService extends BaseService {
  constructor() {
    super(BASE_URL)
  }

  async getSubjects({ subject, day, section_order }) {
    return await this.post("/", { subject, day, section_order })
  }

  async checkSchedule(data) {
    return await this.post("/check", data)
  }

  async getSchedules() {
    return await this.get("/")
  }

  async getTeacherSchedules() {
    return await this.get("/teachers")
  }

  async getSubjectSchedule() {
    return await this.get("/teachers")
  }
}

export default ScheduleService
