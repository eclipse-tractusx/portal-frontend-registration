import { CompanyRole, ConsentForCompanyRoles } from '../data/companyDetails'
import { FetchBusinessPartnerDto } from '../data/companyDetailsById'
import UserService from '../helpers/UserService'

const api = process.env.REACT_APP_REGISTRATION_URL
export function getCompanyDetails(
  oneId: string
): Promise<FetchBusinessPartnerDto[]> {
  console.log('API called getCompanyDetails')
  const token = UserService.getToken()
  const u = `${api}/company/${oneId}`
  const myResponseData: FetchBusinessPartnerDto[] = []
  const promise = new Promise<FetchBusinessPartnerDto[]>((resolve, reject) => {
    fetch(u, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((res) =>
        res.text().then((data) => {
          if (res.ok) {
            Object.assign(myResponseData, data ? JSON.parse(data) : {})
            resolve(myResponseData)
          } else {
            reject(res.status)
          }
        })
      )
      .catch((error) => {
        // alert(error);
        console.log(error, error.message, error.status)
        reject(error.status)
      })
  })

  return promise
}
export function submitSendInvites(userInviteList: any): Promise<any> {
  const tenant = UserService.getTenant()
  const token = UserService.getToken()
  const u = `${api}/tenant/${tenant}/users`
  const promise = new Promise<any>((resolve, reject) => {
    fetch(u, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInviteList),
    })
      .then((res) =>
        res.text().then((data) => {
          if (res.ok) {
            resolve('Sent Invite')
          } else {
            reject(res.status)
          }
        })
      )
      .catch((error) => {
        // alert(error);
        console.log(error, error.message, error.status)
        reject(error.status)
      })
  })
  return promise
}
export function submitCustodianWallet(custodianWallet): Promise<any> {
  const token = UserService.getToken()
  const u = `${api}/custodianWallet`
  const promise = new Promise<any>((resolve, reject) => {
    fetch(u, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(custodianWallet),
    })
      .then((res) =>
        res.text().then((data) => {
          if (res.ok) {
            resolve('Data Submitted')
          } else {
            reject(res.status)
          }
        })
      )
      .catch((error) => {
        // alert(error);
        console.log(error, error.message, error.status)
        reject(error.status)
      })
  })
  return promise
}
export function getCompanyRoles(): Promise<CompanyRole[]> {
  const token = UserService.getToken()
  const u = `${api}/companyRoles`
  const companyRolesRes: CompanyRole[] = []
  const promise = new Promise<CompanyRole[]>((resolve, reject) => {
    fetch(u, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((val) =>
        val.json().then((data) => {
          if (val.ok) {
            Object.assign(companyRolesRes, data)
            resolve(companyRolesRes)
          } else {
            reject(val.statusText)
          }
        })
      )
      .catch((error) => {
        alert(error)
        console.log(error, error.message, error.status)
        reject(error.message)
      })
  })

  return promise
}
export function getConsentForCompanyRoles(
  roleId: number
): Promise<ConsentForCompanyRoles[]> {
  const token = UserService.getToken()
  const u = `${api}/consentsForCompanyRole/${roleId}`
  const myConsentResponseData: ConsentForCompanyRoles[] = []
  const promise = new Promise<ConsentForCompanyRoles[]>((resolve, reject) => {
    fetch(u, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((val) =>
        val.json().then((data) => {
          if (val.ok) {
            Object.assign(myConsentResponseData, data)
            resolve(myConsentResponseData)
          } else {
            reject(val.statusText)
          }
        })
      )
      .catch((error) => {
        alert(error)
        console.log(error, error.message, error.status)
        reject(error.message)
      })
  })
  return promise
}
export function getClientRolesComposite(): Promise<string[]> {
  const token = UserService.getToken()
  const u = `${api}/rolesComposite`
  const userRolesRes: string[] = []
  const promise = new Promise<string[]>((resolve, reject) => {
    fetch(u, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((res) =>
        res.text().then((data) => {
          if (res.ok) {
            Object.assign(userRolesRes, data ? JSON.parse(data) : {})
            resolve(userRolesRes)
          } else {
            reject(res.status)
          }
        })
      )
      .catch((error) => {
        // alert(error);
        console.log(error, error.message, error.status)
        reject(error.status)
      })
  })

  return promise
}

export function uploadDocument(file): Promise<any> {
  const token = UserService.getToken()
  const u = `${api}/documents`
  const formdata = new FormData()
  formdata.append('document', file.file)
  return fetch(u, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formdata,
  })
}
