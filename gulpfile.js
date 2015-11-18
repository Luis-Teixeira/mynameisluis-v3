// Stash requires in variables
var
  $ = require('gulp-load-plugins')(),
	gulp = require( 'gulp' ),
	browserify = require( 'browserify' ),
	babelify = require('babelify'),
	buffer = require( 'vinyl-buffer' ),
	source = require( 'vinyl-source-stream' ),
	uglify = require('gulp-uglify'),
	autoprefixer = require('gulp-autoprefixer'),
  minifycss = require('gulp-minify-css'),
  rename = require('gulp-rename');

// ERROR HANDLER


//SCSS DEV
	/// SCSS & CSS
gulp.task('sass:dev', function () {
	return gulp.src('./src/style.scss')
	.pipe($.plumber())
	//.pipr($.sourcemap.init())
	.pipe($.sass( {
		sourcemap: true,
		sourcemapPath: '../scss',
		style: 'expanded'
	} ) )
	.on( 'error', function (err) { console.log(err.message); this.emit('end'); } )
	.pipe( gulp.dest( './' ) )
	.pipe($.livereload());

});



// JS
	gulp.task('scripts:dev', function () {
	  var bundler = browserify({
	    entries: 'src/components/App.jsx',
	    extensions: ['.jsx'],
	    debug: true
  	});
		bundler.transform(babelify); // use the reactify transform
		return bundler.bundle()
			.on( 'error', function (err) {
				console.log(err);
				this.emit('end');
				$.util.log.bind( $.util, 'Browserify Error' );
			})
			.pipe( source( 'app.js' ) )
				// .pipe( buffer() )
				// .pipe( $.sourcemaps.init( { loadMaps: true } ) )
				// .pipe( $.sourcemaps.write( './' ) )
			.pipe(gulp.dest( './js' ))
			.pipe($.notify( { message: 'Styles task complete' } ))
			.pipe($.livereload());
	});


// WATCH
	gulp.task('watch',function(){
		$.livereload.listen({ start: true });
		// Watch .scss files
		gulp.watch('src/**/*.scss', ['sass:dev']);

		// Watch .jsx files
		gulp.watch('src/**/*.jsx', ['scripts:dev']);
	});

// DEFAULT
	var notify = require( 'gulp-notify' );
	gulp.task('default',function(){
		//console.log('ole');
	});

	gulp.task('build', function() {

		var bundler = browserify({
	    entries: 'src/components/App.jsx',
	    extensions: ['.jsx'],
	    debug: true
  	});
		bundler.transform(babelify); // use the reactify transform

		bundler.bundle()
			.pipe( source( 'app.js' ) )
			.pipe( buffer() )
			.pipe(rename({suffix: '.min'}))
			.pipe(uglify())
			.pipe(gulp.dest( './js' ))
			.pipe($.notify( { message: 'Styles task complete' } ));


		gulp.src('./src/style.scss')
			.pipe($.plumber())
			//.pipr($.sourcemap.init())
			.pipe($.sass( {
				sourcemap: false,
				sourcemapPath: '../scss',
				style: 'expanded'
			} ) )
			.pipe(autoprefixer({
         browsers: ['last 2 versions'],
         cascade: false
       }))
			.pipe(rename({suffix: '.min'}))
			.pipe(minifycss())
			.pipe( gulp.dest( './' ) );
});

	//gulp.task('default', ['scripts']);

module.exports = gulp;
