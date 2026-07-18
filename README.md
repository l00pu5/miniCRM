# Introduction
**miniCRM** is a tiny demo project where I'm trying to implement a minimalistic but extensible CRM system.

Goal is to provide the following functionality:
- User Authentication / Login
- User-specific home screen / dashboard
- Ability to create accounts
- Ability to create contacts within accounts (B2B context)
- B2C accounts (contact = account)
- Ability to create cases that are associated to a contact
- Ability to log support interactions (chat, email, phone calls, ...) within a case
- Ability to create a product that the support interaction is revolving around
- Ability to link one or more product(s) to a case

...however, the wish list will grow continuously as the projects progresses.

# API endpoints
- **[host]/** */ -> serves indes.html from the project's root directory
- **[host]/ejs-test** -> serves "test.ejs" from the "views" directory to test whether the EJS view engine works correctly
- [host]/test/login-form
- [host]/test/auth
- [host]/test/session-auth