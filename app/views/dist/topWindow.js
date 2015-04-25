(function(module) {
try {
  module = angular.module('daw');
} catch (e) {
  module = angular.module('daw', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('views/topWindow.html',
    '<div id="top-window" ng-controller="topWindowController">\n' +
    '    <div ng-class="::{\'windowsVersion\' : platform == \'win\'}">\n' +
    '\n' +
    '        <!-- BTN for manipulate size of the app Mac version-->\n' +
    '        <ul id="buttons" ng-if="::platform == \'darwin\'">\n' +
    '            <li id="close-btn" ng-click="appWindow.close()" title="{{ \'MENU.TOP.CLOSE\' | translate }}">\n' +
    '                <span>&times;</span>\n' +
    '            </li><!--\n' +
    '			--><li id="minimize-btn" ng-click="appWindow.minimize()" title="{{ \'MENU.TOP.MINIMIZE\' | translate }}">\n' +
    '                <span>&ndash;</span>\n' +
    '            </li><!--\n' +
    '		--><li id="zoom-btn" ng-click="appWindow.zoom()" title="{{ \'MENU.TOP.MAXIMIZE\' | translate }}">\n' +
    '                <span>+</span>\n' +
    '            </li>\n' +
    '        </ul>\n' +
    '\n' +
    '        <!-- BTN for manipulate size of the app Windows version-->\n' +
    '        <ul id="buttons" ng-if="::platform == \'win\'">\n' +
    '            <li id="minimize-btn" ng-click="appWindow.minimize()" title="{{ \'MENU.TOP.MINIMIZE\' | translate }}">\n' +
    '                <span>&ndash;</span>\n' +
    '            </li><!-- \n' +
    '         --><li id="zoom-btn" ng-click="appWindow.zoom()" title="{{ \'MENU.TOP.MAXIMIZE\' | translate }}">\n' +
    '                <span>+</span>\n' +
    '            </li><!-- \n' +
    '         --><li id="close-btn" ng-click="appWindow.close()" title="{{ \'MENU.TOP.CLOSE\' | translate }}">\n' +
    '                <span>&times;</span>\n' +
    '            </li>\n' +
    '        </ul>\n' +
    '\n' +
    '        <!-- APP Name -->\n' +
    '        <h1>{{ "COMMON.NAME_APP" | translate }}</h1>\n' +
    '\n' +
    '        <!-- UPDATE ICON -->\n' +
    '        <!-- TODO Test it -->\n' +
    '        <div id="update" ng-click="update()" ng-class="{\'available\' : newVersionAvailable}">\n' +
    '            <div class="icon-update"></div>\n' +
    '            <div id="update-indicator"></div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</div>\n' +
    '');
}]);
})();
