(function($){
	$.fn.vcGallery = function(options){
		var setting = $.extend({
			wrapper: null,
			ele: this,
			width: "570px",
			height: "450px",
			loop : true,
			speed: 300,
			items: 1,
		},options);
		var between = function(find,from,to) {
			return (find >=from && find <= to ? true:false);
		}

		var looping = function(e){
			if (e.target != $(this)[0])
				return false;
			var self = $(this);
			var removeEle = null;
			if ($(this).hasClass("vcgOnPrev"))
			{
				removeEle = $(this).find(".vc-gallery-item:not(.removing)").last();
				var newEle = removeEle.clone().css({"margin-left":"-"+setting.width});
				removeEle.addClass("removing");
				setting.ele.prepend(newEle);
				$(this).find(".vc-gallery-item.current").removeClass("current").prev().addClass("current");
				newEle.animate({"margin-left":0},setting.speed,function(){
					removeEle.remove();
				});
			}
			else
			{
				removeEle = $(this).find(".vc-gallery-item:not(.removing)").first();
				var newEle = removeEle.clone();
				removeEle.addClass("removing");
				setting.ele.append(newEle);
				$(this).find(".vc-gallery-item.current").removeClass("current").next().addClass("current");
				removeEle.animate({"margin-left":"-"+setting.width},setting.speed,function(){
					removeEle.remove();
				});
			}
		}

		var change = function(e){
			if (e.target != $(this)[0])
				return false;
			var current = $(this).find(".vc-gallery-item.current");
			var list = $(this).find(".vc-gallery-item");

			if (list.length == setting.items)
				return false;
			if ($(this).hasClass("vcgOnPrev"))
			{
				if (current[0] == list.first()[0])
					return false;
				if (current.prev().length)
				{
					current.removeClass("current").prev().addClass("current");
					list.first().animate({"margin-left":"+="+setting.width},setting.speed);
				}
			}
			else
			{
				if (current[0] == list.last()[0])
					return false;
				if (current.next().length)
				{
					current.removeClass("current").next().addClass("current");
					list.first().animate({"margin-left":"-="+setting.width},setting.speed);
				}
			}
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
			}).bind('click',(setting.loop ? looping : change));
			setting.ele.wrap(setting.wrapper);
			return this;
		};

		return this.initialize();
	}
})(jQuery);
