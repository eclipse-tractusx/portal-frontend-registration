import { createAsyncThunk } from '@reduxjs/toolkit'
import { API } from './api'

const fetchCompanyRole = createAsyncThunk(
  'registration/application/user/fetchCompanyRole',
  async (appId: string) => {
    try {
      return await API.getInstance().getCompanyRole(appId)
    } catch (error: unknown) {
      console.error('api call error:', error)
      throw Error('fetchCompanyRole api call error')
    }
  }
)

export { fetchCompanyRole }
