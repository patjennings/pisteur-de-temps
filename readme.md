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
- ~~webpack~~
- ~~ne pas faire trop de requêtes dans projectDetails~~
- ~~sass and global styles~~
- ~~n'afficher project details que quand on en a besoin (au click)~~
- tooltips
- ~~ajouter du temps sur un projet~~
  - ~~configurer dropdown de add time~~
Task
- rafraichir ~~track history~~ et project details quand temps rentré
- ~~DELETE supprimer temps rentré dans track history (actualiser composant)~~
- ~~DELETE supprimer entrée dans project detail~~
- éditer temps rentré (track history et project details)
  - PUT en mode editInPlace

Projet
- POST ajouter un projet (dans un client)
- PUT éditer projet
- DELETE supprimer projet

Client
- POST ajouter un client
- PUT éditer un client
- DELETE supprimer un client

- login
  - gestion des utilisateurs
- animation au click (affichage du détail de projet)
- garder le dernier affichage du dropdown en mémoire/cookie
- projectdetails => barre rouge si budget dépassé
- dans input-track, retrouver automatiquement les tâches déjà entrées (dans le <input /> task)
- ~~track history, inverser l'ordre~~
  - problème de pointage (lors d'une suppression e.g.)
- export csv
- export json
- enable toaster pour les notifications (choisissez un projet, etc.)
- problème dans l'ordre des task de Personal (e.g. quand on supprime, pb comportement)
- gérer le problème d'update de Project : mécanique w/ shouldComponentUpdate, componentWillUpdate, etc.

- ~~meilleure organisation des composants~~:
  - https://medium.com/@alexmngn/how-to-better-organize-your-react-applications-2fd3ea1920f1
  - https://gist.github.com/ryanflorence/daafb1e3cb8ad740b346#how-it-works
  
  

###### doc api ######

- post/put project : manque champs budget+description
- checker toutes les méthodes et écrire la doc api


- selectedProject > active Project (cohérence générale)
- faire la liste des besoins de chaque composant, fonction
- props to state, à chaque fois ? vérifier dans chaque composant
- tête de fichier, grouper npm, utils, components, styles
