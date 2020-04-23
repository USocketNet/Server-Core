<?php
/**
 * Single docs feedback suggestion template
 *
 * This template can be overridden by copying it to yourtheme/docupress/single/feedback-suggestion.php.
 *
 * @author  nK
 * @package docupress/Templates
 * @version 1.0.0
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

// phpcs:disable
$admin_email = docupress()->get_option( 'show_feedback_suggestion_email', 'docupress_single', '' ) ? : get_option( 'admin_email' );

if (
    ! docupress()->get_option( 'show_feedback_buttons', 'docupress_single', true ) ||
    ! docupress()->get_option( 'show_feedback_suggestion', 'docupress_single', false ) ||
    ! $admin_email
) {
    return;
}

$from = '';

if ( is_user_logged_in() ) {
    $user = wp_get_current_user();

    if ( $user->display_name ) {
        $from = $user->display_name;
    }

    if ( $user->user_email ) {
        $from .= ( $from ? ' <' : '' ) . $user->user_email . ( $from ? '>' : '' );
    }
}
// phpcs:enable

?>

<form class="docupress-single-feedback-suggestion" action="" method="post" style="display: none;">
    <h3><?php echo esc_html__( 'How can we improve this documentation?', 'docupress' ); ?></h3>

    <div>
        <textarea name="suggestion" placeholder="<?php echo esc_attr__( 'Your suggestions', 'docupress' ); ?>" required></textarea>

        <input name="from" type="text" value="<?php echo esc_attr( $from ); ?>" placeholder="<?php echo esc_attr__( 'Your Name or Email (Optional)', 'docupress' ); ?>">

        <button class="docupress-btn docupress-btn-md"><?php echo esc_attr__( 'Send', 'docupress' ); ?></button>

        <input type="hidden" name="id" value="<?php echo esc_attr( get_the_ID() ); ?>">
        <input type="hidden" name="action" value="docupress_suggestion">
    </div>
</form>
