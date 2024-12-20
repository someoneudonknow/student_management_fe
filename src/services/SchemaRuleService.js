import BaseService from "./BaseService"

const BASE_URL = `${import.meta.env.VITE_BASE_URL}/v1/api/schema-rules`

class SchemaRuleService extends BaseService {
  constructor() {
    super(BASE_URL)
  }

  async getAll() {
    return await this.get()
  }
}

export default SchemaRuleService
