import { getApiBase } from '../../../helpers/EnvironmentService'
import { HttpClient } from '../../../helpers/HttpClient'
import UserService from '../../../helpers/UserService'
import { ApplicationStatus } from './types'

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
    return this.instance.get<string>(
      `/api/registration/application/${applicationId}/companyDetailsWithAddress`,
      {
        headers: {
          authorization: `Bearer ${UserService.getToken()}`,
        },
      }
    )
  }

  public saveCompanyDetailsWithAddress = (applicationId: string, companyData: object) => {
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
