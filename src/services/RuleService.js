import BaseService from "./BaseService"

const BASE_URL = `${import.meta.env.VITE_BASE_URL}/v1/api/rules`

class RuleService extends BaseService {
  constructor() {
    super(BASE_URL)
  }

  async getAll(schemaId) {
    return await this.get(`/${schemaId}`)
  }

  async update(id, update) {
    return this.patch(`/${id}`, update)
  }
}

export default RuleService
