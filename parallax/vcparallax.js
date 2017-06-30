	(function($){
  $.fn.vcParallax = function(options){
    var setting = $.extend({
      imgSrc : null,
      speed: 10,
			positionX: "center",
			positionY: "center",
			zIndex: -1,
    },options,{
      id: "vcpa"+$.now(),
      ele: this,
			height: null,
      width: null,
			xPos: null,
      yPos: null,
      obj : null,
			img : null,
      pos: 0
    });
    var prevScoll = 0;
    this.initialize = function(){
      if (this.attr("data-image-src")) setting.imgSrc = this.attr("data-image-src");
      if (setting.width === null) setting.width = this.outerWidth();
      if (setting.height === null) setting.height = this.outerHeight();
      setting.obj = $("<div>").addClass("vc-parallax-container")
        .attr("id",setting.id)
        .append(
          $("<img>").attr("src",setting.imgSrc).addClass("vc-parallax-image")
        )
        .css({
          width:setting.width,
          height:setting.height,
          top:setting.ele.offset().top - $(window).scrollTop(),
          left:setting.ele.offset().left,
          overflow: "hidden",
          position: "fixed",
          "z-index": setting.zIndex
        });
      setting.obj.insertBefore(this);

			setting.img = setting.obj.children(".vc-parallax-image");
      setting.img.css({
        position: "absolute",
        "min-width": "100%"
      });

      prevScoll = $(window).scrollTop();
			$(document).ready(function(){
				setting.obj.css({
					top:setting.ele.offset().top - $(window).scrollTop(),
          left:setting.ele.offset().left
				});
				var tempW = setting.img.width() - setting.ele.outerWidth();
				var tempH = setting.img.height() - setting.ele.outerHeight();
				var natW = setting.img.width()/setting.ele.outerWidth()*100;
				if (setting.positionX == "center")
					setting.xPos = (tempW>0)? tempW/2*-1:0;
				else
					setting.xPos = setting.positionX;

	      if (setting.positionY === "center")
					setting.yPos = (tempH>0)? tempH/2*-1:0;
				else
					setting.yPos = setting.positionY;
				
				setting.img.css({
	        top: setting.yPos,
	        left: setting.xPos,
					width:natW+"%"
	      });
			});
      return this;
    };
    this.winScroll = function(){
			setting.obj.css({
        top: setting.ele.offset().top - $(window).scrollTop()
      });
      var newPos = setting.yPos + $(window).scrollTop();
      if ($(window).scrollTop() > 0)
      {
        var temp = Math.round($(window).scrollTop()/setting.speed);
        for(var i= 0;i < temp; i++)
        {
          newPos -= 1;
        }
      }
      setting.img.css({
        top: newPos
      });
      prevScoll = $(window).scrollTop();
    }
    this.winResize = function(){
			setting.obj.css({
        top: setting.ele.offset().top - $(window).scrollTop(),
				left: setting.ele.offset().left,
				width: setting.ele.outerWidth(),
				height: setting.ele.outerHeight(),
      });
		}
    $(window).scroll(function(){
      setting.ele.winScroll();
    });
		$(window).resize(function(){
			setting.ele.winResize();
		});
		return this.initialize();
  };
})(jQuery)
