jQuery(document).ready(function($) {
 // 	var animTimer = 1000
	// $('body').on('click', 'a', function(e){
	// 	e.preventDefault()
	// 	var href = $(this).attr('href');
	// 	$(".scene-element").removeClass('page-transition--1');
	// 	setTimeout(function(){
	// 		$(".scene-element").addClass('page-transition--1');
	// 	},1)
	// 	$('.m-scene').addClass('is-exiting')
	// 	setTimeout(function(){
	// 		window.location.assign(href)
	// 	},animTimer)
	// })
	var siteURL = ""
	var winW = $(window).width();
	var winH = $(window).height();
	var popCache = {};
	$(window).on('resize', function(){
		winW = $(window).width();
		winH = $(window).height();
	})
	$('.pop_main').append('<div class="loadBar"></div>')
	var toolHide = false;
	var adminbar = $('#wpadminbar').html();
	$('body').on('click','.tool-bar-hider', function(e) {
		if(toolHide == false){
			$('#wpadminbar').css('display','none');
			$('html').css({'position':'relative','top':'-32px !important'});
			toolHide = true;
		}else{
			$('#wpadminbar').css('display','block');
			$('html').css('top','0px !important');
			toolHide = false;
		}
	});
	menuOpen = false;
	$('.menu-btn').on('click', function(e){
		var isContactOpen = $('.contact-box').css('opacity');
		e.preventDefault();
		if(menuOpen == false){
			$(this).addClass('open');
			$('.pop_menu').addClass('menu-open');
			$('.pop_main').addClass('blur-md');
			$('.header-logo').addClass('blueify');
			$('header').removeClass('scrolled')
			menuOpen = true;
		}else if(isContactOpen != '1') {
			$(this).removeClass('open');
			// $('.logo-cont').find('img').css('margin-left','0px');
			$('.pop_menu').removeClass('menu-open');
			$('.pop_main').removeClass('blur-md');
			$('.header-logo').removeClass('blueify');
			if (scrollPos > winH - 100){
				$('header').addClass('scrolled')
			}
			menuOpen = false;
		}
		else{
			$('.contact-box').removeClass('anim');
			$('.header-logo').addClass('blueify');
		}
	})
	var scrollPos = $('.pop_main').scrollTop();
	$('.pop_main').on('scroll',function(){
		scrollPos = $('.pop_main').scrollTop();
		if (scrollPos > winH/2){
			// console.log('scrolled');
			$('header').addClass('scrolled')
		}else{
			$('header').removeClass('scrolled')
		}
	});
	$('body').on('click','.subpage .scroll-prompt',function(){
		$('.pop_main').animate({
        	scrollTop: winH
        })
	})
	// var lastScrollTop = $(window).scrollTop();
 //    $(window).scroll(function(event){
 //      var st = $(this).scrollTop();
 //      if (st > lastScrollTop){
 //          $('.header-logo').css({'height':'45px', 'margin-top': '50px'});
 //          $('.headwrapper').css('top', '-45px');
 //      } else {
 //          console.log('scr up')
 //          $('.header-logo').css({'height':'80px', 'margin-top': '10px'});
 //          $('.headwrapper').css('top', '0px');
 //      }
 //      lastScrollTop = st;
 //    });
///////////////////////////////////////////////////////////////////////////
//////////////////////////// PAGES ////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
    var content = $('.content');
    var loadB = 1
	$.ajax({
		url: siteURL+"/wp-json/wp/v2/pages/",
		method: "GET",
		dataType: "json"
	}).done(function(Res){
		 // console.log(Res);
		var list = [];
		if(Res.length){
			var leng = Res.length
			//$('.menu').remove();
			var loadingBar = loadB/leng
			
			$.each(Res, function(i,Res){
				loadingBar = loadB/leng
				$('.loadBar').css('width', loadingBar*100+"vw");
				// console.log(Res.slug)
				var slug = Res.slug
				$('a:not(.page-link)').each(function(){
					if($(this).attr('href') != undefined && $(this).attr('href').indexOf(slug) > -1 ){
						$(this).attr('data-id', Res.id).addClass('page-link');
					}
				})
				if(loadingBar = 1){
					setTimeout(function(){
						$('.loadBar').css('opacity', 0);
						$('.pop_main').removeClass('no-scroll');
					}, 500);
				}
				loadB ++
				popCache[Res.id] = Res

			})

		}
	}).fail(function(err){
		// console.log(err)
	});
	var addServices = function(Res, linkID){

					$('.pop_services').append('<div class="service col-md-4 page-'+linkID+'" >'+Res.content.rendered+'</div>')
					$('.pop_services').find('.service:nth-child(1)').animate({'margin-top':'0', 'opacity':'1' },1200)
					$('.pop_services').find('.service:nth-child(2)').delay(100).animate({'margin-top':'0', 'opacity':'1' }, 1200)
					$('.pop_services').find('.service:nth-child(3)').delay(200).animate({'margin-top':'0', 'opacity':'1' }, 1200)
				}
	var addContent = function(Res, linkID){
		//console.log(r.id)
		var html =
				"<p class='page-id' data-page-id='"+Res.id+"'>"+Res.content.rendered+"</p>"
				if(content.hasClass('fadeOutUp')){
					history.pushState(linkID, null, '/' + Res.slug);
					content.empty().append(html).removeClass('fadeOutUp').addClass('fadeInUp');
				}else if(content.hasClass('fadeOutDown')){
					content.empty().append(html).removeClass('fadeOutDown').addClass('fadeInDown');
				}
				pageChange();
				popCache[Res.id] =  Res
				//console.log(popCache)
	}
	var pageLoadIn = function(){
		$('.pop_main').scrollTop(0);
		content.removeClass('fadeInUp').removeClass('fadeInDown').addClass('fadeOutUp');
		// window.setTimeout(function(){
		// 	content.addClass('fadeOutUp');
		// },300)
	};
	var pageLoadOut = function(){
		$('.pop_main').scrollTop(0);
		content.removeClass('fadeInUp').removeClass('fadeInDown').addClass('fadeOutDown').scrollTop(0);
		// window.setTimeout(function(){
		// 	content.addClass('fadeOutDown');
		// },300)
	};
	var getPage = function(linkID,animateOut){
		if(animateOut != null){
			if(popCache[linkID]  != null){
				//console.log(popCache[linkID])
				animateOut()
				//console.log('from cache')
				if(menuOpen == true){
					$('.menu-btn').trigger('click');
				}
				setTimeout(function(){
					addContent(popCache[linkID], linkID);
				},500);
			}else{
				$.ajax({
					url: siteURL+"/wp-json/wp/v2/pages/"+linkID,
					method: "GET",
					beforeSend: function(){
						if(menuOpen == true){
							$('.menu-btn').trigger('click');
						}
						animateOut();
					}
				}).done(function(Res){
					addContent(Res, linkID);
				})
			}
		}else{
			if(popCache[linkID]  != null){
				addServices (popCache[linkID], linkID);
			}
		}
	};
	var conOpen=false
	$('.btn-contact').on('click', function(){		
		$('.contact-box').addClass('anim');
		setTimeout(function(){
			$('input#name').focus();
		},400);
		$('.header-logo').removeClass('blueify');
		conOpen= true
	})
	// if(conOpen = true){
	// 	$(window).on('click', function(e){
	// 		//console.log(e.target.className)
	// 		if(e.target.className != 'contact-box anim'){
	// 			$('.contact-box').removeClass('anim');
	// 		}
	// 	})
	// 	conOpen = false;
	// }


	$(document).on('click','.page-link', function(e){
		e.preventDefault();
		var elem = $(this);
		var linkID = elem.data('id');
		getPage(linkID,pageLoadIn);
	})
	var landing = $('.pid').data('pid');
	window.addEventListener('popstate', function(e){
		var previous = e.state;
		if (previous != null) {
		getPage(previous,pageLoadOut);
		}else{
			previous = landing;
			getPage(previous,pageLoadOut)
		}	
		
	})
	////////////////////////////////////////////////////////////////////////////////////////////////////////
	var pageChange = function(){//////////////////// PAGECHANGE EVENT  /////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////
		// console.log(popCache);
		$.each(popCache, function(index, Res) {
			var slug =  Res.slug
			// console.log(slug)
			$('a:not(.page-link)').each(function(){
				if($(this).attr('href') != undefined && $(this).attr('href').indexOf(slug) > -1 ){
					$(this).attr('data-id', Res.id).addClass('page-link');
				}
			})
		});
		

		////////////////////////////////////////////////////////////////////////////////////////////////
		if(winW >= 992){////////////////////  DESKTOP SCRIPTS   ////////////////////////////////////
		////////////////////////////////////////////////////////////////////////////////////////////////

			
			

		}//close Desktop stuff
	}//close page change stuff

	///////////////// Custom link handler ////////////////
	$(document).ajaxComplete(function(){

		pageChange();
	})
	$('#menu-menu-1').prepend('<li><a class="page-link" data-id="6" href="http://www.devantidigital.com"><img class="img-center img-responsive menu-logo" src="/wp-content/themes/poplab/images/devantidigital.png"></a></li>');
	


	/////////////// Resume Page Scripts///////////////////////////////
	$(document).on('click','.res-menu a[href*="#"]', function(e){
		e.preventDefault();
		var target = $(this).attr('href');
	    var targetOffset = $(target).offset().top
	    $('.pop_main').clearQueue().animate({
	        scrollTop: targetOffset+scrollPos
	    }, 600);
	})


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////// FORM HANDLER ///////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// process the form
	$('#submit').before('<div class="checkbox"><input class="popVal" id="popVal" name="popVal" type="checkbox" value=""><label><span class="customCheckBox"></span>Prove you\'re human</label></div>');
	$('form').submit(function(e) {
		if($('.popVal').is(':checked')){
			$('.popVal').val('v4ahb988hg');
		}else{
			$('.popVal').val('nv44a99d');
		}

	    // get the form data
	    // there are many ways to get this data using jQuery (you can use the class or id also)
	    var formData = {
	        'name'              : $('input[name=name]').val(),
	        'email'             : $('input[name=email]').val(),
	        'message'           : $('textarea[name=message]').val(),
	        'popVal'            : $('input[name=popVal]').val(),
	        'feedMe'            : $('input[name=feedMe]').val()
	    };
	    $.ajax({
	        type        : 'POST',
	        url         : '/wp-content/themes/poplab/process.php',
	        data        : formData,
	        dataType    : 'json',
	        encode      : true,
	        beforeSend  :function(){
	        	$('.err-msg').fadeOut(200);
	    		setTimeout(function(){
	    			$('.err-msg').remove();
	    		},200);

	        	$('#submit').after('<i class="fa fa-spin fa-spinner"></i>');
	        }
	    })
	    .done(function(data) {
	    	if(data.success){
	    		$('.fa-spinner').remove();
	    		$('form').addClass('fadeOut');
	    		setTimeout(function(){
	    			$('form').remove();
	    		},400)
	    		$('.contact-box').append('<h3 style="color:white;" class="text-center ty-msg">You\'re one smart cookie!</h3>');
	    	}else{
	    		var err = data.errors
				for(var key in err) {
					$('.fa-spinner').remove();
				    $('#'+key).after('<span class="err-msg">*'+err[key]+'</span>');
				}
	    	}
	    });
	    e.preventDefault();
	});
});