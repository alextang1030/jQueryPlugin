(function($){
	$.fn.vcGallery = function(options){
		var setting = $.extend({
			ele: this,
			width: "570px",
			height: "450px",
			loop : true,
			speed: 300,
		},options);
		var between = function(find,from,to) {
			return (find >=from && find <= to ? true:false);
		}
		this.initialize = function(){
			setting.ele.addClass("vc-gallery-container");
			setting.ele.children("*").addClass("vc-gallery-item");
			setting.ele.children(".vc-gallery-item").first().addClass("current");
			if (setting.width !== null) setting.ele.css({width:setting.width});
			if (setting.height !== null) setting.ele.css({height:setting.height});

			setting.ele.bind('mousemove', function( e ){
				var ClientX = e.clientX-this.getBoundingClientRect().left;
				var ClientY = e.clientY-this.getBoundingClientRect().top;
				var prevX = 0;
				var nextX = this.offsetWidth - 40;
				var eleY = this.offsetHeight/2+20;
				if (between(ClientX,prevX,prevX+40) && between(ClientY,eleY-40,eleY))
					$(this).addClass("vcgOnPrev");
				else
					$(this).removeClass("vcgOnPrev");

				if (between(ClientX,nextX,nextX+40) && between(ClientY,eleY-40,eleY))
					$(this).addClass("vcgOnNext");
				else
					$(this).removeClass("vcgOnNext");
			}).bind('click',function(e){setting.ele.change(e);});
			return this;
		};

		this.change = function(e){
			if (e.target != this[0])
				return false;
			var current = $(this).children(".current");
			var next = null;
			if ($(this).hasClass("vcgOnPrev"))
			{
				if (current.prev().length)
				{
					next = current.prev();
				}
				else {
					if (setting.loop)
					{
						next = $(this).children(".vc-gallery-item").last();
					}
				}
			}
			if ($(this).hasClass("vcgOnNext"))
			{
				if (current.next().length)
				{
					next = current.next();
				}
				else {
					if (setting.loop)
					{
						next = $(this).children(".vc-gallery-item").first();
					}
				}

				if (next !== null)
				{
					current.fadeOut(setting.speed,function(){
						$(this).removeClass("current");
						next.fadeIn(setting.speed,function(){$(this).addClass("current")});
					});
				}
			}
		};

		return this.initialize();
	}
})(jQuery);
