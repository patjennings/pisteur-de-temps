---
# You don't need to edit this file, it's empty on purpose.
# Edit theme's home layout instead if you wanna make some changes
# See: https://jekyllrb.com/docs/themes/#overriding-theme-defaults
layout: home
---
### Documentation

#### Node app ####

`app.js` - 

`./routes/routes.js` -

require les schémas Mongoose (dans la `var models`)

Ensuite, on crée les routes. À chacune correspond une requête dans la base Mongo, avec `models.{collections}.find()`, `models.{collections}.findById()`, etc...
Chaque route restourne un résultat sous forme de réponse au format json. Ces réponses sont définies par la spéc de l'API (voir `./docs/api.md`).



#### Modèles Mongoose ####

`./models/mongo.js`

Ce sont les modèles Mongoose pour communiquer avec la base Mongo. 
On crée un modèle par collection, que l'on exporte. On le récupère dans `./routes/routes.js`

#### Base de données ####

Base MongoDB, avec quatre collections

- `users` : les utilisateurs, qui sont liés à un ou plusieurs projets
- `clients` : les clients, qui seront appelés lors de la création de projets
- `projects` : les projets, qui sont liés à un client
- `trackedTime` : les slots de temps rentrés dans l'appli. Ils possèdent plusieurs propriétés `value`, `comment`, `task`, et sont liés à un utilisateur et un projet


#### Dépendances ####
- Boostrap (dépendances > Popper + JQuery) . Les dossiers sont servis dans `./routes/routes.js`, avec `app.use()`. On vient taper dans `node_modules`, sans montrer le dossier.
