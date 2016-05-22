## Redux Starter
To run the project, you have to follow the next instructions:

Pre-requisites

```
Nodejs v6.2.0
bower [npm install -g bower]
gulp	[npm install -g gulp]
nodemon	[npm install -g nodemon]
```

1. Install dependencies with the command

```
$ npm install
```
2. Install bower dependencies

```
	$ bower install
```

3. Run task compilations with gulp. Is necessary to especify the environment, by default is `dev`, and also is necessary to especify the task.

```
# mac/linux
$ APP_ENV=qa gulp build

# windows
$ set APP_ENV=qa gulp build

$ APP_ENV=prod nodemon server.js

APP_ENV=prod gulp compile:pro
```

### Features

This starter pack provides cool features to develop with easy.
Run a development express server with live-reload

```
$ nodemon server.js
```

Other useful task are:

`$ gulp sass`: Compiles all sass files to `style.css`

`$ gulp compile`: Compiles react/es7 files to `bundle.js`

`$ gulp test`: Execute eslint and unit testing tasks.



react dev tools
redux dev tools
