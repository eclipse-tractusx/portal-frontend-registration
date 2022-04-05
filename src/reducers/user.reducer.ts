import produce from 'immer'
import { handleActions } from 'redux-actions'
import userActions, {
  addToInviteListAction,
  addCurrentStepAction,
  removeFromInviteListAction,
  addCompanyDataAction,
  addrolesCompositeAction,
  addFileNamesAction,
} from '../actions/user.action'
import { CompanyDetailsData } from '../data/companyDetails'
import { IUserData } from '../types/user/user.types'

// empty userInvite list
export const initialState = {
  userInviteList: [],
  currentStep: 1,
  companyData: new CompanyDetailsData(),
  roleComposite: [],
  fileNames: [],
}

export default handleActions<IUserData, any>(
  {
    [userActions.ADD_TO_INVITE_LIST]: produce(
      (state: IUserData, action: addToInviteListAction) => {
        return {
          ...state,
          userInviteList: [...state.userInviteList, action.payload],
        }
        // state.userInviteList.push(action.payload);
      }
    ),

    [userActions.REMOVE_FROM_INVITE_LIST]: produce(
      (state: IUserData, action: removeFromInviteListAction) => {
        // console.log('asda:',action.payload);
        return {
          ...state,
          userInviteList: [
            ...state.userInviteList.filter(
              (userItem) => userItem.uiId !== action.payload
            ),
          ],
        }
        // state.userInviteList = state.userInviteList.filter(userItem => userItem.uiId !== action.payload);
      }
    ),

    [userActions.ADD_CURRENT_STEP]: produce(
      (state: IUserData, action: addCurrentStepAction) => {
        return {
          ...state,
          currentStep: action.payload,
        }
        // state.currentStep = action.payload;
      }
    ),

    [userActions.ADD_COMPANY_DATA]: produce(
      (state: IUserData, action: addCompanyDataAction) => {
        return {
          ...state,
          companyData: action.payload,
        }
        // state.companyData = action.payload;
      }
    ),

    [userActions.ADD_ROLES_COMPOSITE]: produce(
      (state: IUserData, action: addrolesCompositeAction) => {
        return {
          ...state,
          roleComposite: action.payload,
        }
        // state.roleComposite = action.payload;
      }
    ),

    [userActions.ADD_FILE_NAMES]: produce(
      (state: IUserData, action: addFileNamesAction) => {
        return {
          ...state,
          fileNames: action.payload,
        }
      }
    ),
  },
  initialState
)
