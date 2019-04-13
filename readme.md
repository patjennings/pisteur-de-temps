## Pré-requis ##

- NodeJs
- MongoDB

## Installation ##

``` bash
git clone https://framagit.org/patjennings/time-tracker.git
```

``` bash
cd time-tracker
```

``` bash
npm install
```

``` bash
npm start # launche nodejs server
```

### Création de la base MongoDB ###

``` bash
sudo service mongod start
```

Se connecter à `mongo`

``` bash
mongo
```

Créer la base `time-tracker`, et se positionner dedans

``` bash
> use time-tracker
switched to time-tracker
```

Créer les collections dans la base `time-tracker`

``` bash
> db.createCollection("users")
> db.createCollection("clients")
> db.createCollection("projects")
> db.createCollection("trackedTime")
```

## todo ##

~~- ajouter dans les projets : budget, description~~
  - ~~impact models mongo~~
- webpack
- ~~ne pas faire trop de requêtes dans projectDetails~~
- sass and global styles
- ~~n'afficher project details que quand on en a besoin (au click)~~
- tooltips
- ~~ajouter du temps sur un projet~~
  - ~~configurer dropdown de add time~~
  - ~~rafraichir track history et project details quand temps rentré~~
- supprimer temps rentré dans track history (actualiser composant)
- supprimer entrée dans project detail
- éditer temps rentré (track history et project details)
- éditer projet
- ajouter un projet (dans un client)
- ajouter un client
- login
  - gestion des utilisateurs
- animation au click (affichage du détail de projet)
- garder le dernier affichage du dropdown en mémoire/cookie
- ~~track history, inverser l'ordre~~
