# CaniColectivo

## API Routes
BaseURL: `http://localhost:8080/api`

Routes that marked with auth, admin or artist in authorization use Bearer Token.

### Authetication
| Purpose                                | Authorization | Method | Route          | Consumes                    | Returns                         |
|----------------------------------------|---------------|--------|----------------|-----------------------------|---------------------------------|
| Register                               | No auth       | POST   | /auth/register | { email, password }         | { id, username, email }         |  
| Verify email, the code is already sent | No auth       | POST   | /auth/verify   | { email, verificationCode } | 200 OK Code and success message |
| Login                                  | No auth       | POST   | /auth/login    | { email, password }         | { token, expiresIn }            | 

### User
| Purpose                                | Authorization | Method | Route     | Consumes | Returns |
|----------------------------------------|---------------|--------|-----------|----------|---------|
| Get data from authenticated user       | auth          | GET    | /users/me | Nothing  |         |
| Get all users registered in the system | admin         | GET    | /users    | Nothing  | [ ]     |

### Artist
| Purpose                 | Authorization | Method | Route    | Consumes                                                                                   | Returns                                                                                         |
|-------------------------|---------------|--------|----------|--------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------|
| Create artist's profile | auth          | POST   | /artists | { name*, location, description, phone, photoUrl, socialMedia: { }, specialities: [ { } ] } | {id, name, location, description, approved, phone, photoUrl, socialMedia, userId, specialities} | 
* name is required