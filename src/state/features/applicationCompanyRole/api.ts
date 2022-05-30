import { HttpClient } from '../../../helpers/HttpClient'
import { getApiBase } from '../../../services/EnvironmentService'
import UserService from '../../../helpers/UserService'
//import { InvitedUser, InviteNewUser } from './types'

export class API extends HttpClient {
  private static classInstance?: API

  public constructor() {
    super(getApiBase())
  }

  public static getInstance() {
    if (!this.classInstance) {
      this.classInstance = new API()
    }
    return this.classInstance
  }

  public getCompanyRole = (applicationId: string) =>
    this.instance.get<any>(
      `/api/registration/application/${applicationId}/companyRoleAgreementConsents`,
      {
        headers: {
          authorization: `Bearer ${UserService.getToken()}`,
        },
      }
    )
}