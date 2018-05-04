(function ($) {

  $(document).ready(function () {


    // **********************
    // show when everything is loaded

    // $('body').stop().animate({
    //   'opacity': 0}, 300, function () {
    //   $('body').scrollTo('#top').css({
    //     'visibility': 'visible'
    //   }).animate({
    //     'opacity': 1
    //   }, 300);
    // });

    // **********************
    // browser detection: ios mobile only

	var ua = navigator.userAgent;
	var mobile = false;
	if (/safari|ipad|iphone|ipod/i.test(ua) && /mobile/i.test(ua)) {
		if (!(/msie|Trident\/7\.|edge\/12\.|firefox|opera|chrome|android/i.test(ua))) {
			$('body').addClass('ios');
		}
	}
	if (/iemobile/i.test(ua) || /mobile/i.test(ua) || /fennec/i.test(ua) || /mobi/i.test(ua)) {
		$('body').addClass('mobile');
		mobile = true;
	}

    // **********************
    // scroll to link#id on page

    $('body').on('click.scroll', 'a', function (e) {

      var href = $(this).attr('href');
      if (href === '#carouselHead') {
      	href = '';
      }
      if (href.indexOf('#info-ed') === 0) {
      	href = '';
      }

      if(href && href.indexOf('#') === 0 && href.length > 1) {
        e.preventDefault();
        $('body').scrollTo(href, 300);
      }

    });

    // **********************
    // navbar links

    $('.nav-link').on('click', function(e) {
    	$('.navbar-toggler').click();
    });

    // **********************
    // head links

    $('.simple-head').on('click', function(e) {
        //e.preventDefault();
        var link = '#catalogue';
        $('body').scrollTo(link, 300);
    });
    $('.carousel-item-0').on('click', function(e) {
        //e.preventDefault();
        var link = '#ed001';
        $('body').scrollTo(link, 300);
    });
    $('.carousel-item-1').on('click', function(e) {
        //e.preventDefault();
        var link = '#ed001';
        $('body').scrollTo(link, 300);
    });
    $('.carousel-item-2').on('click', function(e) {
        //e.preventDefault();
        var link = '#ed002';
        $('body').scrollTo(link, 300);
    });
    $('.carousel-item-3').on('click', function(e) {
        //e.preventDefault();
        var link = '#ed003';
        $('body').scrollTo(link, 300);
    });


    // **********************
    // player

	window.soundManager.setup({
		preferFlash: false,
		url: 'audio/',
		debugMode: false,
		debugFlash: false,
		flashLoadTimeout: 0,
		waitForWindowLoad: true
	});

	var track = null;

    $('.player').on('click.player', function(e) {
    	e.preventDefault();

    	var thisPlayer = this;
	  	var smevents = {
	  		play: function() {
		    	$('.player').find('.img-player').removeClass('playing-animate');
	    		$('.player').find('.btn-player-play').show();
	    		$('.player').find('.btn-player-stop').hide();
		    	$(thisPlayer).find('.img-player').addClass('playing-animate');
	    		$(thisPlayer).find('.btn-player-play').hide();
	    		$(thisPlayer).find('.btn-player-stop').show();
	    		this.isPlaying = 1;
	  		},
	  		stop: function() {
	    		$(thisPlayer).find('.img-player').removeClass('playing-animate');
	    		$(thisPlayer).find('.btn-player-play').show();
	    		$(thisPlayer).find('.btn-player-stop').hide();
	    		this.isPlaying = 0;
	  		}
	  	};

    	var trackURL = $(this).find('a').attr('href');
    	var trackId  = $(this).find('a').attr('id');
    	// console.log('track', trackId);

		if (track && track.id == trackId && track.isPlaying == 1) {
			track.stop();
		} else {
    		window.soundManager.stopAll();
			track = soundManager.createSound({
				id: trackId,
				url: [trackURL],
				onplay: smevents.play,
				onstop: smevents.stop,
				onpause: smevents.stop,
				onresume: smevents.play,
				onfinish: smevents.stop,
				type:'mp3'
			});
			if (track) {
				track.play();
			}
		}

		return false;
    });


    // **********************
    // cat-info

    // var infoHeight = 160;
    $('a.btn-info').on('click.info', function(e) {
    	e.preventDefault();
    	var href = $(this).attr('href');
    	if(href && href.indexOf('#') === 0 && href.length > 1) {
    		if ($(href).hasClass('collapsed')) {
    			$(href).removeClass('collapsed');
	    		var h = $(href).find('.col-info-content').height();
	    		$(href).height(h + "px");
    			if ($(window).width() > 767) {
	    			$(this).text('hide');
	    			$(href).find('.col-info-fade').hide();
	    		}
    		} else {
    			if ($(window).width() < 768) {
    				$(href).height("0px");
    				if ($(this).hasClass('btn-hide')) {
    					var link = '#' + $(this).attr('href').substr(6);
				        $('body').scrollTo(link, 300);
    				}
    			} else {
					var infoHeight = $(href).parents('.row').find('.col-player').height() - 48;
    				$(href).height(infoHeight + "px");
    				$(this).text('info');
    				$(href).find('.col-info-fade').show();
    			}
    			$(href).addClass('collapsed');
    		}
    	}
    });

    var adjustInfo = function(colInfo) {
    	var colInfoHeight = $(colInfo).find('.col-info-content').height();
    	var colPlayerHeight = $(colInfo).parents('.row').find('.col-player').height();
    	if (colInfoHeight > colPlayerHeight) {
    		$(colInfo).parent().find('.col-info-more').show();
    		$(colInfo).find('.col-info-fade').show();
    		return colPlayerHeight - 48;
    	} else {
    		$(colInfo).parent().find('.col-info-more').hide();
    		$(colInfo).find('.col-info-fade').hide();
    		return colPlayerHeight;
    	}
    };
    var resizeInfo = function() {
    	if ($(window).width() < 768) {
    		$('.col-info').each(function() {
    			$(this).parent().find('.col-info-more .btn-info').text('info');
    			$(this).parent().find('.col-info-more').hide();
    			$(this).find('.col-info-fade').hide();
    			if ($(this).hasClass('collapsed') == false) {
    				$(this).addClass('collapsed');
    			}
    			$(this).height("0px");
    		});
    	} else {
    		$('.col-info').each(function() {
    			if ($(this).hasClass('collapsed') == false) {
    				$(this).addClass('collapsed');
    			}
    			var infoHeight = adjustInfo(this);
    			$(this).height(infoHeight + "px");
    		});
    	}
    };
    if (mobile) {
		// $(window).on('orientationchange', resizeInfo); // jQuery mobile
		window.addEventListener("orientationchange", resizeInfo);
    } else {
    	$(window).on('resize', resizeInfo);
    }
    resizeInfo();

    // **********************
  });

  $(window).on ('load', function () {


    // **********************
    // show when everything is loaded, also the images

    $('body').stop().animate({
      'opacity': 0}, 300, function () {
      $('body').scrollTo('#top').css({
        'visibility': 'visible'
      }).animate({
        'opacity': 1
      }, 300);
    });


    // **********************
  });

}(jQuery));
