import moment from "moment"

export const getFileDataURL = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onerror = (error) => {
      reject(error)
    }

    reader.onloadend = () => {
      resolve(reader.result)
    }

    reader.readAsDataURL(file)
  })

export const upperCaseWords = (sentence) => {
  if (!sentence) return ""

  return sentence
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.substring(1))
    .join(" ")
}

export const formatAddressToString = (value) => {
  if (!value) return "Chưa có địa chỉ"
  let addressString = ""

  if (value["number"]) addressString += "số " + value["number"] + ", "
  if (value["street"]) addressString += "đường " + value["street"] + ", "
  if (value["ward"]) addressString += value["ward"] + ", "
  if (value["district"]) addressString += value["district"] + ", "
  if (value["province"]) addressString += value["province"] + "."

  return addressString === "" ? "Chưa có địa chỉ" : addressString
}

export const formatDate = (dateString) => moment(dateString).format("DD/MM/YYYY")

export const mapRange = (from, to) => {
  return new Array(to - from).fill(null).map((_, i) => i + from)
}

export const generateODataQueryString = (options) => {
  const { filters, top, skip, select, orderby } = options

  const formatValue = (value, field) => {
    if (value === null || value === undefined) return 'null'
    
    if (value instanceof Date || (typeof value === 'string' && !isNaN(Date.parse(value)))) {
      return `datetime'${moment(value).format("YYYY-MM-DDTHH:mm:ss")}'`
    }

    if (typeof value === 'string' && /^\d{2}\/\d{2}\/\d{4}$/.test(value)) {
      const [day, month, year] = value.split('/')
      const date = moment(`${year}-${month}-${day}`, 'YYYY-MM-DD')
      if (date.isValid()) {
        return `datetime'${date.format("YYYY-MM-DDTHH:mm:ss")}'`
      }
    }
    
    if (typeof value === 'string') {
      return `'${value}'`
    }
    
    return value.toString()
  }

  const buildFilter = (filter) => {
    if (Array.isArray(filter)) {
      return filter.map(buildFilter).join(" and ")
    } else if (typeof filter === "object" && filter.operator) {
      const { field, operator, value } = filter
      return `${field} ${operator} ${formatValue(value, field)}`
    } else if (typeof filter === "object" && (filter.and || filter.or)) {
      const groupType = filter.and ? "and" : "or"
      const conditions = filter.and || filter.or
      return `(${conditions.map(buildFilter).join(` ${groupType} `)})`
    } else if (typeof filter === "object" && filter.function) {
      const { function: funcName, args } = filter
      return `${funcName}(${args.map(arg => formatValue(arg)).join(', ')})`
    }
    return ""
  }

  let queryParts = []

  if (filters) {
    const filterString = buildFilter(filters)
    if (filterString) queryParts.push(`$filter=${filterString}`)
  }

  if (typeof top === "number") {
    queryParts.push(`$top=${top}`)
  }

  if (typeof skip === "number") {
    queryParts.push(`$skip=${skip}`)
  }

  if (select && select.length > 0) {
    queryParts.push(`$select=${select.join(",")}`)
  }

  if (orderby && Object.keys(orderby).length > 0) {
    const orderClause = Object.entries(orderby)
      .map(([field, direction]) => `${field} ${direction}`)
      .join(",")
    queryParts.push(`$orderby=${orderClause}`)
  }

  return queryParts.join("&")
}

export const getClassRole = (classRole) => {
  const classRoles = {
    student: "Học sinh",
    leader: "Lớp trưởng",
  }

  return classRoles?.[classRole] || "Không xác định"
}

export const scoreValidate = (score) => {
  if (score < 0 || score > 10) return null
  return parseFloat(score.toFixed(2))
}
