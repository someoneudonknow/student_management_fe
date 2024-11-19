class QueryBuilder {
  queryObject = {}

  top(top) {
    this.queryObject[`$top`] = top
    return this
  }

  filter(filter) {
    this.queryObject[`$filter`] = filter

    return this
  }

  skip(skip) {
    this.queryObject[`$skip`] = skip
    return this
  }

  order(order) {
    this.queryObject[`$order`] = order
    return this
  }

  build() {
    return Object.keys(this.queryObject).reduce((acc, key, i) => {
      return (acc += `${i === 0 ? "" : "&"}${key}=${this.queryObject[key]}`)
    }, "")
  }
}

export default QueryBuilder
