# CaniColectivo
This repo is for CANI Colectivo Web page, a non-profit organization dedicated to the dissemination, collaboration and strengthening of artistic talent in southern Veracruz.

## Team members
* [Antonio Gálvez Oliver Bryan](https://github.com/OliverAntonio)
* [Avendaño Rodríguez Joseph Javier](https://github.com/josephaven)
* [Cruz Mendoza Jordan Jair](https://github.com/jjcm296)
* [Hernández Suárez Zuzzet](https://github.com/zuzzet514)
* [Landa Solano Ricardo](https://github.com/RickLanda)


## API Routes
BaseURL: `http://localhost:8080/api`

Routes that marked with auth, admin or artist in authorization use Bearer Token.

[Postman API URL](https://www.postman.com/satellite-candidate-66062631/cani/collection/28587478-70ed0601-87de-4dbe-8630-ade44b96defe/?action=share&creator=28587478)
### Authetication
| Purpose                                | Authorization | Method | Route          | Consumes                    | Returns                                          |
|----------------------------------------|---------------|--------|----------------|-----------------------------|--------------------------------------------------|
| Register                               | No auth       | POST   | /auth/register | { email, password }         | { id, username, email }                          |  
| Verify email, the code is already sent | No auth       | POST   | /auth/verify   | { email, verificationCode } | 200 OK Code and success message                  |
| Login                                  | No auth       | POST   | /auth/login    | { email, password }         | { token, expiresIn, _same object as /users/me_ } | 

### User
| Purpose                                | Authorization | Method | Route     | Consumes | Returns                                                                                                                                                        |
|----------------------------------------|---------------|--------|-----------|----------|----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Get data from authenticated user       | auth          | GET    | /users/me | Nothing  | { id, username, email, roles:{id,name}, artist:  { id, name, location, description, approved, phone, photoUrl, socialMedia: {}, specialities: [{}], userId}  } |
| Get all users registered in the system | admin         | GET    | /users    | Nothing  | [ ]                                                                                                                                                            |

### Artist
| Purpose                        | Authorization | Method | Route                  | Consumes                                                                                    | Returns                                                                                         |
|--------------------------------|---------------|--------|------------------------|---------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------|
| Create artist's profile        | auth          | POST   | /artists               | { name*, location*, description, phone, photoUrl, socialMedia: { }, specialities: [ { } ] } | {id, name, location, description, approved, phone, photoUrl, socialMedia, userId, specialities} | 
| Upload artist photo            | auth          | POST   | /artists/{id}/photo    | `multipart/form-data` with photo `field`                                                    | { photoUrl, artist object }                                                                     |
| Get all (approved) artists     | no auth       | GET    | /artists               | Nothing                                                                                     | Array of artist objects                                                                         |
| Get artist by id               | no auth       | GET    | /artists/{id}          | Nothing                                                                                     | Artist object                                                                                   |
| Get pending unapproved artists | admin         | GET    | /artists/pending       | Nothing                                                                                     | Array of artist objects                                                                         |
| Approve or reject an artist    | admin         | POST   | /artists/{id}/approve  | `{"isApproved":true}` or `{"isApproved":false}`                                             | 200 OK Code and message                                                                         |
| Get pending artists count      | admin         | GET    | /artists/pending/count | Nothing                                                                                     | Integer                                                                                         |
| 

*name and location are required

### Specialities
| Purpose                 | Authorization | Method | Route               | Consumes | Returns       |
|-------------------------|---------------|--------|---------------------|----------|---------------|
| Get all specialities    | No auth       | GET    | /specialities       | Nothing  | Array of json |
| Get specialities' types | No auth       | GET    | /specialities/types | Nothing  | Array         |
