import { createAsyncThunk } from '@reduxjs/toolkit'
import { API } from './api'

const fetchAgreementData = createAsyncThunk(
  'registration/application/user/fetchAgreementData',
  async () => {
    try {
      return await API.getInstance().companyRoleAgreementData()
    } catch (error: unknown) {
      console.error('api call error:', error)
      throw Error('fetchCompanyRole api call error')
    }
  }
)

const fetchAgreementConsents = createAsyncThunk(
  'registration/application/user/fetchAgreementConsents',
  async (appId: string) => {
    try {
      return await API.getInstance().companyRoleAgreementConsents(appId)
    } catch (error: unknown) {
      console.error('api call error:', error)
      throw Error('fetchCompanyRole api call error')
    }
  }
)

const updateAgreementConsents = createAsyncThunk(
  'registration/application/user/updateAgreementConsents',
  async ({
    applicationId,
    data,
  }: {
    applicationId: string
    data: any
  }) => {
    try {
      return await API.getInstance().putAgreementConsent(applicationId, data)
    } catch (error: unknown) {
      console.error('api call error:', error)
      throw Error('Application ID not existing. Please contact the administrator.')
    }
  }
)

export { fetchAgreementData, fetchAgreementConsents, updateAgreementConsents }
