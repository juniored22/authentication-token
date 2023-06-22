# AUTHENTICATION-TOKEN
## Install
```
npm install
```

## Commands
running service website and api
```
npm run dev
```

create table migration OCM
```
    // Schrma
    sequelize migration:create --name=create-users  

    // Run schema create table definide in schema
    sequelize db:migrate 

    //seeders 
    sequelize-cli seed:generate --name demo-user 

    // run seeders
    sequelize-cli db:seed:all
```

## Sequelize ROW query

the query built are by default the sequelize

https://sequelize.org/master/manual/raw-queries.html

```
    const [results, metadata] = await connection.query("SELECT * FROM  users ");
```

### Mongodb

```
DEBUG=log NOSQL=true nodemon index.js
```

### Response request create user

```
{
  "_id": "5e7fde03f67626af82614d9f",
  "name": "Edgard",
  "email": "edgard@teste.com",
  "password": "$2a$10$6I6Crqx1mQHeY/ov.Dgp..w7XsKlBGkYQ1uznFJCJC6fHlWR32Gza",
  "token": "$2a$10$Tqd9APeWVCNAeQysa5DUMOyTt8dWx7MLQXNgghONiYHpnJ3LSxeLC",
  "create_at": "2020-03-28T23:30:11.532Z",
  "update_at": "2020-03-28T23:30:11.532Z",
  "__v": 0
}
```
