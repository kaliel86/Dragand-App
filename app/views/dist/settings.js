(function(module) {
try {
  module = angular.module('daw');
} catch (e) {
  module = angular.module('daw', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('views/settings.html',
    '<div id="middle-container" ng-controller="settingsController">\n' +
    '	<ul id="list" class="fadeInUp">\n' +
    '		<!-- AUTOPLAY -->\n' +
    '		<li class="settings-el item-stag-anim">\n' +
    '			<p title="Play video when sub is founded">{{ "SETTINGS.AUTOPLAY" | translate }}</p>\n' +
    '			<div class="switchCtn">\n' +
    '				<input ng-checked="autoplay" type="checkbox" id="playSwitch" name="playSwitch" class="switch" ng-model="autoplay"/>\n' +
    '				<label for="playSwitch">&nbsp;</label>\n' +
    '			</div>\n' +
    '		</li>\n' +
    '		<!-- NOTIFICATION -->\n' +
    '		<li class="settings-el item-stag-anim">\n' +
    '			<p title="Play video when sub is founded">{{ "SETTINGS.NOTIFICATION" | translate }}</p>\n' +
    '			<div class="switchCtn">\n' +
    '				<input ng-checked="notification" type="checkbox" id="notificationSwitch" name="notificationSwitch" class="switch" ng-model="notification"/>\n' +
    '				<label for="notificationSwitch">&nbsp;</label>\n' +
    '			</div>\n' +
    '		</li>\n' +
    '		<!-- POPCORN TIME -->\n' +
    '		<li class="settings-el item-stag-anim">\n' +
    '			<p title="Play video when sub is founded">Popcorn Time</p>\n' +
    '			<div class="switchCtn">\n' +
    '				<input ng-checked="popcorntime" type="checkbox" id="popcornSwitch" name="popcornSwitch" class="switch" ng-model="popcorntime"/>\n' +
    '				<label for="popcornSwitch">&nbsp;</label>\n' +
    '			</div>\n' +
    '		</li>\n' +
    '		<!-- APP LANGUAGES -->\n' +
    '		<li class="settings-el item-stag-anim">\n' +
    '			<p title="Your favorite subtitle language">{{ "SETTINGS.LANGUAGES_APP" | translate }}</p>\n' +
    '			<div class="dropdown">\n' +
    '				<select name="subLanguage" id="appLanguage" ng-model="appLanguage" ng-change="updateAppLanguage()">\n' +
    '					<option ng-repeat="(key, value) in allAppLanguage" value="{{key}}" ng-selected="appLanguage == key">{{value | capitalize}}</option>\n' +
    '				</select>\n' +
    '			</div>\n' +
    '		</li>\n' +
    '		<!-- SUB LANGUAGES -->\n' +
    '		<li class="settings-el item-stag-anim">\n' +
    '			<p title="Your favorite subtitle language">{{ "SETTINGS.LANGUAGES" | translate }}</p>\n' +
    '			<div class="dropdown">\n' +
    '				<select name="subLanguage" id="subLanguage" ng-model="language" ng-change="updateLanguage()">\n' +
    '					<option ng-repeat="(key, value) in countryCode" value="{{value}}" ng-selected="language == value">{{key | capitalize}}</option>\n' +
    '				</select>\n' +
    '			</div>\n' +
    '		</li>\n' +
    '	</ul>\n' +
    '</div>');
}]);
})();
