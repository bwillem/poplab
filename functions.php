<?php
/**
 * Twenty Fifteen functions and definitions
 *
 * Set up the theme and provides some helper functions, which are used in the
 * theme as custom template tags. Others are attached to action and filter
 * hooks in WordPress to change core functionality.
 *
 * When using a child theme you can override certain functions (those wrapped
 * in a function_exists() call) by defining them first in your child theme's
 * functions.php file. The child theme's functions.php file is included before
 * the parent theme's file, so the child theme functions would be used.
 **/
require('mockups.php');
function jbm_scripts() {
	//scripts
	wp_enqueue_script( 'jquery', get_template_directory_uri() . '/js/jquery-1.11.3.min.js');
	wp_enqueue_script( 'jquery-mobile', get_template_directory_uri() .'/js/jquery.mobile.custom.min.js');
	wp_enqueue_script( 'bootstrap', get_template_directory_uri() . '/js/bootstrap.min.js');
	wp_enqueue_script( 'prefixfree', get_template_directory_uri() . '/js/prefixfree.min.js');
    //? wp_enqueue_style( 'parent-style', get_template_directory_uri().'/style.css' );
    //? wp_enqueue_script( 'ajax-pagination',  get_stylesheet_directory_uri() . '/js/ajax-pagination.js', array( 'jquery' ), '1.0', true );


	wp_enqueue_script( 'jbm-script', get_template_directory_uri() . '/js/script.js');

	wp_localize_script( 'jbm-script', 'ajaxpagination', array(
		'ajaxurl' => admin_url( 'admin-ajax.php' )
	));

}
function jbm_styles(){
	wp_enqueue_style( 'bootstrap-theme', get_template_directory_uri() . '/css/bootstrap.min.css');
	wp_enqueue_style( 'fontAwesome', get_template_directory_uri() . '/css/font-awesome.min.css');
}
add_action( 'wp_enqueue_scripts', 'jbm_scripts' );
// //add_action( 'wp_enqueue_styles', 'jbm_styles' );

add_theme_support( 'post-thumbnails' );

register_nav_menus( array( "topnav" => "Main Header Navigation" ) );

add_action('admin_head', 'my_custom_fonts');

/// Remove auto paragraph tags from WP
remove_filter( 'the_content', 'wpautop' );
remove_filter( 'the_excerpt', 'wpautop' );

function _remove_script_version( $src ){
	$parts = explode( '?', $src );
	return $parts[0];
}
add_filter( 'script_loader_src', '_remove_script_version', 15, 1 );
add_filter( 'style_loader_src', '_remove_script_version', 15, 1 );

/**
 * Register and enqueue a custom stylesheet in the WordPress admin.
 */
function enqueue_custom_admin_scripts($hook) {

	////////////////////////////////////////////////////////////////////
	wp_enqueue_style( 'fontAwesome', get_template_directory_uri() . '/css/font-awesome.min.css');
	wp_enqueue_style( 'bootstrap-theme', get_template_directory_uri() . '/css/bootstrap.min.css');

    wp_enqueue_style( 'custom_wp_admin_css', get_template_directory_uri() . '/css/admin-style.css' );
    wp_enqueue_script( 'pagebuilder_script',  get_template_directory_uri() . '/pageBuilder/pagebuilder.js');

}
add_action( 'admin_enqueue_scripts', 'enqueue_custom_admin_scripts' );