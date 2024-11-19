import { describe, it } from "mocha"
import QueryBuilder from "../../src/helpers/QueryBuilder.js"

describe("QueryBuilder test", function () {
  it("Should create a complete query string", function () {
    const qb = new QueryBuilder()

    qb.top(10).skip(10).filter("abc eq ss").orderBy("id", "desc")

    console.log(qb.build())
  })
})
