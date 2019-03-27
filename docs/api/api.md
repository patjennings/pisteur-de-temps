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

## `GET` /projects ##

## `POST` /projects/ ##

## `GET` /projects/{projectId} ##

## `PUT` /projects/{projectId} ##

## `DELETE` /projects/{projectId} ##

## `GET` /projects/{projectId}/trackedtime ##

## `POST` /projects/{projectId}/trackedtime ##

## `GET` /projects/{projectId}/trackedtime/{trackId} ##

## `PUT` /projects/{projectId}/trackedtime/{trackId} ##

## `DELETE` /projects/{projectId}/trackedtime/{trackId} ##

## `GET` /clients/ ##

## `POST` /clients/ ##

## `GET` /clients/{clientID} ##

## `PUT` /clients/{clientID} ##

## `DELETE` /clients/{clientID} ##


{
  "id": "0e8dd830-ad98-11e6-bf2e-47644ada7c0f",
  "task": "CSS structure",
  "Comment": "Spent time on configuring webpack",
  "value": 0.75,
  "date": "2018-03-27 00:00"
  "client": "0e8cedd0-ad98-11e6-bf2e-47644ada7c0f",
  "user": "0e8cedd0-ad98-11e6-bf2e-47644ada7c0f" 
}
