import axios from "axios";

const HTTP_TIMEOUT = 10 * 1000;
const HTTP_TIMEOUT_MESSAGE = "Yêu cầu quá hạn"
const ACCESS_TOKEN = "access-token"
const REFRESH_TOKEN = "resfresh-token"
const CLIENT_ID = "client-id"

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
              // unauthorize
              localStorage.clear()
              window.location.reload()
              break
            case 403:
              // forbidden
              break;
            default: return Promise.reject(error)
          }
        }
      }
    )
  }

  getConfigHeaders() {
    const accessToken = localStorage.getItem(ACCESS_TOKEN) || ""
    const refreshToken = localStorage.getItem(REFRESH_TOKEN) || ""
    const clientId = localStorage.getItem(CLIENT_ID) || ""

    const configs = {
      headers: {
        "Content-Type": "application/json",
        [ACCESS_TOKEN]: accessToken,
        [REFRESH_TOKEN]: refreshToken,
        [CLIENT_ID]: clientId
      },
      ...this.configHeaders
    }

    return configs;
  }

  async get(url, configHeaders) {
    return await this.http.get(url, { ...this.getConfigHeaders(), ...configHeaders })
  }

  async post(url, data, configHeaders) {
    return await this.http.post(url, data, { ...this.getConfigHeaders(), ...configHeaders })
  }

  async put(url, data, configHeaders) {
    return await this.http.put(url, data, { ...this.getConfigHeaders(), ...configHeaders })
  }

  async patch(url, data, configHeaders) {
    return await this.http.patch(url, data, { ...this.getConfigHeaders(), ...configHeaders })
  }

  async delete(url, configHeaders) {
    return await this.http.delete(url, { ...this.getConfigHeaders(), ...configHeaders })
  }
}

export default BaseService;
