---
title: App
layout: page
permalink: components/app
category: component
---

## Props ##

No props



## State ##

###### userId: `String` ######

the id of the currently logged in user

###### showProject: `Boolean` ######

`true` if the Project component is displayed. Default : `false`

###### activeProject: `String` ######

Id of the active project

###### definitions: `Object` ######

the definitions of client, project, task IDs 



## Logic ##

#### `setDefinitions()` ####

Sets the definitions that will be passed as props to each component. See `shared/utils/definitions.js` for details.
It calls an async `getDefinitions()` in the `Definitions` class.

Then it calls a `setState` in order to update `{definitions}`

#### `handleChange(d:String)` ####

Updates {showProject} & {activeProject} in the state

###### Parameters ######

- `d` : The selected project. 



## Return ##

#### PersonalManager ####
Props :
- **defs**:definitions 
- **onChange**:handleChange
- **userid**:userId

#### Project ####
Props :
- **defs**:definitions
- **key**:activeProject 
- **projectid**:activeProject 

#### Navigation ####
Props :
- **defs**:definitions
- **onChange**:handleChange


