import { HttpClient } from '../../../helpers/HttpClient'
import { getApiBase } from '../../../services/EnvironmentService'
import { InvitedUser, InviteNewUser } from './types'
import RequestService from '../../../services/RequestService'

export class Api extends HttpClient {
  private static classInstance?: Api

  public constructor() {
    super(getApiBase())
  }

  public static getInstance() {
    if (!this.classInstance) {
      this.classInstance = new Api()
    }
    return this.classInstance
  }

  public getRolesComposite = () =>
    this.instance.get<string[]>(
      `/api/registration/rolesComposite`,
      RequestService.getHeaders()
    )

  public getInvitedUsers = (applicationId: string) =>
    this.instance.get<InvitedUser[]>(
      `/api/registration/application/${applicationId}/invitedusers`,
      RequestService.getHeaders()
    )

  public postInviteNewUser = (applicationId: string, user: InviteNewUser) =>
    this.instance.post(
      `/api/registration/application/${applicationId}/inviteNewUser`,
      user,
      RequestService.getHeaders()
    )
}
