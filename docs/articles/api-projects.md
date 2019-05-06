---
title: /projects/
permalink: api/projects
layout: page
category: API
---
## `GET` /projects ##

Retrieve the complete project list

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

``` javascript
[
    {
        "_id": "5c9b39b2f787951b7e8c9d67",
        "name": "Project Alpha",
        "description": "Project description",
        "budget": 24,
        "client": "5c9b396df787951b7e8c9d63"
    },
    {
        "_id": "5c9b4de344a8003118b967cf",
        "name": "Project Beta",
        "description": "A project description",
        "budget": 48,
        "client": "5c9b3983f787951b7e8c9d65"
    }
]
```

#### 400 ####

`Error`


## `POST` /projects/ ##

## `GET` /projects/{projectId} ##

## `PUT` /projects/{projectId} ##

## `DELETE` /projects/{projectId} ##

## `GET` /projects/{projectId}/trackedtime ##

Get all tracked time for this project

### Security ###

### Request ###

##### Query #####

##### Header #####

##### Body #####

### Response ###

#### 200 ####

##### Header #####

##### Body #####

Array de `trackedTime`

``` json
[
  {
	"id": "0e8dd830-ad98-11e6-bf2e-47644ada7c0f",
	"task": "CSS structure",
	"Comment": "Spent time on configuring webpack",
	"value": 0.75,
	"date": "2018-03-27 00:00"
	"project": "0e8cedd0-ad98-11e6-bf2e-47644ada7c0f",
	"user": "0e8cedd0-ad98-11e6-bf2e-47644ada7c0f" 
  }
]
```

#### 400 ####

`Error`


## `POST` /projects/{projectId}/trackedtime ##

Add a new trackedTime to the project

### Security ###

### Request ###

##### Query #####

##### Header #####

##### Body #####

``` json
{
	"task": "CSS structure",
	"comment": "Spent time on configuring webpack",
	"value": 0.75,
	"user": "5c9b3912f787951b7e8c9d62" 
}
```

### Response ###

#### 200 ####

##### Header #####

##### Body #####

Objet `trackedTime`

``` json
{
	"id": "0e8dd830-ad98-11e6-bf2e-47644ada7c0f",
	"task": "CSS structure",
	"comment": "Spent time on configuring webpack",
	"value": 0.75,
	"date": "2018-03-27 00:00"
	"project": "0e8cedd0-ad98-11e6-bf2e-47644ada7c0f",
	"user": "0e8cedd0-ad98-11e6-bf2e-47644ada7c0f" 
}
```

#### 400 ####

`Error`


## `GET` /projects/{projectId}/trackedtime/{trackId} ##

Get a specific trackedTime

### Security ###

### Request ###

##### Query #####

##### Header #####

##### Body #####

### Response ###

#### 200 ####

##### Header #####

##### Body #####

``` json
{
  "id": "0e8dd830-ad98-11e6-bf2e-47644ada7c0f",
  "task": "CSS structure",
  "comment": "Spent time on configuring webpack",
  "value": 0.75,
  "date": "2018-03-27 00:00"
  "project": "0e8cedd0-ad98-11e6-bf2e-47644ada7c0f",
  "user": "0e8cedd0-ad98-11e6-bf2e-47644ada7c0f" 
}
```

#### 400 ####

`Error`



## `PUT` /projects/{projectId}/trackedtime/{trackId} ##

## `DELETE` /projects/{projectId}/trackedtime/{trackId} ##
