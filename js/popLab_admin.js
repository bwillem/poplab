jQuery(document).ready(function($) {

	$(document).on('click','.pl_tpl', function(e){
		e.preventDefault();
		var tpl = $(this).data('tpl');
		$.ajax({
			url: "/wp-content/themes/poplab/popLabBuilder/templates/"+tpl+'.tpl',
			method: "GET",
			cache: false
		}).done(function(Res){
			console.log(Res)
			$('textarea#content').insertAtCaret(Res);
		});

	});
	var build = '';
	var category = '';
	$(document).on('click', '.pl_build',function(e){
		e.preventDefault();
		 build = $(this).data('build');
		 category = $(this).data('category');
		$.ajax({
			url: "/wp-content/themes/poplab/popLabBuilder/templates/"+build+'.php',
			method: "GET",
			cache: false
		}).done(function(Res){
			if($('.plb_builder_wrap').length < 1){
				$('div#wpwrap').prepend('<div class="plb_builder_wrap" data-category="'+category+'" data-build="'+build+'"><div class="plb_close">X</div><div class="plb_builder_container">'+Res+'</div></div>');
				$('.plb_builder_wrap').addClass('viz');
			}
		});
		
	});
	$(document).on('click','.plb_close', function(){
		$.ajax({
			url: "/wp-content/themes/poplab/popLabBuilder/popLab_builder_display.php",
			method: "GET",
			cache: false
		}).done(function(Res){
				$('div#popLab_builder .inside').html(Res);
		});
		$('.plb_builder_wrap').fadeOut('600', function() {
			$('.plb_builder_wrap').remove();
		});
	})
	$(document).on('click','.pl_build_btn a',function(){
		var tpl = $(this).closest('.pl_build_btn').data('tpl');
		var title = $(this).closest('.pl_build_btn').data('title');
		switch ($(this).attr('rel')){
			case 'add':
				$.ajax({
					url: "/wp-content/themes/poplab/popLabBuilder/templates/"+tpl+'.tpl',
					method: "GET",
					cache: false
				}).done(function(Res){
					$('textarea.plb_content').insertAtCaret(Res);
					var content = $('textarea.plb_content').val()
					$('.display').html(content);
				});
			break;
			case 'edit':
				$.ajax({
					url: "/wp-content/themes/poplab/popLabBuilder/templates/"+tpl+'.tpl',
					method: "GET",
					cache: false
				}).done(function(Res){
					$('textarea.plb_content').val(Res);
					$('.plb_builder_wrap input#title').val(title).prop('disabled', true);;
					var content = $('textarea.plb_content').val();
					$('.display').html(content);

				});
			break;
			case 'delete':
				var Data = {
			        'delete' : 'true',
			        'title'  :title
			    };
				$.ajax({
					type        : 'POST',
			        url         : '/wp-content/themes/poplab/popLabBuilder/templates/'+build.replace('-display','')+'.php',
			        data        : Data,
			        dataType    : 'json',
			        encode      : true
			    }).done(function(data){
			    	if(data.success){
			    		$.ajax({
							url: "/wp-content/themes/poplab/popLabBuilder/templates/"+build+'.php',
							method: "GET",
							cache: false
						}).done(function(Res){
								$('.plb_builder_wrap').html('<div class="plb_close">X</div><div class="plb_builder_container">'+Res+'</div>');
						});
			    	}
			    })
			break;
		}

	})
	$(document).on('keyup','.plb_content',function(){
		var content = $(this).val()
		$('.display').html(content)
	})
	$(document).on('submit','form.plb_form',function(e) {
		var cat = $('.plb_builder_wrap').data('category');
		var bld = $('.plb_builder_wrap').data('build').replace('-display','');
		e.preventDefault();
		var formData = {
	        'title'              : $('input[name=title]').val(),
	        'content'            : $('textarea[name=content]').val()
	    };
		$.ajax({
	        type        : 'POST',
	        url         : '/wp-content/themes/poplab/popLabBuilder/templates/'+bld+'.php',
	        data        : formData,
	        dataType    : 'json',
	        encode      : true,
	        beforeSend  :function(){
    			$('.err-msg').remove();	
	        }
	    }).done(function(data) {
	    	if(data.success){
	    		$.ajax({
					url: "/wp-content/themes/poplab/popLabBuilder/templates/"+build+'.php',
					method: "GET",
					cache: false
				}).done(function(Res){
						$('.plb_builder_wrap').html('<div class="plb_close">X</div><div class="plb_builder_container">'+Res+'</div>');
				});
	    	}else{
	    		var err = data.errors
				for(var key in err) {
					console.log(data)
				    $('#'+key).after('<span class="err-msg">*'+err[key]+'</span>');
				}
	    	}
	    })
	});

});
















////////////////////////////////////////////////////////////////////////////////
///////////////////////// Insert at cursor function ////////////////////////////
////////////////////////////////////////////////////////////////////////////////
jQuery.fn.extend({
	insertAtCaret: function(myValue){
	  return this.each(function(i) {
	    if (document.selection) {
	      //For browsers like Internet Explorer
	      this.focus();
	      sel = document.selection.createRange();
	      sel.text = myValue;
	      this.focus();
	    }
	    else if (this.selectionStart || this.selectionStart == '0') {
	      //For browsers like Firefox and Webkit based
	      var startPos = this.selectionStart;
	      var endPos = this.selectionEnd;
	      var scrollTop = this.scrollTop;
	      this.value = this.value.substring(0, startPos)+myValue+this.value.substring(endPos,this.value.length);
	      this.focus();
	      this.selectionStart = startPos + myValue.length;
	      this.selectionEnd = startPos + myValue.length;
	      this.scrollTop = scrollTop;
	    } else {
	      this.value += myValue;
	      this.focus();
	    }
	  })
	}
});