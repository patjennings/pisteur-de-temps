#### app ####

`app.js` - 

`./routes/routes.js` -

require les models de la section (`var models`)

Ensuite, on crée les routes. À chacune correspond une requête dans la base Mongo, avec models.{collections}


#### models ####

`./models/mongo.js`

On crée un modèle par collection, que l'on exporte

#### Base de données ####

Base MongoDB, avec quatre collections

- `users` : les utilisateurs, qui sont liés à un ou plusieurs projets
- `clients` : les clients, qui seront appelés lors de la création de projets
- `projects` : les projets, qui sont liés à un client
- `trackedTime` : les slots de temps rentrés dans l'appli. Ils possèdent plusieurs propriétés `value`, `comment`, `task`, et sont liés à un utilisateur et un projet
