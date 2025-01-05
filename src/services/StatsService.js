import BaseService from "./BaseService"

const BASE_URL = `${import.meta.env.VITE_BASE_URL}/v1/api/stats`

class StatsService extends BaseService {
  constructor() {
    super(BASE_URL)
  }

  async getAvailableYears() {
    return await this.get("/available-years")
  }

  async getStudentStats(year) {
    return await this.get("/students", { params: { year } })
  }

  async getScoreStats(year) {
    return await this.get("/scores", { params: { year } })
  }

  async getCurrentSemesterStats() {
    return await this.get("/current-semester")
  }

  async getRegressionData(year) {
    return await this.get("/regression", { params: { year } })
  }

  async getSubjectPassRates(year) {
    return await this.get("/subject-pass-rates", { params: { year } })
  }
}

export default StatsService
