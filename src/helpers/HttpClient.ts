import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestHeaders,
  AxiosResponse,
  ResponseType,
} from 'axios'

// Tell to typescript, we can use any type of data as response data
declare module 'axios' {
  // eslint-disable-next-line
  interface AxiosResponse<T = any> extends Promise<T> {}
}

// Abstract of axios instance
// Only handles response interceptor in abstract class
// Request interceptor should handle in inherited class
export abstract class HttpClient {
  protected readonly instance: AxiosInstance

  protected constructor(
    baseURL: string,
    reponseSuccessInterceptor = undefined,
    responseErrorInterceptor = undefined,
    headers: AxiosRequestHeaders = {
      'Content-Type': 'application/json',
    },
    timeout: number = Number.parseInt(
      `${process.env.REACT_APP_REQUEST_TIMEOUT || 30000}`
    ),
    responseType?: ResponseType
  ) {
    this.instance = axios.create({
      baseURL,
      headers,
      timeout,
      responseType,
    })

    // Runs after every response from call
    this._initializeResponseInterceptor(
      reponseSuccessInterceptor,
      responseErrorInterceptor
    )
  }

  // Handles two case in below:
  // _handleResponse : Successful response from call
  // _handleError: Error case of call
  private _initializeResponseInterceptor = (
    responseSuccessInterceptor: () => unknown,
    responseFailureInterceptor: () => unknown
  ) => {
    //create axios instance with interceptors passed in arguments or use default if not passed
    this.instance.interceptors.response.use(
      responseSuccessInterceptor || this._handleResponse,
      responseFailureInterceptor || this._handleError
    )
  }

  // Pass response object to Promise resolve
  private _handleResponse = ({ data }: AxiosResponse) => data

  // Catch error and throw code to .catch block
  protected _handleError = (error: AxiosError) => Promise.reject(error)
}
