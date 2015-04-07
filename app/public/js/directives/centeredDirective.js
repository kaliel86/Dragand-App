'use strict'

/**
 * @ngdoc directive
 * @name centered
 * @module daw
 *
 * @description
 * Directive center vertically content
 *
 */
daw.directive("centered", function(){

	return {
		restrict	: "ECA",
		replace 	: true,
		transclude 	: true,
		template 	: "<div class=\"ctn\">\
                        <div class=\"ctn-centered\" ng-transclude>\
                        </div>\
                    </div>"
	};

});