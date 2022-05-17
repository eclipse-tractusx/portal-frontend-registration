export class CompanyRole {
  public id: number
  public title: string
}

export class UserRole {
  public role: string
}

export class ConsentForCompanyRoles {
  public role_id: number
  public role_title: string
  public consent_id: number
  public consent_title: string
  public link: string
}
export abstract class CompanyTechnicalKey {
  public static International = 'INTERNATIONAL'
}

export class User {
  email: string
  role: string
  message: string
}

/*
export class CompanyDetailsData {
  bpn: string
  legalEntity: string
  registrationName: string
  address: string
  postalCode: string
  city: string
  country: string
}
*/