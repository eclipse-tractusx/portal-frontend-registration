import axios from 'axios'
import { HttpClient } from '../../../helpers/HttpClient'
import { getApiBase } from '../../../services/EnvironmentService'
import RequestService from '../../../services/RequestService'
import { PostDocumentType } from '../../../types/MainTypes'

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

  public getDocuments = (applicationId: string, documentTypeId: string) =>
    this.instance.get<any>(
      `/api/registration/application/${applicationId}/documentType/${documentTypeId}/documents`,
      RequestService.getHeaders()
    )

  public postDocument = async (args: PostDocumentType) => {
    const {
      applicationId,
      documentTypeId,
      file,
      handleUpdateProgress,
      dispatch,
      temporaryId,
    } = args
    const formdata = new FormData()
    formdata.append('document', file)
    try {
      await axios({
        method: 'post',
        url: `${getApiBase()}/api/registration/application/${applicationId}/documentType/${documentTypeId}/documents`,
        data: formdata,
        headers: RequestService.getHeaders().headers,
        onUploadProgress: (progress) =>
          handleUpdateProgress(progress, dispatch, temporaryId),
      })
    } catch (error) {
      throw Error(error.message)
    }
  }
}
