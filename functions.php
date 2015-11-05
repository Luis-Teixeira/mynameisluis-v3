<?php
if ( ! function_exists( 'wpapi_setup' ) ) :
/**
 * Sets up theme defaults and registers support for various WordPress features.
 *
 * Note that this function is hooked into the after_setup_theme hook, which
 * runs before the init hook. The init hook is too late for some features, such
 * as indicating support for post thumbnails.
 */

require_once('library/wp-clean.php');

function wpapi_setup() {

	/*
	 * Make theme available for translation.
	 * Translations can be filed in the /languages/ directory.
	 * If you're building a theme based on WPapi, use a find and replace
	 * to change 'wpapi' to the name of your theme in all the template files
	 */
	load_theme_textdomain( 'wpapi', get_template_directory() . '/languages' );

	// Add default posts and comments RSS feed links to head.
	//add_theme_support( 'automatic-feed-links' );

	// This theme uses wp_nav_menu() in one location.
	add_theme_support( 'menus' );
	register_nav_menus( array(
		'primary' => __( 'Main Menu', 'wpapi' ),
	) );

	/*
	 * Switch default core markup for search form, comment form, and comments
	 * to output valid HTML5.
	 */
	add_theme_support( 'html5', array(
		'search-form', 'comment-form', 'comment-list', 'gallery', 'caption',
	));

	/*
	 * Enable support for Post Formats.
	 * See http://codex.wordpress.org/Post_Formats
	 */
	// add_theme_support( 'post-formats', array(
	// 	'aside', 'image', 'video', 'quote', 'link', 'chat', 'gallery',
	// ) );
}
endif; // wpapi_setup
add_action( 'after_setup_theme', 'wpapi_setup' );

/**
 * Workpress Enqueues
 *
 *
 */

function wpapi_scripts() {
	wp_enqueue_style( 'wpapi-style', get_stylesheet_uri(), '20150831' );
	wp_register_script( 'wpapi-script', get_template_directory_uri() . '/js/app.js', array( 'jquery' ), '20150831', true );
	wp_enqueue_script( 'wpapi-script' );

	addGlobalVarToJavascript();
}

add_action( 'wp_enqueue_scripts', 'wpapi_scripts' );



function addGlobalVarToJavascript () {

	$params = array(
	  'themeURL' => get_stylesheet_directory_uri(),
	  'wordpressName' => get_bloginfo('name'),
	);
	wp_localize_script( 'wpapi-script', 'appConfig', $params );

	$gfParams = array(
		'root_url' => site_url().'/gravityformsapi/',
		'nonce' => wp_create_nonce( 'gf_api' ),
		'contactFormID' => 1
	);
	wp_localize_script( 'wpapi-script', 'gfApiVars', $gfParams );

}
// function scripts() {
// 	$scripts = array(
// 		array(
// 			'handle'  => 'gf_web_api_demo_js',
// 			'src'     => $this->get_base_url() . '/js/gf_web_api_demo.js',
// 			'deps'    => array( 'jquery' ),
// 			'version' => $this->_version,
// 			'enqueue' => array(
// 				array( 'query' => 'page=gravityformswebapidemo' ),
// 			),
// 			'strings' => array(
// 				'root_url' => $this->get_api_url(),
// 				'form_id' => $this->_form_id,
// 				'nonce' => wp_create_nonce( 'gf_api' ),
// 			)
// 		),
// 	);

// 	return array_merge( parent::scripts(), $scripts );
// }

/**
 * Show Custom Post Type in  Rest
 *
 *
 */

function wpsd_add_events_args() {
    global $wp_post_types;
    $wp_post_types['portfolio']->show_in_rest = true;
    $wp_post_types['portfolio']->rest_base = 'portfolio';
    $wp_post_types['portfolio']->rest_controller_class = 'WP_REST_Posts_Controller';
}
add_action( 'init', 'wpsd_add_events_args', 30 );

/**
 * UTILS
 *
 *
 */
function _pr( $a ) {
  print( '<pre class="dump">' );
  print_r( $a );
  print( '</pre>' );
}