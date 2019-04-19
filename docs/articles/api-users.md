---
title: /users/
permalink: api/users
layout: page
category: API
---

## `GET` /users/ ##

List all users

### Security ###
―

### Request ###

##### Query #####
―

##### Header #####
―

##### Body #####
―

### Response ###

#### 200 ####

##### Header #####
―

##### Body #####

``` json
[{
  "id": "5c9b3912f787951b7e8c9d62f",
  "firstName": "Jean",
  "lastName": "Lechat",
  "relatedProjects": [
      "5c9b3912f787951b7e8c9d62f",
      "5c9b3912f787951b7e8c9d62"
   ]
}]
```

#### 400 ####

`Error`

--- 


## `POST` /users/ ##

Add a user, with its relative informations.

### Security ###
―

### Request ###

##### Query #####
―

##### Header #####
``` json
[{}]
```

##### Body #####

``` json
{
  "firstName": "Jean",
  "lastName": "Lechat",
  "email": "lechat@fournisseur.fr",
  "password": "1a5z84e4",
  "relatedProjects": [
      "5c9b3912f787951b7e8c9d62f"
  ]
}
```

### Response ###

#### 200 ####
―

##### Header #####
―

##### Body #####

``` json
{
  "id": "5c9b3912f787951b7e8c9d62",
  "firstName": "Jean",
  "lastName": "Lechat",
  "email": "lechat@fournisseur.fr",
  "relateProjects": [
      "5c9b3912f787951b7e8c9d62f",
      "5c9b3912f787951b7e8c9d62"
  ]
}
```

#### 400 ####

`Error`

--- 


## `GET` /users/{nameId} ##

Get a user with a specific id `{nameId}`.

### Security ###
―

### Request ###

##### Query #####
―

##### Header #####
―

##### Body #####
―

### Response ###

#### 200 ####

##### Header #####
―

##### Body #####

``` json
[{
  "id": "5c9b3912f787951b7e8c9d62f",
  "firstName": "Jean",
  "lastName": "Lechat",
  "relatedProjects": [
      "5c9b3912f787951b7e8c9d62f",
      "5c9b3912f787951b7e8c9d62"
   ]
}]
```

#### 400 ####

`Error`

---

## `PUT` /users/{nameId} ##

Update a user at a specific id `{nameId}`

### Security ###
―

### Request ###

##### Query #####
**removeAction `Boolean`** : if this params is set to true, the project id that will be passed into the body is removed from the

##### Header #####
―

##### Body #####

``` json
{
  "firstName": "Jean",
  "lastName": "Lechat",
  "email": "lechat@fournisseur.fr",
  "relatedProject": "5c9b3912f787951b7e8c9d62f"
}
```

Single values are accepted, and will update the user correctly.

``` json
{
  "firstName": "Otto"
}
```

``` json
{
  "lastName": "Munscher"
}
```

``` json
{
  "password": "diesirae457"
}
```

``` json
{
  "email": "otto@munscher.de"
}
```



``` json
{
  "relatedProject": "5c9b3912f787951b7e8c9d62f"
}
```

projects are added through `relatedProject`, one at a time.

### Response ###

#### 200 ####

##### Header #####
―

##### Body #####

``` json
{
  "id": "5c9b3912f787951b7e8c9d62f",
  "firstName": "Jean",
  "lastName": "Lechat",
  "email": "lechat@fournisseur.fr",
  "relatedProjects: [
      "5c9b3912f787951b7e8c9d62f",
      "5c9b3912f787951b7e8c9d62f"
  ]
}
```

#### 400 ####

`Error`

---

## `DELETE` /users/{nameId} ##

Delete a user at a specific id `{nameId}`

### Security ###
―

### Request ###

##### Query #####
―

##### Header #####
―

##### Body #####
―

### Response ###

#### 200 ####

##### Header #####
―

##### Body #####

``` json
{}
```

#### 400 ####

`Error`

