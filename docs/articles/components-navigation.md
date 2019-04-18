---
title: Navigation
layout: page
category: component
---

Display a menu that contains a search bar, a list of projects grouped by clients, and the possibility to add a new client.

## Props ##

- defs
- onChange

## State ##

###### definitions: `Object` ######

the definitions of client, project, task IDs 



## Logic ##

#### `handleChange(data:Object, event:Object)` ####

Call the onChange props

###### Parameters ######

- `data` : the client data, based ondefinitions.ClientsDefinitions . 
- `event` : the event object


## Return ##

#### ListClientProjects ####
Rendered object
Props : ({item} in loop)
- **key**: definitions.clientDefinitions.{item}._id
- **name**: definitions.clientDefinitions.{item}.name
- **id**: definitions.clientDefinitions.{item}._id
- **defs**: definition
- **onChange**: handleChange
