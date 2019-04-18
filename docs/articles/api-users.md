---
title: /users/
permalink: api/users
layout: page
category: API
---

## `GET` /users/ ##

List all users

### Security ###

### Request ###

##### Query #####

##### Header #####

``` json
[{}]
```

##### Body #####

``` json
[{}]
```

### Response ###

#### 200 ####

##### Header #####

##### Body #####

``` json
[{
  "id": "0e8dd830-ad98-11e6-bf2e-47644ada7c0f",
  "firstName": "Jean",
  "lastName": "Lechat",
  "projects": [
      "0e8cedd0-ad98-11e6-bf2e-47644ada7c0f",
      "47644ada-7c0f-0e8c-edd0-ad9811e6bf2e"
      ]
}]
```

#### 400 ####

`Error`

--- 


## `POST` /users/ ##

Post a user

### Security ###

### Request ###

##### Query #####

##### Header #####

##### Body #####

``` json
{
  "firstName": "Jean",
  "lastName": "Lechat",
  "email": "lechat@fournisseur.fr",
  "projects": [
      "0e8cedd0-ad98-11e6-bf2e-47644ada7c0f",
      "47644ada-7c0f-0e8c-edd0-ad9811e6bf2e"
      ]
}
```

### Response ###

#### 200 ####

##### Header #####

##### Body #####

``` json
{
  "id": "0e8dd830-ad98-11e6-bf2e-47644ada7c0f",
  "firstName": "Jean",
  "lastName": "Lechat",
  "email": "lechat@fournisseur.fr",
  "projects": [
      "0e8cedd0-ad98-11e6-bf2e-47644ada7c0f",
      "47644ada-7c0f-0e8c-edd0-ad9811e6bf2e"
      ]
}
```

#### 400 ####

`Error`



## `GET` /users/{nameId} ##

## `PUT` /users/{nameId} ##

## `DELETE` /users/{nameId} ##

## `GET` /users/{nameId}/projects ##
