import BaseService from "./BaseService"

const BASE_URL = `${import.meta.env.VITE_BASE_URL}/v1/api/scores`

class ScoreService extends BaseService {
  constructor() {
    super(BASE_URL)
  }

  async getScoresOfClass(classId, subjectId, semester) {
    return await this.get(`/classes/${classId}?subject=${subjectId}&semester=${semester}`)
  }

  async updateScore(studentId, subjectId, semester, payload) {
    return await this.patch("/", { studentId, subjectId, semester, payload })
  }

  async updateScoreOfClass(classId, subjectId, semester, payloads) {
    return await this.patch("/classes", { classId, subjectId, semester, payloads })
  }
}

export default ScoreService
