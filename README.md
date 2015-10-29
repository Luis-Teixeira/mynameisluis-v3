WP API Studie
==============


WP API Studie is a WPAPI & React Studie ([Based on Picard Present](https://github.com/jacklenox/picard-present))
[React](http://facebook.github.io/react/)
[WP-API](http://wp-api.org/) which, at some point, will be going into WordPress core.


### Installation - Dependencies

You need Node JS [node js](https://nodejs.org/)

You need gulp installed globally:

```sh
$ npm install --global gulp
```

### Installation
clone in theme folder (wordpress/wp-content/themes/)
```sh
$ git clone git@bitbucket.org:Luis-Teixeira/wpapi.git
$ cd wpapi
$ npm install
$ Run `gulp js` to compile the JavaScript
$ Set your permlinks to /%year%/%monthnum%/%day%/%postname%/ and if required clear your localStorage.
```

### Development

watch js, css, (todo livereload):
```sh
$ gulp watch
```

### Distribution
distrubution task (compress scss, minify css, autoprefix, uglify, ect)
```sh
$ gulp dist
```