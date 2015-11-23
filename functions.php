<?php

// Set your environment/url pairs
$environments = array(
  'local'       => 'wpapi.dev',
  // 'development' => 'development.website.com',
  'staging'     => 'new.mynameisluis.dev',
  'production'  => 'mynameisluis.com'
);
$http_host = $_SERVER['HTTP_HOST'];

// Loop through $environments to see if there’s a match
foreach($environments as $environment => $hostname) {
  if (stripos($http_host, $hostname) !== FALSE) {
    define('ENVIRONMENT', $environment);
    break;
  }
}


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
add_image_size( 'banner_image', 970, 400, true );

/**
 * Workpress Enqueues
 *
 *
 */

function wpapi_scripts() {

	$sufix = ENVIRONMENT == 'local' ? '' : '.min';
	//_pr(get_template_directory_uri().'/style'.$sufix.'.css');

	wp_enqueue_style( 'wpapi-style', get_template_directory_uri().'/style'.$sufix.'.css', '20150831' );
	wp_register_script( 'wpapi-script', get_template_directory_uri() . '/js/app'.$sufix.'.js', array( 'jquery' ), '20150831', true );
	wp_enqueue_script( 'wpapi-script' );

	addGlobalVarToJavascript();
}

add_action( 'wp_enqueue_scripts', 'wpapi_scripts' );

define('GF_PUBLIC_KEY','8562b7ac3b');
define('GF_PRIVATE_KEY','72f9f8fb9dbe478');

function addGlobalVarToJavascript () {

	$params = array(
	  'themeURL' => get_stylesheet_directory_uri(),
	  'wordpressName' => get_bloginfo('name'),
    'time' => date('D M d Y H:i:s O'),
    'loadDataEvery' => get_field('load_every', 'option')
	);
	wp_localize_script( 'wpapi-script', 'appConfig', $params );

	$api_key = "8562b7ac3b";
	$private_key = "72f9f8fb9dbe478";
	$method  = "GET";
	$route    = "forms/1";
	$expires = strtotime("+60 mins");
	$string_to_sign = sprintf("%s:%s:%s:%s", $api_key, $method, $route, $expires);
	$sig = calculate_signature($string_to_sign, $private_key);
	// _pr($expires);
	// _pr($sig);

	$gfParams = array(
		'root_url' => site_url().'/gravityformsapi/',
		'nonce' => wp_create_nonce( 'gf_api' ),
		'sig_1' => $sig,
		'expires' => $expires,
		'api_key' => $api_key,
		'contactFormID' => 1
	);
	wp_localize_script( 'wpapi-script', 'gfApiVars', $gfParams );

}

function calculate_signature($string, $private_key) {
  $hash = hash_hmac("sha1", $string, $private_key, true);
  $sig = rawurlencode(base64_encode($hash));
  return $sig;
}


// ADD Main Option Menu
if( function_exists('acf_add_options_page') ) {

  acf_add_options_page(array(
    'page_title'  => 'Theme General Settings',
    'menu_title'  => 'Theme Settings',
    'menu_slug'   => 'theme-general-settings',
    'capability'  => 'edit_posts',
    'redirect'    => false
  ));

    // acf_add_options_sub_page(array(
    //   'page_title'  => 'Theme Header Settings',
    //   'menu_title'  => 'Header',
    //   'parent_slug' => 'theme-general-settings',
    // ));

    // acf_add_options_sub_page(array(
    //   'page_title'  => 'Theme Footer Settings',
    //   'menu_title'  => 'Footer',
    //   'parent_slug' => 'theme-general-settings',
    // ));

}


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