# Branch TypeOrm with authentification
Before to launch the api, you need to install all dependancies :
`npm i`

If you have any difficulties to install argon2, you might install more thing. This is the documentation and check [Before installing](https://www.npmjs.com/package/argon2)

After the node_modules installed, you have to create a folder **config** into **src** folder.
In the config folder, create 2 files : **config-db.ts** and **jwt-secret.ts**.

>     src
>         config
>              - config-db.ts
>              - jwt-secret.ts
>         controller
>         ...

The config-dbb.ts is the file where you config your database

An exemple to describe the file : 

>   export const DATABASE = {
>       host: 'localhost',
>       username: 'root', 
>       password: 'root',
>       database: 'db',
>       port: 3006,
>   };

Adapt the object DATABASE following your database's config.


The jwt-secret.ts is the file where you initialize the constant JWT_SECRET.

An example : 

> export const JWT_SECRET = 'azerTYTYUIOP12693193';



# node-template
This repository give you a starting point with Node JS projects for the following cases: 

## Node Javascript: Run/Dev/Debug

The following scripts launch respectivly: 
`npm run start`: Run production version
`npm run start:dev`: Develop - livereload
`npm run start:debug`: Ability to debug with vscode (activate **auto attach option** ) ctrl+shift+p(_type_ "auto attach")

## Node Javascript + Linter: 

Works by the same way than **Node Javascript** but enforce linting.
`npm run lint`: Verify syntaxe error and code quality 



## Node Typescript: Run/Build/Dev/Debug

The following scripts launch respectivly: 
`npm run start`: Run production version
`npm run start:dev`: Develop - livereload
`npm run start:debug`: Ability to debug with vscode (activate **auto attach option** ) ctrl+shift+p(_type_ "auto attach")
`npm run build`: convert typescript to javascript


## Node Typescript + Linter: 

Works by the same way than **Node Typescript** but enforce linting.
`npm run lint`: Verify syntaxe error and code quality 
