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

`[host]/test`
Test endpoints, sends a simple 200 OK JSON object

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

`[host]/api/test/login`
Simulates a login request; accepts email + PW via JSON.

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
```
curl -X GET http://localhost:3000
```
Will retrieve the raw text output of the server's response

```
curl -X GET http://localhost:3000 -v
```
Will yield equal results, but with verbose output incl. headers & cookies

```
curl -X GET http://localhost:3000/test -v -c cookie.txt
```

Will save the cookie into a file, so it can be re-used in subsequent requests and can be included in the header of the request

```
curl -X GET http://localhost:3000/test -v -b cookie.txt
```

Will include the previously stored cookie header in the request header

### Example
#### Simple GET request
```
curl -X GET http://localhost:3000/test -v
```
```
Note: Unnecessary use of -X or --request, GET is already inferred.
* Host localhost:3000 was resolved.
* IPv6: ::1
* IPv4: 127.0.0.1
*   Trying [::1]:3000...
* Connected to localhost (::1) port 3000
> GET /test HTTP/1.1
> Host: localhost:3000
> User-Agent: curl/8.7.1
> Accept: */*
> 
* Request completely sent off
< HTTP/1.1 200 OK
< X-Powered-By: Express
< Access-Control-Allow-Origin: *
< Content-Type: application/json; charset=utf-8
< Content-Length: 16
< ETag: W/"10-MxB4y4MLcx6QDsp8b8vgp7iFMFo"
< Set-Cookie: connect.sid=s%3A15e0304f-e6f2-4232-a9c9-c6fd6897629f.3O4CGc65UrRWez1%2FG%2BHAGurBCEXEGECkLNKrx8ZyFd8; Path=/; HttpOnly; SameSite=Strict
< Date: Sun, 19 Jul 2026 07:50:23 GMT
< Connection: keep-alive
< Keep-Alive: timeout=5
< 
* Connection #0 to host localhost left intact
{"message":"OK"}
```

#### POST request with JSON data
```
curl -X POST http://localhost:3000/api/test/login -v -H 'Content-Type: application/json' -d '{"email":"ab@c.de", "username":"test", "password":"password"}'
```
```
Note: Unnecessary use of -X or --request, POST is already inferred.
* Host localhost:3000 was resolved.
* IPv6: ::1
* IPv4: 127.0.0.1
*   Trying [::1]:3000...
* Connected to localhost (::1) port 3000
> POST /api/test/login HTTP/1.1
> Host: localhost:3000
> User-Agent: curl/8.7.1
> Accept: */*
> Content-Type: application/json
> Content-Length: 42
> 
* upload completely sent off: 42 bytes
< HTTP/1.1 204 No Content
< X-Powered-By: Express
< Access-Control-Allow-Origin: *
< ETag: W/"a-bAsFyilMr4Ra1hIU5PyoyFRunpI"
< Set-Cookie: connect.sid=s%3Aeb545c6b-4de7-4bde-b4cb-402b8388564e.QT9CG%2FGNILbVU9eXfZDrUnvzLX0j6QvOAt8%2BC7ldtko; Path=/; HttpOnly; SameSite=Strict
< Date: Sun, 19 Jul 2026 08:15:01 GMT
< Connection: keep-alive
< Keep-Alive: timeout=5
< 
* Connection #0 to host localhost left intact
```