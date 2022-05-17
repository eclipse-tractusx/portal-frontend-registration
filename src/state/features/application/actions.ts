import { createAsyncThunk } from '@reduxjs/toolkit'
import { ApplicationApi } from './api'
import { ApplicationStatus } from './types'

const fetchId = createAsyncThunk(
  'registration/application/fetchId',
  async () => {
    try {
      return await ApplicationApi.getInstance().getId()
    } catch (error: unknown) {
      console.error('api call error:', error)
      throw Error('getApplicationId api call error')
    }
  }
)

const updateStatus = createAsyncThunk(
  'registration/application/updateStatus',
  async (status: ApplicationStatus) => {
    try {
      return await ApplicationApi.getInstance().putStatus(status)
    } catch (error: unknown) {
      console.error('api call error:', error)
      throw Error('getApplicationId api call error')
    }
  }
)

const getCompanyDetailsWithAddress = createAsyncThunk(
  `registration/application/companyDetailsWithAddress`,
  async (applicationId: string) => {
    try {
      return await ApplicationApi.getInstance().getCompanyDetailsWithAddress(applicationId)
    } catch (error: unknown) {
      console.error('api call error:', error)
      throw Error('getApplicationId api call error')
    }
  }
)

const saveCompanyDetailsWithAddress = createAsyncThunk(
  `registration/application/companyDetailsWithAddress/save`,
  async (applicationId: string) => {
    try {
      return await ApplicationApi.getInstance().saveCompanyDetailsWithAddress(applicationId)
    } catch (error: unknown) {
      console.error('api call error:', error)
      throw Error('getApplicationId api call error')
    }
  }
)

export { fetchId, updateStatus, getCompanyDetailsWithAddress, saveCompanyDetailsWithAddress }
