//// add page buiilder button to editor tabs and open the builder on click
jQuery(document).ready(function($) {
	if($('.wp-editor-tabs').length){
		$('.wp-editor-tabs').prepend('<button type="button" id="content-builder" class="wp-switch-editor switch-builder btn-primary" data-wp-editor-id="content">Page Builder</button>')
	}
	$(document).on('click', '#content-builder', function(){
		$('body').append('<div class="pb_main"></div>')
	})
});