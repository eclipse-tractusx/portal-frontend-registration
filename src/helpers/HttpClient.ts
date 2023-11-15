/********************************************************************************
 * Copyright (c) 2021, 2023 BMW Group AG
 * Copyright (c) 2021, 2023 Contributors to the Eclipse Foundation
 *
 * See the NOTICE file(s) distributed with this work for additional
 * information regarding copyright ownership.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Apache License, Version 2.0 which is available at
 * https://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 ********************************************************************************/

import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  RawAxiosRequestHeaders,
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
    headers: RawAxiosRequestHeaders = {
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
