import { AxiosRequestHeaders, ResponseType } from 'axios'
import UserService from './UserService'

export const getHeaders = (): { headers: AxiosRequestHeaders } => ({
  headers: {
    authorization: `Bearer ${UserService.getToken()}`,
  },
})

export const getBlobHeaders = (): {
  headers: AxiosRequestHeaders
  responseType: ResponseType
} => ({
  headers: {
    authorization: `Bearer ${UserService.getToken()}`,
  },
  responseType: 'blob',
})

const RequestService = {
  getHeaders,
  getBlobHeaders,
}

export default RequestService
