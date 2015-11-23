MyNameIsLuis - v3 aka MNSL
==============

MNSL is the wordpress theme for my portfolio.
It has the main feature to use [React](http://facebook.github.io/react/) and [WP-API](http://wp-api.org/).



### Installation - Dependencies

You need Node JS [node js](https://nodejs.org/)

You need gulp installed globally:

```sh
$ npm install --global gulp
```



### Installation
clone in theme folder (wordpress/wp-content/themes/)
```sh
$ git clone git@bitbucket.org:Luis-Teixeira/mynameisluis-v3.git
$ cd mynameisluis-v3
$ npm install
$ Run `gulp js` to compile the JavaScript
$ Set your permlinks to /%postname%/ and if required clear your localStorage.
```

### Development

watch js, css, (todo livereload):
```sh
$ gulp watch
```

### Distribution
distrubution task (compress scss, minify css, autoprefix, uglify, ect)
```sh
$ gulp build
```

### Wordpress Plugins Required 

MyNameIsLuis - v3 aka MNSL
==============

MNSL is the wordpress theme for my portfolio.
It has the main feature to use [React](http://facebook.github.io/react/) and [WP-API](http://wp-api.org/).



### Installation - Dependencies

You need Node JS [node js](https://nodejs.org/)

You need gulp installed globally:

```sh
$ npm install --global gulp
```



### Installation
clone in theme folder (wordpress/wp-content/themes/)
```sh
$ git clone git@bitbucket.org:Luis-Teixeira/mynameisluis-v3.git
$ cd mynameisluis-v3
$ npm install
$ Run `gulp js` to compile the JavaScript
$ Set your permlinks to /%postname%/ and if required clear your localStorage.
```

### Development

watch js, css, (todo livereload):
```sh
$ gulp watch
```

### Distribution
distrubution task (compress scss, minify css, autoprefix, uglify, ect)
```sh
$ gulp build
```

### Wordpress Plugins Required 

[WP REST API](http://v2.wp-api.org/)\
[ACF](http://www.advancedcustomfields.com/)\
[ACF to WP API](https://wordpress.org/plugins/acf-to-wp-api/)\
[Gravity Forms](http://www.gravityforms.com/)

optinal (but is essencial to create a custom post type 'portfolio')\
[Custom Post Type UI](https://github.com/WebDevStudios/custom-post-type-ui/)
	- for creating custom post types, in this case 'portfolio'

