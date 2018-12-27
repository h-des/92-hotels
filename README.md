# 92-hotels

92-hotels is a fake app that allows you to find a room in a hotel, check availability and book it.

## Description

This repository contains 2 versions of 92-hotels app.

First one is only a client-side app (more like a mockup) built with **React** and **Redux** working with 2 external APIs:

- [jsonplaceholder](https://jsonplaceholder.typicode.com)
- [unsplash](https://source.unsplash.com/)

You can [access this version here](https://github.com/h-des/92-hotels/tree/master) or just switch to `master` branch.

The second version is more compound. It's a **node** + **express** + **mongoose** server build from scratch connected to a database populated with data from external APIs and random data from faker.js and a client-side app built with **React** and **Redux**. You can [access this version here](https://github.com/h-des/92-hotels/tree/server-and-client) or just switch to `server-and-client` branch.

## Online demos

- [Node server + client-side app](https://hotels-92.herokuapp.com)
- [Client-side](https://92-hotels.now.sh)

## Run locally

### `master` branch

```
  cd client
  npm install
  npm run start
```

Or:

```
  cd client
  npm install
  npm build
  cd build
  serve
```

> Notice: You’ll need to have [serve](https://www.npmjs.com/package/serve) on your machine to use the second option.

### `server-and-client` branch

```
  npm install
  cd client
  npm install
  cd ..
  npm run dev
```

> Notice: You will not have access to the database so the server will not work properly.
