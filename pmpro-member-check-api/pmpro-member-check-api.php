<?php
/*
Plugin Name: PMPro Member Check API
Plugin URI: https://www.paidmembershipspro.com/add-ons/member-check-api/
Description: Adds Admin AJAX URL to check the membership level of an email address.
Version: .1
Author: Stranger Studios
Author URI: http://www.strangerstudios.com
*/

/*
  To use: navigate to '/wp-admin/admin-ajax.php?action=member_check&key={secret_key}&email={email@domain.com}'
  The API will return 0 for non-members and the level ID of members.
*/

/**
 * Check if an email address is for a member on the site.
 */
function pmpro_wp_ajax_member_check() {
	$secret_key = 'seyYZdN8Mg4BzCks';    //change this for added security

	if( !function_exists( 'pmpro_getMembershipLevelForUser' ) ) {
		die( 'PMPro must be active on this site.' );
	}

	if( $_REQUEST['key'] != $secret_key ) {
		die( 'Invalid key.' );
	}

	if( empty( $_REQUEST['email'] ) ) {
		die( 'Please pass an email parameter to check.' );
	}

	$email = $_REQUEST['email'];

	$user = get_user_by( 'email', $email );

	if( !empty( $user ) && !empty( $user->ID ) ) {
		$level = pmpro_getMembershipLevelForUser( $user->ID );
	}

	if( !empty( $level ) && !empty( $level->id ) ) {
		echo $level->ID;
	} else {
		echo '0';
	}

	exit;
}
add_action('wp_ajax_nopriv_member_check', 'pmpro_wp_ajax_member_check');
add_action('wp_ajax_member_check', 'pmpro_wp_ajax_member_check');
