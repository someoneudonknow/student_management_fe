import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL

const HTTP_TIMEOUT = 10 * 1000;
const HTTP_TIMEOUT_MESSAGE = "Yêu cầu quá hạn"

class BaseService {
  http;
  configHeaders;
  baseUrl;

  constructor(baseUrl, configHeaders) {
    this.baseUrl = baseUrl
    this.configHeaders = configHeaders
    this.http = axios.create({
      url: baseUrl,
      timeout: HTTP_TIMEOUT,
      timeoutErrorMessage: HTTP_TIMEOUT_MESSAGE
    })

    this.http.interceptors.response.use(
      (response) => response,
      (error) => {
        const { response } = error

        if (response) {
          switch (response.status) {
            case 401:
              localStorage.clear()
              window.location.reload()
              break
            case 403:
              break;
            default: return Promise.reject(error)
          }
        }
      }
    )
  }

}

export default BaseService;
