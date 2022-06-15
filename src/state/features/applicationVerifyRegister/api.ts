import { HttpClient } from '../../../helpers/HttpClient'
import UserService from '../../../services/UserService'
import { getApiBase } from '../../../services/EnvironmentService'
import { RegistrationDetails } from './types'

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
      {
        headers: {
          authorization: `Bearer ${UserService.getToken()}`,
        },
      }
    )
  }

}
