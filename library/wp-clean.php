<?php

/*********************
WP_HEAD GOODNESS
The default wordpress head is
a mess. Let's clean it up by
removing all the junk we don't
need.
*********************/
function wpapi_ahoy() {
  // EXTEND FUNCTION.php
  //Allow editor style.
  //add_editor_style( get_stylesheet_directory_uri() . '/library/css/editor-style.css' );

  // let's get language support going, if you need it
  load_theme_textdomain( 'wp-api', get_template_directory() . '/library/translation' );

  // launching operation cleanup
  add_action( 'init', 'wpapi_head_cleanup' );

} /* end bones ahoy */

// let's get this party started
add_action( 'after_setup_theme', 'wpapi_ahoy' );

function wpapi_head_cleanup() {
	// category feeds
	remove_action( 'wp_head', 'feed_links_extra', 3 );
	// post and comment feeds
	remove_action( 'wp_head', 'feed_links', 2 );
	// EditURI link
	remove_action( 'wp_head', 'rsd_link' );
	// windows live writer
	remove_action( 'wp_head', 'wlwmanifest_link' );
	// previous link
	remove_action( 'wp_head', 'parent_post_rel_link', 10, 0 );
	// start link
	remove_action( 'wp_head', 'start_post_rel_link', 10, 0 );
	// links for adjacent posts
	remove_action( 'wp_head', 'adjacent_posts_rel_link_wp_head', 10, 0 );
	// WP version
	remove_action( 'wp_head', 'wp_generator' );

  remove_action('wp_head', 'rel_canonical');

  remove_action('wp_head', 'wp_shortlink_wp_head');

  remove_action( 'wp_head', 'print_emoji_detection_script', 7 );

  remove_action( 'wp_print_styles', 'print_emoji_styles' );

  // remove WP version from css
  add_filter( 'style_loader_src', 'wpapi_remove_wp_ver_css_js', 9999 );
  // remove Wp version from scripts
  add_filter( 'script_loader_src', 'wpapi_remove_wp_ver_css_js', 9999 );

  // A better title
  add_filter( 'wp_title', 'rw_title', 10, 3 );
  // remove WP version from RSS
  add_filter( 'the_generator', 'wpapi_rss_version' );
  // remove pesky injected css for recent comments widget
  add_filter( 'wp_head', 'wpapi_remove_wp_widget_recent_comments_style', 1 );
  // clean up comment styles in the head
  add_action( 'wp_head', 'wpapi_remove_recent_comments_style', 1 );
  // clean up gallery output in wp
  //add_filter( 'gallery_style', 'bones_gallery_style' );

  // launching this stuff after theme setup
  //bones_theme_support();

  // adding sidebars to Wordpress (these are created in functions.php)
  //add_action( 'widgets_init', 'bones_register_sidebars' );

  // cleaning up random code around images
  // add_filter( 'the_content', 'wpapi_filter_ptags_on_images' );
  // // cleaning up excerpt
  // add_filter( 'excerpt_more', 'wpapi_excerpt_more' );
} /* end bones head cleanup */

// remove WP version from RSS
function wpapi_rss_version() { return ''; }

// remove WP version from scripts
function wpapi_remove_wp_ver_css_js( $src ) {
	if ( strpos( $src, 'ver=' ) )
		$src = remove_query_arg( 'ver', $src );
	return $src;
}

// remove injected CSS for recent comments widget
function wpapi_remove_wp_widget_recent_comments_style() {
	if ( has_filter( 'wp_head', 'wp_widget_recent_comments_style' ) ) {
		remove_filter( 'wp_head', 'wp_widget_recent_comments_style' );
	}
}

// remove injected CSS from recent comments widget
function wpapi_remove_recent_comments_style() {
	global $wp_widget_factory;
	if (isset($wp_widget_factory->widgets['WP_Widget_Recent_Comments'])) {
		remove_action( 'wp_head', array($wp_widget_factory->widgets['WP_Widget_Recent_Comments'], 'recent_comments_style') );
	}
}

// remove injected CSS from gallery
function wpapi_gallery_style($css) {
	return preg_replace( "!<style type='text/css'>(.*?)</style>!s", '', $css );
}

?>
