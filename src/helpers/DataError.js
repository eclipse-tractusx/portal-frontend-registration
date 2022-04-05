export class DataError extends Error {
  constructor(code) {
    super()
    this.code = code
  }
}

export const DataErrorCodes = [400, 401, 403, 404, 405, 409, 415, 500]
