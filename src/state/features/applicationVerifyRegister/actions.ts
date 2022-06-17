import { createAsyncThunk } from '@reduxjs/toolkit'
import { ApplicationApi } from './api'

const fetchRegistrationData = createAsyncThunk(
  'registration/application/registrationData',
  async (applicationId: string) => {
    try {
      return await ApplicationApi.getInstance().getRegistrationData(applicationId)
    } catch (error: unknown) {
      console.error('api call error:', error)
      throw Error('Application ID not existing. Please contact the administrator.')
    }
  }
)

const saveRegistration = createAsyncThunk(
  'registration/application/saveRegistration',
  async () => {
    try {
      return await ApplicationApi.getInstance().submitRegistration()
    } catch (error: unknown) {
      console.error('api call error:', error)
      throw Error('There is some error while saving registration data. Please contact the administrator.')
    }
  }
)

export { fetchRegistrationData, saveRegistration }
