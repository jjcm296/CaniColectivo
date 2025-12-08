# CaniColectivo

## API Routes
BaseURL: `http://localhost:8080/api`

Routes that marked with auth, admin or artist in authorization use Bearer Token.

[Postman API URL](https://www.postman.com/satellite-candidate-66062631/cani/example/28587478-1e81788e-2d47-400f-a9b1-353ffdd822dc/caniapi?action=share&creator=28587478&ctx=documentation)

### Authetication
| Purpose                                | Authorization | Method | Route          | Consumes                    | Returns                                        |
|----------------------------------------|---------------|--------|----------------|-----------------------------|------------------------------------------------|
| Register                               | No auth       | POST   | /auth/register | { email, password }         | { id, username, email }                        |  
| Verify email, the code is already sent | No auth       | POST   | /auth/verify   | { email, verificationCode } | 200 OK Code and success message                |
| Login                                  | No auth       | POST   | /auth/login    | { email, password }         | { token, expiresIn, _same object as /users/me_ } | 

### User
| Purpose                                | Authorization | Method | Route     | Consumes | Returns                                                                                                                                                |
|----------------------------------------|---------------|--------|-----------|----------|--------------------------------------------------------------------------------------------------------------------------------------------------------|
| Get data from authenticated user       | auth          | GET    | /users/me | Nothing  | { id, username, email, roles:{id,name}, artist:  { id, name, location, description, approved, phone, photoUrl, socialMedia: {}, specialities: [{}]}  } |
| Get all users registered in the system | admin         | GET    | /users    | Nothing  | [ ]                                                                                                                                                    |

### Artist
| Purpose                 | Authorization | Method | Route    | Consumes                                                                                   | Returns                                                                                         |
|-------------------------|---------------|--------|----------|--------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------|
| Create artist's profile | auth          | POST   | /artists | { name*, location, description, phone, photoUrl, socialMedia: { }, specialities: [ { } ] } | {id, name, location, description, approved, phone, photoUrl, socialMedia, userId, specialities} | 
* name is required

### Specialities
| Purpose                 | Authorization | Method | Route               | Consumes | Returns       |
|-------------------------|---------------|--------|---------------------|----------|---------------|
| Get all specialities    | No auth       | GET    | /specialities       | Nothing  | Array of json |
| Get specialities' types | No auth       | GET    | /specialities/types | Nothing  | Array         |