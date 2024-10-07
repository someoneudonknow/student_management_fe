import axios from "axios";
import Cookies from "js-cookie"
import { ACCESS_TOKEN_KEY, CLIENT_ID_KEY, REFRESH_TOKEN_KEY } from "../constants/keys";

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
      baseURL: baseUrl,
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
              window.location.reload()
              return Promise.reject(error)
            case 403:
              // forbidden

              window.location.reload()
              return Promise.reject(error)
            default: return Promise.reject({
              error: error,
              message: error?.response.data.message || error?.message
            })
          }
        }
      }
    )
  }

  getConfigHeaders() {
    const accessToken = Cookies.get(ACCESS_TOKEN_KEY) || ""
    const refreshToken = Cookies.get(REFRESH_TOKEN_KEY) || ""
    const clientId = Cookies.get(CLIENT_ID_KEY) || ""

    const configs = {
      headers: {
        "Content-Type": "application/json",
        [ACCESS_TOKEN_KEY]: accessToken,
        [REFRESH_TOKEN_KEY]: refreshToken,
        [CLIENT_ID_KEY]: clientId
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
