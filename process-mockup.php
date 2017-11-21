<?php

define('WP_USE_THEMES', false);
require_once('../../../wp-load.php');

$content = $_REQUEST['content'];
$id =  sanitize_text_field($_REQUEST['id']);

$post = array(
    'ID'           => $id,
    'post_content' => $content
);

wp_update_post( $post );

echo json_encode($post);

?>