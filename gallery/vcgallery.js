(function($){
	$.fn.vcGallery = function(options){
		var setting = $.extend({
			ele: this,
		},options);

		this.initialize = function(){
			console.log(setting);
		}
	}
})(jQuery);
