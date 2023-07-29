# Changelog

New features, fixed bugs, known defects and other noteworthy changes to each release of the Catena-X Portal Frontend Registration.

## 1.5.0-RC2

### Change
* Company Data Step
  * enhanced 'City' and 'Region' input patterns to allow numeric values

## 1.5.0-RC1

### Changes
* Removed country_de property from all api connected business logics and UI field
* Company Data Step
  * enabled change of country identifier for pre-saved company data
  * enhanced 'City' and 'Region' input patterns to allow numeric values on top

### Feature
* System Behavior
  * Company Data Step 1 field "CountryCode" disabled case sensitive behavior
  * Enhanced "Invite" button on optional user invite screen to display load element till backend response is received

### Technical Support
* Sonar Cloud code smell and bug fixes

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
