# Changelog

New features, fixed bugs, known defects and other noteworthy changes to each release of the Catena-X Portal Frontend Registration.

### In Progress


## 0.8.0

### Change
n/a

### Feature
* Registration Step 3 (company role and consent agreement); fetching agreement document from the portal backend and enabling direct documente download.

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
* Registration Closed Function: Company registrations in status "submitted", "approved" or "declined" can not re-visit the registration document. A closed registration information gets displayed.

### Technical Support
* n/a

### Bugfix
* Bugfix - Add company data - payload update to include bpn when posting the company data
* Bugfix - Submit registration - added applicationId into the post job
* Bugfix - Company Roles - company role description moved from hardcoded values to api (db)
