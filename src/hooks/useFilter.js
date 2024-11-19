import { useCallback, useState } from "react"
import QueryBuilder from "../helpers/QueryBuilder"

const useFilter = () => {
  const [filterString, setFilterString] = useState("")

  const setFilter = useCallback((filterObject) => {
    const page = filterObject?.page || 1
    const limit = filterObject?.limit || 10
    const top = limit
    const skip = (page - 1) * limit
    const qb = new QueryBuilder()

    qb.top(top)
    qb.skip(skip)

    if (filterObject?.filter) {
      qb.filter(filterObject?.filter)
    }

    if (filterObject?.order) {
      qb.order(filterObject?.order)
    }

    setFilterString(qb.build())
  }, [])

  return {
    filterString,
    setFilter,
  }
}

export default useFilter
