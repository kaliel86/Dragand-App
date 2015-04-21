(function(module) {
try {
  module = angular.module('daw');
} catch (e) {
  module = angular.module('daw', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('views/bottomWindow.html',
    '<ul id="bottom-window">\n' +
    '	<li\n' +
    '		ng-class="{\'icon-trash\' : currentState === \'home\', \'icon-home\': currentState !== \'home\'}"\n' +
    '		ng-click="homeOrTrash()"></li><!--\n' +
    '	--><li\n' +
    '		class="icon-cog"\n' +
    '		ui-sref="settings"\n' +
    '		ui-sref-active="active"\n' +
    '		title="{{ \'MENU.BOTTOM.SETTINGS\' | translate }}"></li><!--\n' +
    '	--><li\n' +
    '		class="icon-info"\n' +
    '		ui-sref="information"\n' +
    '		ui-sref-active="active"\n' +
    '		title="{{ \'MENU.BOTTOM.INFORMATION\' | translate }}"></li>\n' +
    '</ul>');
}]);
})();
