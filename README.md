# React Component Library Keycard-chooser
_for [e-liberty](https://www.eliberty.fr.com/) deployment_

### OVERIVEW
* Keycards input mask that handles card types (Alfi, TA, SD, Open)
* Display of the list of saved keycards

### UP & RUNNING
* Install dependencies
`$ npm install` or `$ yarn`

* Fire up a development server:
* `$ npm run dev`

Once the server is running, you can visit `http://localhost:8080/`

### Linting
_This assumes you have eslint installed. If you don't, run the following:_
```
$ npm install eslint --save-dev
```

### Production Build

To build your production assets and run the server:
```
$ npm start
```

```
$ npm run build:all
```

to use all the css files, you must add the link tag in the file index.html
```
<link rel="stylesheet" type="text/css" href="main.css">
```