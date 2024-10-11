
const debounce = (cb, delay = 0) => {
  let timeOutId = null

  return (...params) => {
    clearTimeout(timeOutId)

    timeOutId = setTimeout(() => {
      cb(...params)
    }, delay)
  }
}

export default debounce
