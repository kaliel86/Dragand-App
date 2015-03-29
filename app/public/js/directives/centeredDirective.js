'use strict'
daw.directive("centered", function() {
	return {
		restrict : "ECA",
		replace : true,
		transclude : true,
		template : "<div class=\"ctn\">\
                        <div class=\"ctn-centered\" ng-transclude>\
                        </div>\
                    </div>"
	};
});