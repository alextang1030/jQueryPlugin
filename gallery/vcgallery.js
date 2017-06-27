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
			}).bind('click',function(e){
				if (e.target != $(this)[0])
					return false;
				// if ($(this).hasClass("scrolling"))
				// {
				// 	return false;
				// }
				$(this).addClass("scrolling");
				var self = $(this);
				var removeEle = null;
				if ($(this).hasClass("vcgOnPrev"))
				{
					removeEle = $(this).find(".vc-gallery-item:not(.removing)").last();
					var newEle = removeEle.clone().css({width:0});
					removeEle.addClass("removing");
					setting.ele.prepend(newEle);
					newEle.animate({width:setting.width},"slow",function(){

						removeEle.animate({width:0},"slow",function(){
							$(this).remove();
						});
					});
				}
			});
			setting.ele.wrap(setting.wrapper);
			return this;
		};

		return this.initialize();
	}
})(jQuery);
