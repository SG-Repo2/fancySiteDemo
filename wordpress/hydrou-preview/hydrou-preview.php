<?php
/**
 * Plugin Name: HydroU Preview
 * Description: Adds a body-only Hydro University page template that uses the active WordPress theme header and footer.
 * Version: 1.0.2
 * Author: Hydro, Inc.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'HYDROU_PREVIEW_VERSION', '1.0.2' );
define( 'HYDROU_PREVIEW_PATH', plugin_dir_path( __FILE__ ) );
define( 'HYDROU_PREVIEW_URL', plugin_dir_url( __FILE__ ) );
define( 'HYDROU_PREVIEW_TEMPLATE', 'hydrou-new.php' );

/**
 * Register the selectable HydroU page template.
 *
 * @param array<string, string> $templates Available page templates.
 * @return array<string, string>
 */
function hydrou_preview_register_template( $templates ) {
	$templates[ HYDROU_PREVIEW_TEMPLATE ] = 'HydroU New';
	return $templates;
}
add_filter( 'theme_page_templates', 'hydrou_preview_register_template' );

/**
 * Use the plugin-owned template when it is selected for a page.
 *
 * @param string $template Resolved theme template path.
 * @return string
 */
function hydrou_preview_select_template( $template ) {
	if ( is_singular( 'page' ) && HYDROU_PREVIEW_TEMPLATE === get_page_template_slug( get_queried_object_id() ) ) {
		return HYDROU_PREVIEW_PATH . 'templates/hydrou-new.php';
	}

	return $template;
}
add_filter( 'template_include', 'hydrou_preview_select_template' );

/**
 * Load HydroU assets only on pages using the HydroU template.
 */
function hydrou_preview_enqueue_assets() {
	if ( ! is_page_template( HYDROU_PREVIEW_TEMPLATE ) ) {
		return;
	}

	$style_path = HYDROU_PREVIEW_PATH . 'assets/hydrou.css';
	$script_path = HYDROU_PREVIEW_PATH . 'assets/hydrou.js';

	wp_enqueue_style(
		'hydrou-preview',
		HYDROU_PREVIEW_URL . 'assets/hydrou.css',
		array(),
		file_exists( $style_path ) ? (string) filemtime( $style_path ) : HYDROU_PREVIEW_VERSION
	);

	wp_enqueue_script(
		'hydrou-gsap',
		'https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js',
		array(),
		'3.12.5',
		true
	);

	wp_enqueue_script(
		'hydrou-scroll-trigger',
		'https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js',
		array( 'hydrou-gsap' ),
		'3.12.5',
		true
	);

	wp_enqueue_script(
		'hydrou-lenis',
		'https://cdn.jsdelivr.net/npm/lenis@1/dist/lenis.min.js',
		array(),
		'1',
		true
	);

	wp_enqueue_script(
		'hydrou-preview',
		HYDROU_PREVIEW_URL . 'assets/hydrou.js',
		array( 'hydrou-scroll-trigger', 'hydrou-lenis' ),
		file_exists( $script_path ) ? (string) filemtime( $script_path ) : HYDROU_PREVIEW_VERSION,
		true
	);
}
add_action( 'wp_enqueue_scripts', 'hydrou_preview_enqueue_assets' );
