# Assignment Tracker API

## Functionality
This API comes with the following endpoints. These endpoints are based off of the primary requirements of the final project.

### Authentication

```
POST /api/signup
```
Signup to create a new user account.

```
POST /api/login
```

Login to create an existing account with email address and password.

### Users

```
GET /api/users
```
List of all students.

### Assignments

```
GET /api/users/:userId/assignments
```
List of user's assignments.

```
POST /api/users/:userId/assignments
```
Create a new assignment.

```
PUT /api/users/:userId/assignments/assignmentId
```
Edit an existing assignment.

### Admin

```
GET /api/admin/assignments/ungraded
```
List of ungraded assignments.

```
GET /api/admin/assignments/graded
```
List of graded assignments.