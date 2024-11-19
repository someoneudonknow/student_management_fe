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

  return addressString
}

export const formatDate = (dateString) => moment(dateString).format("DD/MM/YYYY")

export const mapRange = (from, to) => {
  return new Array(to - from).fill(null).map((_, i) => i + from)
}
