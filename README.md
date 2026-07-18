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

## Why?
This project is existing for the sole purpose of learning, exploring approaches, implementing functionality, stumbling over hurdles along the way & overcoming these hurdles, gaining experience along the way.

Hence, the intention was to implement something ambitious that grows together with my knowledge. This is going to be a long, bumpy and - at times - frustrating journey, but hopefully still a rewarding one in the end.

# API endpoints
`[host]/` 
Serves index.html from the project's root directory

`[host]/ejs-test` 
Serves "test.ejs" from the "views" directory to test whether the EJS view engine works correctly

`[host]/test/login-form` 
Serves the EJS login form that allows triggering multiple actions & checks from the frontend perspective

`[host]/test/auth` 
Tests authentication middleware; will render "authSuccess" view if a valid token has been provided with the request

`[host]/test/session-auth`
Tests session authentication middleware; will render "authSuccess" view if a valid session config is present

`[host]/api/test/get-token`
Returns a dummy token with the "AUTH_TEST" permission declared on the user object in the permissions list

`[host]/api/test/get-token2`
Returns a dummy token without any permissions defined on the user object (i.e. empty permissions list)

`[host]/api/test/refresh-token`
Refresh endpoint for gathering a new access token via the refresh token; returns a new valid access token with the "AUTH_TEST" permission declared in the user's permission list

`[host]/api/test/session-data`
Returns the current user's session data for debugging purposes (as JSON)

`[host]/api/test/register`
Registers a user as per the data defined on the login form; validates the form data first and adds a user object with the given parameters to the user DB once validation has been successful

`[host]/api/test/logout`
Logout endpoint; will log out the user, invalidate the tokens and revoke the session data by destroying it

`[host]/api/test/add-test-user`
Adds a static, pre-defined dummy user to the user DB that can be used for testing purposes

`[host]/api/test/auth-verification`
Test route to test the authentication middleware; will pass if a valid token is presented; does not require permissions to be defined in the token

`[host]/api/test/auth-verification2`
Test route to test the authentication & authorization middleware; will pass if a valid token is presented & the "AUTH_TEST" permission is present in the user's permission list, otherwise the auth attempt will fail

`[host]/api/test/users`
Test endpoint; will return the entire user DB for debugging purposes

# API probing via cURL
## Retrieving endpoint output (GET)