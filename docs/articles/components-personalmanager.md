---
title: Personal Manager
layout: page
category: component
---

This component is used to input a task, related to a project, and displays the history of the tasks input by the active/logged user. 

## Props ##

- userid : the active/logged user id
- defs : definitions
- onChange : onChange function


## State ##

###### userId: `String` ######

the id of the currently logged in user

###### trackHistory: `Array` ######

An array of the tracks defined by the logged/active user.

###### definitions: `Object` ######

the definitions of client, project, task IDs 



## Logic ##

#### `componentWillMount()` ####

> This is an async function

Calls `fetchPersonalHistory()`, that returns an array of track input by the user

Then it calls a `setState` in order to update `{trackHistory}`

#### `handleChange(data:String, event: Object)` ####

> This is an async function

If `data` arg is not null, it updates parent via `props.onChange` (passing a projectid as a parameter)

Calls `fetchPersonalHistory()`, that returns an array of track input by the user

Then it calls a `setState` in order to update `{trackHistory}`

###### Parameters ######

- `data` : The task updated 
- `event` : the event object

#### `handleClick(data:Object, event: Object)` ####

Updates parent via `props.onChange`

###### Parameters ######

- `data` : The selected project. 
- `event` : The event object. 



## Return ##

Render

#### TaskInput ####
Props :
- definitions 
- handleChange
- userId

#### Task (in loop) ####
Props :
- key : trackHistory.{item}.id
- id : trackHistory.{item}.id
- task : trackHistory.{item}.task
- value : trackHistory.{item}.value
- comment : trackHistory.{item}.comment
- relatedProject : trackHistory.{item}.relatedProject
- date : trackHistory.{item}.date
- ===========
- userid : userId
- onClick : handleChange({item}, event)
- defs : definitions
