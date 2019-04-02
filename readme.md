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

- ajouter dans les projets : budget, description
