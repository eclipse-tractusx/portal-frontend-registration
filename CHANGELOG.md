# Changelog

New features, fixed bugs, known defects and other noteworthy changes to each release of the Catena-X Portal Frontend Registration.

### Unreleased
- Bugfix - Fetch Company details with Legal Entity Name and Registered Name by name only
- Bugfix - Submit Application - Loading element
- Bugfix - Redirect Issue for home page

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
