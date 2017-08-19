(function($){
	$.fn.vcSilder = function(options){
		var setting = $.extend({
			width: "570px",
			height: "78.95%",
			loop : true,
			speed: 300,
			aspeed : 5000,
			animate : true,
			items: 1,
		},options,{
			wrapper: null,
			ele: this,
		});
		var between = function(find,from,to) {
			return (find >=from && find <= to ? true:false);
		}
		var timmer;
		var looping = function(ele){
			var removeEle = null;
			if (setting.loop && setting.animate)
			{
				clearTimeout(timmer);
				timmer = setTimeout(function(){animation();},setting.aspeed);
			}
			var width = ele.width();
			width = width * -1;
			if (ele.hasClass("vcgOnPrev"))
			{
				removeEle = ele.find(".vc-silder-item:not(.removing)").last();
				var newEle = removeEle.clone().css({"margin-left":width});
				removeEle.addClass("removing");
				setting.ele.prepend(newEle);
				ele.find(".vc-silder-item.current").removeClass("current").prev().addClass("current");
				newEle.animate({"margin-left":0},setting.speed,function(){
					$(this).css({"margin-left":""});
					removeEle.remove();
				});
			}
			else
			{
				removeEle = ele.find(".vc-silder-item:not(.removing)").first();
				var newEle = removeEle.clone().removeClass("current");
				removeEle.addClass("removing");
				setting.ele.append(newEle);
				ele.find(".vc-silder-item.current").removeClass("current").next().addClass("current");
				removeEle.animate({"margin-left":width},setting.speed,function(){
					removeEle.remove();
				});
			}
		}

		var animation = function() {
			var ele = setting.ele.parent(".vc-silder-wrapper");
			var width = ele.outerWidth()*-1;
			removeEle = ele.find(".vc-silder-item:not(.removing)").first();
			var newEle = removeEle.clone();
			removeEle.addClass("removing");
			setting.ele.append(newEle);
			ele.find(".vc-silder-item.current").removeClass("current").next().addClass("current");
			removeEle.animate({"margin-left":width},setting.speed,function(){
				removeEle.remove();
				timmer = setTimeout(function(){animation();},setting.aspeed);
			});
		}

		var change = function(ele){

			var current = ele.find(".vc-silder-item.current");
			var list = ele.find(".vc-silder-item");
			var width = ele.outerWidth();
			if (list.length == setting.items)
				return false;
			if (ele.hasClass("vcgOnPrev"))
			{
				if (current[0] == list.first()[0])
					return false;
				if (current.prev().length)
				{
					current.removeClass("current").prev().addClass("current");
					list.first().animate({"margin-left":"+="+width},setting.speed);
				}
			}
			else
			{
				if (current[0] == list.last()[0])
					return false;
				if (current.next().length)
				{
					current.removeClass("current").next().addClass("current");
					list.first().animate({"margin-left":"-="+width},setting.speed);
				}
			}
		}

		this.initialize = function(){
			wrapper = $('<div>').addClass("vc-silder-wrapper");
			setting.ele.addClass("vc-silder-container");
			setting.ele.children("*").addClass("vc-silder-item");
			setting.ele.children(".vc-silder-item").first().addClass("current");

			wrapper.bind('mousemove', function( e ){
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
				if (setting.loop) looping($(this)); else change($(this));
			});
			setting.ele.wrap(wrapper);
			setting.wrapper = setting.ele.parent();
			setting.wrapper.append($("<div>").addClass("vs-Silder-overlayer"));

			if (setting.width !== null)
			{
				var temp = $("<div>").css({width:setting.width});
				var wrapperW = temp.outerWidth()*setting.items;
				setting.wrapper.css({width: wrapperW});
				setting.width = setting.wrapper.outerWidth()/setting.items;
				setting.ele.children(".vc-silder-item").css({width:setting.width});
			}

			if (setting.height !== null)
			{
				setting.wrapper.children(".vs-Silder-overlayer").css({"padding-bottom":setting.height});
			}
			if (setting.loop && setting.animate)
			{
				timmer = setTimeout(function(){animation();},setting.aspeed);
			}
			return this;
		};
		this.winResize = function(){
			setting.width = setting.wrapper.outerWidth()/setting.items;
			setting.ele.children(".vc-silder-item").css({width:setting.width});
		}
		$(window).resize(function(){
			setting.ele.winResize();
		});
		return this.initialize();
	}
})(jQuery);
