# Changelog

New features, fixed bugs, known defects and other noteworthy changes to each release of the Catena-X Portal Frontend Registration.

### In Progress

* Feature - Registration Validation for country in Step 1
* Feature - Registration Submission should be enabled without BPN


## 0.6.0

### Change
* n/a

### Feature
* Registration Walcome: With the initital login, the registration welcome page is getting displayed with an "how to" for the upcoming registration steps
* Registration Submission: Support of the registration submission incl. new page for successful submission and triggered email to the registrator
* Registration Closed Function: Company registrations in status "submitted", "approved" or "declined" can not re-visit the registration document. A closed registration information gets displayed.

### Technical Support
* n/a

### Bugfix
* Bugfix - Add company data - payload update to include bpn when posting the company data
* Bugfix - Submit registration - added applicationId into the post job
* Bugfix - Company Roles - company role description moved from hardcoded values to api (db)
