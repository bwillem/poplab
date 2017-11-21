//// add page buiilder button to editor tabs and open the builder on click
jQuery(document).ready(function($) {

	var editor, worker;

	var sectionWrap = 	"<div class='tool-wrap sectionWrap'></div>";
	var sectionTools = 	"<div class='tools sectionTools'>"+
			"<button class='pb_btn' data-pbtn='options'>Opt</button>"+
			"<button class='pb_btn' data-pbtn='copy'>Copy</button>"+
			"<button class='pb_btn' data-pbtn='delete'>Delete</button>"+
		"</div>";

	var rowWrap = 	"<div class='tool-wrap rowWrap'></div>";
	var rowTools = 	"<div class='tools rowTools'><button class='pb_btn' data-pbtn='rowDelete'>Delete</button><button class='pb_btn' data-pbtn='rowCopy'>Copy</button><button class='pb_btn' data-pbtn='rowEdit'>Edit</button></div>";

	var columnTools = 	"<div class='tools columnTools'><button class='pb_btn' data-pbtn='colDelete'>Delete</button><button class='pb_btn' data-pbtn='colCopy'>Copy</button><button class='pb_btn' data-pbtn='colEdit'>Edit</button></div>";

	if($('.wp-editor-tabs').length){
		$('.wp-editor-tabs').prepend('<button type="button" id="content-builder" class="wp-switch-editor switch-builder btn-primary" data-wp-editor-id="content">Page Builder</button>')
		$('body').append("<div class='pb_main'><div class='pb_editor'></div><button class='pb_add-section'>+</button><div class='pb_btn-wrap'><button class='pb_cancel'>Cancel</button><button class='pb_apply'>Apply</button><button class='pb_update'>Update</button></div></div><div class='pb_worker'></div>")
		main = $('.pb_main');
		editor = $('.pb_editor');
		worker = $('.pb_worker');
	}

	// Main PB Btns
	$(document).on('click', '#content-builder', function(){
		parseToEditor();
		main.addClass('viz');
	})
	$(document).on('click', '.pb_cancel', function(){
		main.removeClass('viz');
	})
	$(document).on('click', '.pb_apply', function(){
		parseFromEditor();
		main.removeClass('viz');
	})
	$(document).on('click', '.pb_update', function(){
		parseFromEditor();
		$('input#publish').trigger('click');
		main.removeClass('viz');
	})
	$(document).on('click', '.pb_add-section', function(){
		console.log('add section')
	})

	function parseToEditor(){

		// throw the html into a worker element because it is easier to manipulate than string content
		content = worker.empty().append($('textarea#content').val());

		// Add editor tools to the required areas
		$(content).find('section').wrap(sectionWrap);
		$(content).find('section').after(sectionTools);

		$(content).find('.row').wrap(rowWrap);
		$(content).find('.row').after(rowTools);

		$(content).find('div[class*=col-]').addClass('colWrap');
		$(content).find('div[class*=col-]').append(columnTools);

		// Add html into the visual editor
		editor.empty().append(content.html());
		setSortables();
	
	}

	function parseFromEditor(){
		content = editor;

		$(content).find('.ui-sortable').removeClass('ui-sortable');
		$(content).find('.ui-sortable-handle').removeClass('ui-sortable-handle');

		$(content).find('section').next('.sectionTools').remove();
		$(content).find('section').unwrap();

		$(content).find('.row').next('.tools').remove();
		$(content).find('.row').unwrap();

		$(content).find('div[class*=col-]').find('.tools').remove();
		$(content).find('div[class*=col-]').removeClass('colWrap');

		// $(content).find('div[class*=col-]').unwrap();


		$('textarea#content').val(String(content.html()));
	}

	function setSortables(){
		editor.sortable();
		editor.find('.sectionWrap section').sortable({connectWith: '.sectionWrap section'});
		editor.find('.rowWrap .row').sortable({connectWith: '.rowWrap .row'});
	}

	$(document).on('click', '.pb_btn', function(){
		if($(this).data('pbtn') == 'options'){
			console.log('options')
		}
		if($(this).data('pbtn') == 'copy'){
			content = $(this).closest('.tool-wrap').clone();
			$(this).closest('.tool-wrap').after(content);
		}
		if($(this).data('pbtn') == 'delete'){
			$(this).closest('.tool-wrap').remove();
		}

		if($(this).data('pbtn') == 'rowDelete'){
			$(this).closest('.tool-wrap').remove();
		}
		if($(this).data('pbtn') == 'rowCopy'){
			content = $(this).closest('.tool-wrap').clone();
			$(this).closest('.tool-wrap').after(content);
		}
		if($(this).data('pbtn') == 'rowEdit'){

		}

		if($(this).data('pbtn') == 'colDelete'){
			$(this).closest('div[class*=col-]').remove();
		}
		if($(this).data('pbtn') == 'colCopy'){
			content = $(this).closest('div[class*=col-]').clone();
			$(this).closest('div[class*=col-]').after(content);
		}
		if($(this).data('pbtn') == 'colEdit'){
			content = $(this).closest('div[class*=col-]');
		}

		setSortables();

	})

});
