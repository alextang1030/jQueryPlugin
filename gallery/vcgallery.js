(function($){
	$.fn.vcGallery = function(options){
		var setting = $.extend({
			wrapper: null,
			ele: this,
			width: "570px",
			height: "450px",
			loop : true,
			speed: 300,
			items: 3,
		},options);
		var between = function(find,from,to) {
			return (find >=from && find <= to ? true:false);
		}
		this.initialize = function(){
			setting.wrapper = $('<div>').addClass("vc-gallery-wrapper");
			setting.ele.addClass("vc-gallery-container");
			setting.ele.children("*").addClass("vc-gallery-item");
			setting.ele.children(".vc-gallery-item").first().addClass("current");
			if (setting.width !== null)
			{
				setting.ele.children(".vc-gallery-item").css({width:setting.width});
				var wrapperW = setting.ele.children(".vc-gallery-item").outerWidth()*setting.items;
				setting.wrapper.css({width: wrapperW});
			}
			if (setting.height !== null)
			{
				setting.ele.children(".vc-gallery-item").css({height:setting.height});
				setting.ele.css({height:setting.height});
				setting.wrapper.css({height:setting.height});
			}

			setting.wrapper.bind('mousemove', function( e ){
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
			setting.ele.wrap(setting.wrapper);
			return this;
		};

		this.change = function(e){
			if (e.target != this[0])
				return false;
			var current = $(this).children(".current");
			var next = null;
			var isEnd = false;
			
		};

		return this.initialize();
	}
})(jQuery);
