import { HttpClient } from '../../../helpers/HttpClient'
import { getApiBase } from '../../../services/EnvironmentService'
import RequestService from '../../../services/RequestService'
import { agreementData } from './types'

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

  public companyRoleAgreementData = () =>
    this.instance.get<any>(
      `/api/registration/companyRoleAgreementData`,
      RequestService.getHeaders()
    )

  public companyRoleAgreementConsents = (applicationId: string) =>
    this.instance.get<any>(
      `/api/registration/application/${applicationId}/companyRoleAgreementConsents`,
      RequestService.getHeaders()
    )

  public putAgreementConsent = (applicationId: string, data: agreementData) =>
    this.instance.post<any>(
      `/api/registration/application/${applicationId}/companyRoleAgreementConsents`,
      data,
      RequestService.getHeaders()
    )
}
