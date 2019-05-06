---
title: ListClientProjects
layout: page
category: component
---
Display a list of projects by a defined client.

## Props ##

- key : the client id
- name : the client name
- id : the client id
- defs : definitions
- onChange : onChange function



## State ##

###### hasProject: `Boolean` ######

Return true if the client has project. Default: `false`


###### definitions: `Object` ######

the definitions of client, project, task IDs 



## Logic ##

#### `handleChange(data:Object, event:Object)` ####

Call the onChange props

###### Parameters ######

- `data` : the project data, based on definitions.ProjectsDefinitions. 
- `event` : the event object


## Return ##

Rendered object
