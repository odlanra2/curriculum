/*-----------------------------------------------------------------------------------
/*
/* Init JS
/*
-----------------------------------------------------------------------------------*/

 jQuery(document).ready(function($) {

/*----------------------------------------------------*/
/* FitText Settings
------------------------------------------------------ */

    setTimeout(function() {
	   $('h1.responsive-headline').fitText(1, { minFontSize: '40px', maxFontSize: '90px' });
	 }, 100);


/*----------------------------------------------------*/
/* Smooth Scrolling
------------------------------------------------------ */

   $('.smoothscroll').on('click',function (e) {
	    e.preventDefault();

	    var target = this.hash,
	    $target = $(target);

	    $('html, body').stop().animate({
	        'scrollTop': $target.offset().top
	    }, 800, 'swing', function () {
	        window.location.hash = target;
	    });
	});


/*----------------------------------------------------*/
/* Highlight the current section in the navigation bar
------------------------------------------------------*/

	var sections = $("section");
	var navigation_links = $("#nav-wrap a");

	sections.waypoint({

      handler: function(event, direction) {

		   var active_section;

			active_section = $(this);
			if (direction === "up") active_section = active_section.prev();

			var active_link = $('#nav-wrap a[href="#' + active_section.attr("id") + '"]');

         navigation_links.parent().removeClass("current");
			active_link.parent().addClass("current");

		},
		offset: '35%'

	});


/*----------------------------------------------------*/
/*	Make sure that #header-background-image height is
/* equal to the browser height.
------------------------------------------------------ */

   $('header').css({ 'height': $(window).height() });
   $(window).on('resize', function() {

        $('header').css({ 'height': $(window).height() });
        $('body').css({ 'width': $(window).width() })
   });


/*----------------------------------------------------*/
/*	Fade In/Out Primary Navigation
------------------------------------------------------*/

   $(window).on('scroll', function() {

		var h = $('header').height();
		var y = $(window).scrollTop();
      var nav = $('#nav-wrap');

	   if ( (y > h*.20) && (y < h) && ($(window).outerWidth() > 768 ) ) {
	      nav.fadeOut('fast');
	   }
      else {
         if (y < h*.20) {
            nav.removeClass('opaque').fadeIn('fast');
         }
         else {
            nav.addClass('opaque').fadeIn('fast');
         }
      }

	});


/*----------------------------------------------------*/
/*	Modal Popup
------------------------------------------------------*/

    $('.item-wrap a').magnificPopup({

       type:'inline',
       fixedContentPos: false,
       removalDelay: 200,
       showCloseBtn: false,
       mainClass: 'mfp-fade'

    });

    $(document).on('click', '.popup-modal-dismiss', function (e) {
    		e.preventDefault();
    		$.magnificPopup.close();
    });


/*----------------------------------------------------*/
/*	Flexslider
/*----------------------------------------------------*/
   $('.flexslider').flexslider({
      namespace: "flex-",
      controlsContainer: ".flex-container",
      animation: 'slide',
      controlNav: true,
      directionNav: false,
      smoothHeight: true,
      slideshowSpeed: 7000,
      animationSpeed: 600,
      randomize: false,
   });

/*----------------------------------------------------*/
/*	contact form
------------------------------------------------------*/

   $('form#contactForm button.submit').click(function(e) {
      e.preventDefault()   
     
      $('.error').fadeIn();
      $('.error').html('');
      var contactName = $('#contactForm #contactName').val();
      var contactEmail = $('#contactForm #contactEmail').val();
      var contactSubject = $('#contactForm #contactSubject').val();
      var contactMessage = $('#contactForm #contactMessage').val();

      if(contactName==''){
         $('#contactForm #contactName').focus().after('<span style="color:red" class="error">los campos no deben estar vacios</span>');
         $('#image-loader').fadeOut();
         setTimeout(function() {$('.error').fadeOut('fast');}, 3000);  
         return
      }

      if(contactEmail==''){
         $('#contactForm #contactEmail').focus().after('<span style="color:red" class="error">los campos no deben estar vacios</span>');
         $('#image-loader').fadeOut();
         setTimeout(function() {$('.error').fadeOut('fast');}, 3000);  
         return
      }

      if(contactSubject==''){
         $('#contactForm #contactSubject').focus().after('<span style="color:red" class="error">los campos no deben estar vacios</span>');
         $('#image-loader').fadeOut();
         setTimeout(function() {$('.error').fadeOut('fast');}, 3000);  
         return
      }

      if(contactMessage==''){
         $('#contactForm #contactMessage').focus().after('<span style="color:red" class="error">los campos no deben estar vacios</span>');
         $('#image-loader').fadeOut();
         setTimeout(function() {$('.error').fadeOut('fast');}, 3000);  
         return
      }

      var data = 'contactName=' + contactName + '&contactEmail=' + contactEmail +
               '&contactSubject=' + contactSubject + '&contactMessage=' + contactMessage;
      $('#image-loader').fadeIn();
      $('button.submit').attr('disabled','disabled');

      $.ajax({

	      type: "POST",
	      url: "https://alobranding.com/correo/",
	      data: data,
	      success: function(msg) {
            // Message was sent
            if (JSON.parse(msg) == 'OK') {
               $('button.submit').removeAttr('disabled');
               $('#image-loader').fadeOut();
               $("form")[0].reset();
               $('#message-warning').html('Se envio el correo correctamente');
	            $('#message-warning').fadeIn();
               setTimeout(function() {$('#message-warning').fadeOut('fast');}, 3000);  
            }
            // There was an error
            else {
               $('button.submit').removeAttr('disabled');
               $('#image-loader').fadeOut();
               //$("form")[0].reset();
               $('#message-warning').html('Ocurrio un error');
	            $('#message-warning').fadeIn();
               setTimeout(function() {$('#message-warning').fadeOut('fast');}, 3000);  
            }

	      }

      });
      return false;
   });


});








