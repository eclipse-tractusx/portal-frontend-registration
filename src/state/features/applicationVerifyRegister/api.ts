import { HttpClient } from '../../../helpers/HttpClient'
import { getApiBase } from '../../../services/EnvironmentService'
import { RegistrationDetails } from './types'
import RequestService from '../../../services/RequestService'

export class ApplicationApi extends HttpClient {
  private static classInstance?: ApplicationApi

  public constructor() {
    super(getApiBase())
  }

  public static getInstance() {
    if (!this.classInstance) {
      this.classInstance = new ApplicationApi()
    }

    return this.classInstance
  }

  public getRegistrationData = (applicationId: string) => {
    return this.instance.get<RegistrationDetails>(
      `/api/registration/application/${applicationId}/registrationData`,
      RequestService.getHeaders()
    )
  }

  public submitRegistration = () => {
    return this.instance.post<string>(
      `/api/registration/submitRegistration`,
      {},
      RequestService.getHeaders()
    )
  }

}
