<?php
/**
 * Theme functions and definitions.
 */

function twentytwentyfive_child_enqueue_styles() {
    wp_enqueue_style( 'parent-style', get_template_directory_uri() . '/style.css' );
}
add_action( 'wp_enqueue_scripts', 'twentytwentyfive_child_enqueue_styles' );

/**
 * Register custom blocks.
 */
function twentytwentyfive_child_register_blocks() {
    $blocks = [ 'slider', 'crossroad-pages' ];
    foreach ( $blocks as $block ) {
        register_block_type( __DIR__ . '/blocks/' . $block );
    }
}
add_action( 'init', 'twentytwentyfive_child_register_blocks' );
