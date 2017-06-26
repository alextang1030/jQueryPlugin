(function($){
	$.vcLightbox = function(options) {
		var setting = $.extend({
			id: "vclb-"+$.now(),
			close_btn	: true,
			ele	:	null,
			content : "",
			closing : null,
			backdrag_close : true,
			youtubeEmbed : false,
			youtubeUrl : "",
			width : null,
			height: null,
			animationEvent: function(){
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
			},
			getId : function(url) {
			    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
			    var match = url.match(regExp);

			    if (match && match[2].length == 11) {
			        return match[2];
			    } else {
			        return 'error';
			    }
			}
		},options);

		if (setting.youtubeEmbed && setting.youtubeUrl != "")
		{
			setting.content += '<iframe class="lb-youtube" width="'+(setting.width == null ? '640px' : setting.width) +'" '+
				'height="'+(setting.height == null ? '360px' : setting.height) +'" '+
				'src="https://www.youtube.com/embed/'+setting.getId(setting.youtubeUrl)+'" frameborder="0" allowfullscreen></iframe>'
		}
		setting.ele = $("<div>").addClass("lb-wrapper").attr("id",setting.id).attr("close-btn",setting.close_btn).append(
			$("<div>").addClass("lb-container").append(
				$("<div>").addClass("lb-body").html(setting.content)
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
				if (setting.close_btn)
				{
					var ClientX = e.clientX-this.getBoundingClientRect().left;
					var ClientY = e.clientY-this.getBoundingClientRect().top;
					var eleX = this.offsetWidth - 30
					var eleY = 30;

					if (ClientX >= eleX && ClientY <= eleY)
					{
						$("#"+setting.id).addClass("closing").one(setting.animationEvent, function(event) {
							$("#"+setting.id).remove();
						});
					}
				}
			})
		).append($("<div>").addClass("lb-backdrag")
			.bind("click",function(e){
				if (e.target == $(this)[0] && setting.backdrag_close)
				{
					$("#"+setting.id).addClass("closing").one(setting.animationEvent, function(event) {
						$("#"+setting.id).remove();
					});
				}
			})
		);

		if (setting.width !== null) setting.ele.css({"width":setting.width});
		if (setting.height !== null) setting.ele.css({"height":setting.height});

		$("body").append(setting.ele);
	}
})(jQuery);
