import BaseService from "./BaseService"

const BASE_URL = `${import.meta.env.VITE_BASE_URL}/v1/api/stats`

class StatsService extends BaseService {
  constructor() {
    super(BASE_URL)
  }

  async getStudentStats() {
    return await this.get("/students")
  }

  async getScoreStats() {
    return await this.get("/scores")
  }

  async getCurrentSemesterStats() {
    return await this.get("/current-semester")
  }

  async getRegressionData() {
    return await this.get("/regression")
  }

  async getSubjectPassRates() {
    return await this.get("/subject-pass-rates")
  }
}

export default StatsService
