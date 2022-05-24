import { HttpClient } from '../../../helpers/HttpClient'
import UserService from '../../../services/UserService'
import { getApiBase } from '../../../services/EnvironmentService'
import { ApplicationStatus, CompanyDetails, ApplicationInvitedUsers } from './types'

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

  public getId = () => {
    return this.instance.get<ApplicationStatus[]>(
      `/api/registration/applications`,
      {
        headers: {
          authorization: `Bearer ${UserService.getToken()}`,
        },
      }
    )
  }

  public putStatus = (status: ApplicationStatus) => {
    return this.instance.put<string>(
      `/api/registration/application/${status.id}/status?status=${status.status}`,
      {},
      {
        headers: {
          authorization: `Bearer ${UserService.getToken()}`,
        },
      }
    )
  }

  public getCompanyDetailsWithAddress = (applicationId: string) => {
    return this.instance.get<CompanyDetails>(
      `/api/registration/application/${applicationId}/companyDetailsWithAddress`,
      {
        headers: {
          authorization: `Bearer ${UserService.getToken()}`,
        },
      }
    )
  }

  public saveCompanyDetailsWithAddress = (applicationId: string, companyData: CompanyDetails) => {
    return this.instance.post<string>(
      `/api/registration/application/${applicationId}/companyDetailsWithAddress`,
      companyData,
      {
        headers: {
          authorization: `Bearer ${UserService.getToken()}`,
        },
      }
    )
  }

}
