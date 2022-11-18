# Changelog

New features, fixed bugs, known defects and other noteworthy changes to each release of the Catena-X Portal Frontend Registration.

## 0.5.4.1

### Change
* n/a

### Feature
* Registration Form implemented including
  * Add company data
  * Invite additional registration support users
  * Select company role inside the catena-x network
  * Upload documents
  * Verif & Submit data for CX Operator validation and approval

### Technical Support
* Multi Language support of registration messages via locales files

### Bugfix
* n/a

### Known Defects
Please note, the registration release tag 0.5.4.x has following known defects. A fix of the defects is possible by following the description added below

  * #1 Incorrect validation pattern in step 1 of the registration for field "country"
    <br>Solution: 
     * Update country pattern from ```{3,20}``` to ```{2,3}``` (file: /utils)
  * #2 Missing safe bpn logic for company data
    <br>Solution: 
     * add ```companyData.bpn = bpn``` inside the 'const nextClick = ()' logic (file: /cax-companyData.tsx)
  * #3 Application ID is not getting submitted for application submission
    <br> Solution: 
     * update dispatch inside the 'const nextClick = ()' logic to ```dispatch(saveRegistration(applicationId))``` (file: /verifyRegistration.tsx)
     * replace ```async ()``` with ```async (applicationId: string)``` (file: /applicationVerifyRegister/actions.ts)
     * replace ```return await ApplicationApi.getInstance().submitRegistration()``` with ```return await ApplicationApi.getInstance().submitRegistration(applicationId)``` (file: /applicationVerifyRegister/actions.ts)
     * replace ```public submitRegistration = () => {``` with ```public submitRegistration = (applicationId: string) => {``` (file: /applicationVerifyRegister/api.ts)
     * update calling api endpoint to ```/api/registration/submitRegistration``` (file: /applicationVerifyRegister/api.ts)
   
