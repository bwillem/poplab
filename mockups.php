<?php
// Register Custom Mockup
function custom_post_type() {

	$labels = array(
		'name'                  => _x( 'Mockups', 'Mockup General Name'),
		'singular_name'         => _x( 'Mockup', 'Mockup Singular Name'),
		'menu_name'             => __( 'Mockups'),
		'name_admin_bar'        => __( 'Mockup'),
		'archives'              => __( 'Item Archives'),
		'attributes'            => __( 'Item Attributes'),
		'parent_item_colon'     => __( 'Parent Item:'),
		'all_items'             => __( 'All Items'),
		'add_new_item'          => __( 'Add New Item'),
		'add_new'               => __( 'Add New'),
		'new_item'              => __( 'New Item'),
		'edit_item'             => __( 'Edit Item'),
		'update_item'           => __( 'Update Item'),
		'view_item'             => __( 'View Item'),
		'view_items'            => __( 'View Items'),
		'search_items'          => __( 'Search Item'),
		'not_found'             => __( 'Not found'),
		'not_found_in_trash'    => __( 'Not found in Trash'),
		'featured_image'        => __( 'Featured Image'),
		'set_featured_image'    => __( 'Set featured image'),
		'remove_featured_image' => __( 'Remove featured image'),
		'use_featured_image'    => __( 'Use as featured image'),
		'insert_into_item'      => __( 'Insert into item'),
		'uploaded_to_this_item' => __( 'Uploaded to this item'),
		'items_list'            => __( 'Items list'),
		'items_list_navigation' => __( 'Items list navigation'),
		'filter_items_list'     => __( 'Filter items list'),
	);
	$args = array(
		'label'                 => __( 'Mockup'),
		'description'           => __( 'Mockup Description'),
		'labels'                => $labels,
		'supports'              => array('thumbnail', 'editor' ),
		'taxonomies'            => array( 'category', 'post_tag' ),
		'hierarchical'          => false,
		'public'                => true,
		'show_ui'               => true,
		'show_in_menu'          => true,
		'menu_position'         => 5,
		'show_in_admin_bar'     => true,
		'show_in_nav_menus'     => true,
		'can_export'            => true,
		'has_archive'           => true,		
		'exclude_from_search'   => false,
		'publicly_queryable'    => true,
		'capability_type'       => 'page',
	);
	register_post_type( 'mockup', $args );

}
add_action( 'init', 'custom_post_type', 0 );

