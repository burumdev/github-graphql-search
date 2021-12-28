# Github GraphQL Search

## Description
An example project that searches for github users, their repositories (owned or contributed) and repo issues using Apollo GraphQL client to query GitHub's GraphQL API. 

## WARNING!
NEVER USE THIS APPLICATION IN A PRODUCTION SERVER OPEN TO THE INTERNET.
THERE IS A RISK OF EXPOSING YOUR ACCESS TOKEN TO CLIENTS.
ONLY RUN IT IN DEVELOPMENT MODE IN A LOCAL SERVER (localhost, 127.0.0.1)

## Technologies
Project is created with:
* React
* Typescript
* Apollo Client
* Vite

## To run it
To run this project, after cloning the repo, install it locally using npm:

```
$ cd github-graphql-search
$ npm install
```

Then create a .env.local file copied from .env.example and change VITE_GH_TOKEN to your GitHub personal access token. Then run:

```
$ npm run dev
```

## TODO Items

* Creating a new issue on the selected repo with title and description (mutation)
* Find a way to show repository issue publishedAt date in human readable format
