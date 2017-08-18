
(function($){
	$.vcLightbox = function(options) {
		var setting = $.extend({
			close_btn	: true,
			content : "",
			closing : null,
			backdrag_close : true,
			youtubeEmbed : false,
			youtubeUrl : "",
			width : null,
			height: null,
			afteClose: function(){},
		},options,{
			id: "vclb"+$.now(),
			ele	:	null,
			isIE : /*@cc_on!@*/false || !!document.documentMode
		});
		var AnimationEvent = function(){
			var t,
					el = document.createElement("fakeelement");

			var animations = {
				"animation"      : "animationend",
				"OAnimation"     : "oAnimationEnd",
				"MozAnimation"   : "animationend",
				"WebkitAnimation": "webkitAnimationEnd"
			}

			for (t in animations){
				if (el.style[t] !== undefined){
					return animations[t];
				}
			}
		}
		var formYoutube = function(url,w,h){
			var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
			var match = url.match(regExp);
			if (match && match[2].length == 11) {
					return '<div class="vc-lb-youtube"><iframe width="'+(w == null ? '640px' : w) +'" '+
						'height="'+(h == null ? '360px' : h) +'" '+
						'src="https://www.youtube.com/embed/'+match[2]+'" frameborder="0" allowfullscreen></iframe></div>'
			} else {
					return '<div class="vc-lb-youtube"><iframe width="'+(w == null ? '640px' : w) +'" '+
						'height="'+(h == null ? '360px' : h) +'" '+
						'src="'+url+'" frameborder="0" allowfullscreen></iframe></div>';
			}
		}
		var close = function(){
			$set = setting;
			$("#"+$set.id).addClass("closing").one(AnimationEvent(), function(event) {
				$("#"+$set.id).remove();
				$set.afteClose();
			});
		}

		this.close = function(){
			close();
		}

		this.initialize = function(){
			$set = setting;
			if ($set.youtubeEmbed && $set.youtubeUrl != "")
			{
				$set.content += formYoutube($set.youtubeUrl,$set.width,$set.height);
			}
			$set.ele = $("<div>").addClass("vc-lb-wrapper").attr("id",$set.id).attr("close-btn",$set.close_btn).append(
			  $("<div>").addClass("vc-lb-container").append(
			    $("<div>").addClass("vc-lb-body").html($set.content)
			  )
			  .bind("mousemove",function(e){
			    var ClientX = e.clientX-this.getBoundingClientRect().left;
			    var ClientY = e.clientY-this.getBoundingClientRect().top;
			    var eleX = this.offsetWidth - 30
			    var eleY = 30;
			    if (ClientX >= eleX && ClientY <= eleY)
			      $(this).addClass("onClose");
			    else
			      $(this).removeClass("onClose");
			  })
			  .bind("touchstart click",function(e){
			    if ($set.close_btn)
			    {
			      var ClientX = e.clientX-this.getBoundingClientRect().left;
			      var ClientY = e.clientY-this.getBoundingClientRect().top;
			      var eleX = this.offsetWidth - 30
			      var eleY = 30;

			      if (ClientX >= eleX && ClientY <= eleY)
			      {
							close();
			      }
			    }
			  })
			).append($("<div>").addClass("vc-lb-backdrag")
			  .bind("click",function(e){
			    if (e.target == $(this)[0] && $set.backdrag_close)
			    {
			      close();
			    }
			  })
			);
			if ($set.isIE) $set.ele.addClass("isIE");
			if ($set.width !== null) $set.ele.css({"width":$set.width});
			if ($set.height !== null) $set.ele.css({"height":$set.height});

			$("body").append($set.ele);
			return this;
		}

		return this.initialize();
	}
})(jQuery);
