# Geo Location <!-- omit in toc -->

- [Requirements](#requirements)
- [Installation](#installation)
    - [Client](#client)
    - [Server](#server)
- [Run Project](#run-project)
    - [Client](#client-1)
    - [Server](#server-1)
- [Environment](#environment)
    - [Server](#server-2)
    - [Client](#client-2)

---

# Requirements

- [Node JS](https://nodejs.dev)
- [npm](https://npm.io)
- [Mongo DB](https://www.mongodb.com) _(Optional)_

---

# Installation

### Client

For Client (or Frontend), just run

```sh
npm install --dir client
```

### Server

For Server (or Backend), just run

```sh
npm install --dir server
```

---

# Run Project

Once the dependencies are installed:

### Client

For Frontend, just run:

```sh
npm run --dir client start
```

### Server

For Backend, just run:

```sh
npm run --dir server dev
```

---

# Environment

Each Project has their own specific environment variables, just go to their specific directory and add `.env` (dot env) file or copy the `.env.example` file and edit their values.

### Server

For the Backend:

| ENV VARIABLE       | DESCRIPTION                                                                                                                    | TYPE               | REQUIRED | DEFAULT VALUE               |
| :----------------- | :----------------------------------------------------------------------------------------------------------------------------- | :----------------- | :------- | :-------------------------- |
| `DB_CONNECTION`    | For Mongo DB, usually the host                                                                                                 | `string`           | NO       | `mongodb://localhost:27017` |
| `DB_NAME`          | For Mongo DB, the database name                                                                                                | `string`           | NO       | `Geo`              |
| `PORT`             | The Port of the Server                                                                                                         | `number`           | NO       | `5000`                      |
| `TOKEN_EXPIRES_IN` | When will the Token expires, expressed in seconds or a string describing a time span [zeit/ms](https://github.com/zeit/ms.js). | `string \| number` | YES      | N/A                         |
| `TOKEN_SECRET`     | The Token Secret for JWT                                                                                                       | `string`           | YES      | N/A                         |

### Client

For the Frontend:

| ENV VARIABLE       | DESCRIPTION     | TYPE     | REQUIRED | DEFAULT VALUE           |
| :----------------- | :-------------- | :------- | -------- | ----------------------- |
| `REACT_APP_BASE_URL` | The Backend URL | `string` | NO       | `http://localhost:5000` |

See [documentation](https://vitejs.dev/guide/env-and-mode.html#env-files) about Environment variables for Vite

---

###### Created by Renz Jaskin Agmata <!-- omit in toc -->
