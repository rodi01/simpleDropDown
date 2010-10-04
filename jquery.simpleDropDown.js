/* --
http://github.com/rodi01/simpleDropDown
Simple Tabs for jQuery.
Written by Rodrigo Soares (oncemade{at}gmail.com) Oct. 2010.
jQuery Plugin Framework by Keith Wood (http://keith-wood.name/pluginFramework.html)

Dual licensed under the GPL (http://dev.jquery.com/browser/trunk/jquery/GPL-LICENSE.txt) and
MIT (http://dev.jquery.com/browser/trunk/jquery/MIT-LICENSE.txt) licenses.
Please attribute the author if you use it.
-- */

;(function($) {
var PROP_NAME = 'simpleDropDown',
	getters = ['settings'];

function SimpleDropDown() {
	this._defaults = {
		on: 'mouseenter',
		openedClass: 'opened',
		selectTarget: 'h5',
		replaceElem: '.replace',
		onSelect: function(element){}
	};
}

$.fn.simpleDropDown = function(options) {
	var otherArgs = Array.prototype.slice.call(arguments, 1);
	if ($.inArray(options, getters) > -1) { 
		return $.simpleDropDown['_' + options + 'SimpleDropDown']. 
		apply($.simpleDropDown, [this[0]].concat(otherArgs)); 
	} 
	return this.each(function() { 
		if (typeof options == 'string') { 
			$.simpleDropDown['_' + options + 'SimpleDropDown']. 
			apply($.simpleDropDown, [this].concat(otherArgs)); 
		} 
		else { 
			$.simpleDropDown._attachSimpleDropDown(this, options || {});
		} 
	});
};

$.extend(SimpleDropDown.prototype, {
	setDefaults: function(settings) {
		$.extend(this._defaults, settings || {});
		return this;
	},
	_attachSimpleDropDown: function(target, settings){
		target = $(target);
		var inst = {settings: $.extend({}, this._defaults)};
		$.data(target[0], PROP_NAME, inst);
		this._changeSimpleDropDown(target, settings);
	},

	_changeSimpleDropDown: function(target, settings, value) {
		target = $(target);
		settings = settings || {}; 
		if (typeof settings == 'string') { 
			var name = settings; 
			settings = {};
			settings[name] = value;
		} 
		var inst = target.data(PROP_NAME);
		$.extend(inst.settings, settings);
		this._simpleDropDown(target); 
	},

	_simpleDropDown: function(target){
		var inst = target.data(PROP_NAME),
				selectTarget = inst.settings.on === 'mouseenter' ? target : target.find(inst.settings.selectTarget);
		target.addClass('simpleDropDown');
		
		selectTarget.bind(inst.settings.on, function() {
			target.toggleClass(inst.settings.openedClass);
			return false;
		});
		
		if (inst.settings.on === 'mouseenter') {
			target.mouseleave(function(){
				target.removeClass(inst.settings.openedClass);
			});
		}else{
			$(document).mouseup(function(obj) {
				 if ($(obj.target).parents('.simpleDropDown').length == 0 && target.hasClass(inst.settings.openedClass)) {
             selectTarget.trigger('click');
          }
			});
		}
			target.find('li').click(function() {
				var $this = $(this);
				target.find(inst.settings.replaceElem).html($this.html());
				selectTarget.trigger(inst.settings.on);
				inst.settings.onSelect($this);
				return false;
			});
			
	},
	
	_settingsSimpleDropDown: function(target) {
		var inst = $.data(target, PROP_NAME);
		return inst.settings;
	}
});

$.simpleDropDown = new SimpleDropDown();

})(jQuery);