## /users/ ##

### `GET` ###

##### Request #####

Query
``` json
None 
```

Header
``` json
None 
```

Body
``` json
None 
```

##### Response #####

Header
``` json
None 
```

Body
``` json
None 
```

###### 200 ######

``` json
[{
  "id": "0e8dd830-ad98-11e6-bf2e-47644ada7c0f",
  "firstName": "Jean",
  "lastName": "Lechat",
  "email": "lechat@fournisseur.fr",
  "projects": [
      "0e8cedd0-ad98-11e6-bf2e-47644ada7c0f",
      "47644ada-7c0f-0e8c-edd0-ad9811e6bf2e"
      ]
}]
```

###### 400 ######

`Error`

### `POST` ###

##### Request #####

Query
``` json
None 
```

Header
``` json
None 
```

Body
``` json
None 
```
##### Response #####

Header

``` json
None 
```

Body

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

###### 200 ######

``` json
{
  "_id": "0e8dd830-ad98-11e6-bf2e-47644ada7c0f",
  "firstName": "Jean",
  "lastName": "Lechat",
  "email": "lechat@fournisseur.fr",
  "projects": [
      "0e8cedd0-ad98-11e6-bf2e-47644ada7c0f",
      "47644ada-7c0f-0e8c-edd0-ad9811e6bf2e"
      ]
}
```

###### 400 ######

`Error`

### /users/ ###

### /users/{nameId} ###

### /users/{nameId}/projects  ###

### /projects  ###

### /projects/ ###

### /projects/{projectId} ###

### /clients/ ###

### /clients/{clientID} ###

