---
title: fetchPersonalHistory
layout: page
category: function
---

Fetch the track history for a specific user.

## `fetchPersonalHistory(userId:string, elemB:boolean)` ##

Request with `axios`. It calls for the tracks defined by the user defined as a parameter.

###### Parameters ######

- `userId` (integer) : the id of the user

###### return ######

An array of every track defined by the user

## Usage ##

``` javascript
import fetchPersonalHistory from "utils/fetchPersonalHistory" // import
let request = fetchPersonalHistory({userId}) // usage
```
