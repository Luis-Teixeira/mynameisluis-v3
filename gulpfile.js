// Stash requires in variables
var
  $ = require('gulp-load-plugins')(),
	gulp = require( 'gulp' );

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

var
	browserify = require( 'browserify' ),
	babelify = require('babelify'),
	buffer = require( 'vinyl-buffer' ),
	source = require( 'vinyl-source-stream' );

// JS
	gulp.task('scripts', function () {
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
		gulp.watch('src/**/*.jsx', ['scripts']);
	});

// DEFAULT
	var notify = require( 'gulp-notify' );
	gulp.task('default',function(){
		//console.log('ole');
	});

	//gulp.task('default', ['scripts']);

module.exports = gulp;
