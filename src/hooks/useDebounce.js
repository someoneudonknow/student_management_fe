import { useCallback } from "react"
import debounce from "../helpers/debounce.js"

const useDebounce = (cb, delay) => {
  return useCallback(debounce(cb, delay), [delay, cb])
}

export default useDebounce
