jQuery(document).ready(function($){

	$('.mock-main img').on('click', function(e){
		// setup marker template
		markerHtml = "<div class='mock-marker open' style='top:"+e.offsetY+"px;left:"+e.offsetX+"px;'>"+
			"<div class='mock-marker-icon'></div>"+
			"<div class='mock-tools'><button data-opt='add'>add comment</button><button data-opt='delete'>cancel</button></div>"+
		"</div>";
		// Place a marker
		$('.mock-main .mockup-content').append(markerHtml);

	})

	$(document).on('click','.mock-tools button',function(){
		mMarker = $(this).closest('.mock-marker');
		switch($(this).data('opt')) {
		    case 'add':
		        mMarker.append('<div class="mock-comment"><textarea placeholder="Add a comment"></textarea></div>');
		        mMarker.find('.mock-tools').html("<button data-opt='save'>save</button><button data-opt='close'>close</button><button data-opt='delete'>delete</button>");
		        mMarker.find('textarea').focus();
		        break;
		    case 'delete':
		        mMarker.remove();
		        break;
	        case 'close':
	        	mMarker.removeClass('open');
	        	break;
	        case 'save':
	        	$('.mock-marker').each(function(){
	        		$(this).removeClass('open');
	        	})
	        	id = $('span.pid').data('pid');
	        	content = $('.mockup-content').html();
	        	$.ajax({
	        		url: '/wp-content/themes/poplab/process-mockup.php',
	        		type: 'POST',
	        		dataType: 'json',
	        		data: {id,content}
	        	})
	        	.done(function(data) {
	        		console.log(data);
	        	})
	        	.fail(function() {
	        		console.log("error");
	        	})
	        	.always(function() {
	        		console.log("complete");
	        	});
	        	
	        	break; 
		}
	})

	$(document).on('click','.mock-marker-icon',function(){
		$(this).closest('.mock-marker').addClass('open');
	})

	$(document).on('keyup','textarea',function(){
		$(this).text($(this)[0].value)
	})

});