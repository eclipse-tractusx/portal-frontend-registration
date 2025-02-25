# Changelog

## Unreleased

## 2.2.0-RC1

### Bugfix

- **Form Header**
  - created a new component for form header to avoid duplication of code in each step [#310](https://github.com/eclipse-tractusx/portal-frontend-registration/pull/310)
- **Registration Form**
  - fixed disable confirm button issue for mandatory fields [#304](https://github.com/eclipse-tractusx/portal-frontend-registration/pull/304)
  - fixed email text break word issue [#305](https://github.com/eclipse-tractusx/portal-frontend-registration/pull/305)
  - updated validation of region code for tagus release [#1513](https://github.com/eclipse-tractusx/portal-frontend-registration/pull/357)

## 2.1.0

### Change

- adjusted german and worldwide commercial register number REGEX to allow court names [#211](https://github.com/eclipse-tractusx/portal-frontend-registration/pull/211)
- adjusted legalEntityPattern REGEX to allow all language characters and update ES version [#250](https://github.com/eclipse-tractusx/portal-frontend-registration/pull/250)
- upgraded keycloak-js library to version 25 to align with Keycloak server version [#286](https://github.com/eclipse-tractusx/portal-frontend-registration/pull/286)

### Technical Support

- upgraded app dependencies [#272](https://github.com/eclipse-tractusx/portal-frontend-registration/pull/272)

### Bugfix

- fixed country value not updating if user moves back and forth between steps [#232](https://github.com/eclipse-tractusx/portal-frontend-registration/pull/232)
- removed code that always displays error message on screen [#230](https://github.com/eclipse-tractusx/portal-frontend-registration/pull/230)
- updated the logic for maxFiles count in upload docs step [#234](https://github.com/eclipse-tractusx/portal-frontend-registration/pull/234)
- fixed upload docs and role selection screen - next button required validation if no role/docs is selected [#228](https://github.com/eclipse-tractusx/portal-frontend-registration/pull/228)
- allowed for shorter and longer german commercial register number [#216](https://github.com/eclipse-tractusx/portal-frontend-registration/pull/216)
- removed logic that sets bpn before validation [#253](https://github.com/eclipse-tractusx/portal-frontend-registration/pull/253)
- fixed company data invalidation when receiving multiple identifier [247](https://github.com/eclipse-tractusx/portal-frontend-registration/pull/247)
- fixed clearing of form fields after non-existent bpn entered [#260](https://github.com/eclipse-tractusx/portal-frontend-registration/pull/260)
- fixed clearing of form fields after non-existent bpn entered [#260](https://github.com/eclipse-tractusx/portal-frontend-registration/pull/260)
- updated logic to handle prefilled values if BPN is present [#244](https://github.com/eclipse-tractusx/portal-frontend-registration/pull/244)

## 2.0.1

### Change

- improved white space handling in company data [#210](https://github.com/eclipse-tractusx/portal-frontend-registration/pull/210)
- updated identifier error messages [#210](https://github.com/eclipse-tractusx/portal-frontend-registration/pull/210)

### Technical Support

- bumped braces from 3.0.2 to 3.0.3 [#927](https://github.com/eclipse-tractusx/portal-frontend/pull/927)
- bumped ws from 8.16.0 to 8.18.0 [#928](https://github.com/eclipse-tractusx/portal-frontend/pull/928)
- dev-flow: maintain latest changes in main branch [#198](https://github.com/eclipse-tractusx/portal-frontend-registration/pull/198)
- TRG-7: update licensing and legal docs [#197](https://github.com/eclipse-tractusx/portal-frontend-registration/pull/197)
- add full dockerfile containing yarn step [#187](https://github.com/eclipse-tractusx/portal-frontend-registration/pull/187)
- upgraded GitHub actions [#213](https://github.com/eclipse-tractusx/portal-frontend-registration/pull/213)

### Bugfix

- updated the roles state when user navigates between the steps [#215](https://github.com/eclipse-tractusx/portal-frontend-registration/pull/215)
- pattern validation: prevented wrong white spaces in company data [#196](https://github.com/eclipse-tractusx/portal-frontend-registration/pull/196)
- consent osp: fixed redirect to portal page instead of overlay [#209](https://github.com/eclipse-tractusx/portal-frontend-registration/pull/209)

## 2.0.0

### Change
- Pattern updates
  - Support special characters in the registration form - Name, street, region, city and postal code
  - updated company region field to accept hyphens
 
### Feature
- Registration Step "Select Company Role"
  - added support for optional and inactive agreements based on received backend response ![Tag](https://img.shields.io/static/v1?label=&message=Pre-Release&color=grey&style=flat)
 
### Technical Support
- migrated from Create React App (webpack) to Vite (rollup)
  - switched from deprecated CRA to new framework for build scripts and development server
  - use React 18 instead of 17
  - upgraded dependencies
- set node version explicitly
- introduced codeql scan
- introduced dependabot.yml
- removed veracode workflow
- upgraded gh actions and change to pinned actions full length commit sha
- CONTRIBUTING.md: linked to contribution details
- renamed docker notice file
- updated eclipse dash tool for dependencies check
- reworked year in file header
- upgraded keycloak-js dependency to v23.0.7
- move config values from code to config (clientID, realm name, etc.)

## 1.6.0

### Change
- Changed API calls to use RTK queries for improved performance and code organization
- Removed references to consortia environments
- Updated documentation and help links to reflect the updated directory structure in portal-assets
- Implemented login navigation based on application type and status for a more customized user experience
- Replaced the country input field in step 1 with a country select list; including an auto-complete functionality

### Technical Support
- Upgraded dependencies to address vulnerabilities in axios, follow-redirects, postcss, @adobe/css-tools, and serialize-javascript
- Added a build check at pull request to ensure code quality and prevent issues in the future
- Updated the file header template
- Added additional image tags of type semver to release workflows for better version control and tracking
- Enabled container for readOnlyRootFilesystem with a symlink to tmp for index.html
- Changed portal-cd references to portal due to repository renaming
- Updated README.md
  - mentioned `docs` folder in portal-assets repository
  - referenced docker notice files in notice section instead of duplicating the content

### Bugfix
- Added an asterisk to the identifier type select field to indicate the required field
- Fixed the user logout redirect; ensuring users are properly redirected after logging out
- Fixed error handling configuration for all page components to display backend errors to the user in all cases
- Adjusted the frontend logic for the 'Company Roles' step in the company registration process to properly handle unsuccessful API calls. The failed calls are now saved in the redux store and used as a basis for the next API POST consent call

## 1.5.4

### Change
- Legal information for distributions [TRG 7.05](https://eclipse-tractusx.github.io/docs/release/trg-7/trg-7-05/)
  - added legal info at build

### Bugfix
* updated verify registration help link with valid link

### Technical Support
- added pull request linting

### Known Knowns
- Backend api errors are partially not handled on FE side, user receives on certain system error scenarios no message on the UI (e.g. if the GET /companyRoles has issues to fetch the already selected roles from the backend) - the issue only appears if the FE and BE are not correctly integrated or if the backend has business logic issues/db service issues

## 1.5.3

### Change
n/a

### Feature
n/a

### Technical Support
- Trivy scan: changed to no failure on high findings, as it should only fail if there is an error/misconfiguration

### Bugfix
- Vulnerability from dependency
  - upgrade axios dependency from 0.27.2 to v1.6.1 and implement changes due to major version upgrade
- Sonar - fixed low bugs
- Company Registration - Submit button logic of the registration submission updated to handle "inactive"/"disabled" state in case of missing document upload

### Known Knowns
- Backend api errors are partially not handled on FE side, user receives on certain system error scenarios no message on the UI (e.g. if the GET /companyRoles has issues to fetch the already selected roles from the backend) - the issue only appears if the FE and BE are not correctly integrated or if the backend has business logic issues/db service issues

## 1.5.2

### Change
* updated help links with valid help application hyperlinks

### Feature
n/a

### Technical Support
- upgraded dependencies to latest version

### Bugfix
- Vulnerability from dependency
  - Set resolution for @babel/traverse (CVE-2023-45133), for axios and css-what
- Company Role Select Form Step - updated OSP value to human readable text instead of displaying technical keys

### Known Knowns
- Backend api errors are partially not handled on FE side, user receives on certain system error scenarios no message on the UI (e.g. if the GET /companyRoles has issues to fetch the already selected roles from the backend) - the issue only appears if the FE and BE are not correctly integrated or if the backend has business logic issues/db service issues

## 1.5.1

### Change
* updated translations

### Technical Support
* Build images also for arm64, in addition to amd64
* Security.md updated
* npm-get-version action updated 

## 1.5.0

### Changes
* removed country_de property from all api connected business logics and UI field
* Company Data Step
  * enabled change of country identifier for pre-saved company data
  * enhanced 'City' and 'Region' input patterns to allow numeric values on top
* Company Data Step
  * enhanced 'City' and 'Region' input patterns to allow numeric values
* System Behavior
  * Add Company Data (Step 1) input field "Country Code" case sensitive function disabled
  * Enhanced "Invite" button to display load element till backend response is received

### Feature
n/a

### Technical Support
- changed license notice for images
- changed container registry for Trivy scan to Docker Hub

### Bugfix
- fixed code smells and bugs from Sonarcloud
- upgraded dependencies and set resolution for tough-cookie library to v4.1.3

### Known Knowns
- Company Data (Step 1) input field "street" does not allow special characters such as specific polish letters

## 1.4.0

### Feature
* About page for legal notice
   * About card added
   * About page added and linked in footer component
   * card component integrated in About page
* Third-party-licenses page removed (replaced by About page)

### Technical Support
* About page
   * enabled build and release workflows to provide content

## 1.3.1

### Change
n/a

### Feature
n/a

### Technical Support
* changed release workflow to retrieve tag from github.ref_name (set-output command deprecated)
* added release workflow for release-candidates
* changed container registry to Docker Hub
* added pull request template

### Bugfix
* added support for multiline in personal note field

## 1.3.0

### Change
* Updating style for /nextStep page (beautify UI)
* Company Role Step – document download used api endpoint path updated

### Feature
n/a

### Technical Support
* added temp fix for CVE-2023-0464
* added build workflow for v1.3.0 release candidate phase
* updated actions workflows

### Bugfix
n/a

## 1.2.0

### Change
* Visually highlight mandatory company data input fields
* Update "Submit" registration button to support delays, network latency via loading element

### Feature
n/a

### Technical Support
* Change local port to run behind reverse proxy

### Bugfix
n/a

## 1.1.0

### Change
* Updated registration "Submit" button to load button

### Feature
* Company Data - added region field optionally as well as mandatory for a given number of countries
* Released error page for 4xx and 5xx errors when accessing/loading the registration app

### Technical Support
* Added temp fix for CVE-2023-23916

### Bugfix
* Company Data - display company name as 'Legal Entity Name' and 'Registered Name'
* Company Data - errors displayed for "bpn does not exist" reduced to input field error only, additionally style updated
* Company Data - confirm button disabled till all company data are added

## 1.0.0-RC6

### Change
n/a

### Feature
n/a

### Technical Support
n/a

### Bugfix
* Fix redirect url issue in case of redirection to portal homepage
* Updated regular expression of street name pattern for company data input field
* Fix unique identifier display option for bpdm company data autofill

## 1.0.0-RC5

### Change
n/a

### Feature
* Redirect user to "closed"; "under validation" or portal page based on application status 

### Technical Support
n/a

### Bugfix
* Company Data Unique Identifier field value irritation when entering the unique identifier value

## 1.0.0-RC4

### Change
n/a

### Feature
n/a

### Technical Support
* resolve dependabot finding
* temp fix for cve-2023-0286
* add missing '--no-cache': apk update && apk add

### Bugfix
* Change companyRoleAgreementData API response (new structure of the response body)
* Company Data Unique Identifier
  * Identifier type ui issue when entering the value fixed
  * Identifier number change enabled even after initial save
  * Identifier number pattern error validation updated (fe)

## 1.0.0-RC3

### Change
* add error pop-up for step 3 - select company role and commit to t&c's
* city data input pattern updated

### Feature
n/a

### Technical Support
n/a

### Bugfix
* help page handling
* CVE-2022-46175 - Prototype Pollution in JSON5 via Parse Method - upgraded all dependencies

## 1.0.0-RC2

### Change
n/a

### Feature
* enabled company data input form to support unique identifier handling for companies based on company location country code. ![Tag](https://img.shields.io/static/v1?label=&message=Pre-Release&color=grey&style=flat)

### Technical Support
n/a

### Bugfix
* translation fixes on static text values

## 1.0.0-RC1

### Change
* implemented in the step 1 "company data" error handling for unsuccessful company data save function

### Feature
n/a

### Technical Support
n/a

### Bugfix
n/a

## 0.10.0

### Change
* updated postal code validation for registration step 1 to allow international codes
* update of company role agreement frontend logic to display agreements with and without documents

### Feature
n/a

### Technical Support
n/a

### Bugfix
n/a

## 0.9.0

### Change
* updated document deletion endpoint (from administration service to registration service) and added error/success messages

### Feature
n/a

### Technical Support
n/a

### Bugfix
* Added missing image to the registration finished / successfully submitted page

## 0.8.0

### Change
n/a

### Feature
* Registration Step 3 (company role and consent agreement); fetching agreement document from the portal backend and enabling direct document download.

### Technical Support
n/a

### Bugfix
* Registration submission validations as well as registration request validation enhanced/fixed.

## 0.7.0

### Change
n/a

### Feature
* Company registration submission for companies without BPN got activated.

### Technical Support
n/a

### Bugfix
* Registration Step 1 "Company Data Input Form": Country input field updated to country code incl. input validation

## 0.6.0

### Change
* n/a

### Feature
* Registration Welcome: Introduction of a welcome page including a "how to" for the following registration steps
* Registration Submission: Support of the registration submission incl. new page for successful submission and triggered email to the registrator
* Registration Closed Function: Company registrations in status "submitted", "approved" or "declined" cannot re-visit the registration document. A closed registration information gets displayed.

### Technical Support
* n/a

### Bugfix
* Bugfix - Add company data - payload update to include bpn when posting the company data
* Bugfix - Submit registration - added applicationId into the post job
* Bugfix - Company Roles - company role description moved from hardcoded values to api (db)
