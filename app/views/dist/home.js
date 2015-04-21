(function(module) {
try {
  module = angular.module('daw');
} catch (e) {
  module = angular.module('daw', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('views/home.html',
    '<div id="middle-container" ng-controller="DragController">\n' +
    '\n' +
    '	<!-- DROP ZONE -->\n' +
    '	<div id="drop" class="fadeIn" ng-show="view === \'drop\'" droppable>\n' +
    '		<centered>\n' +
    '			<div class="dropZone"></div>\n' +
    '			<svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="dropIcon" x="0px" y="0px" width="66.5px" height="71px" viewBox="18 0 66.5 71" enable-background="new 18 0 66.5 71" xml:space="preserve">\n' +
    '				<path id="arrow" d="M65.975 32.197L53.389 44.874c-0.333 0.335-0.748 0.597-1.215 0.739 -0.096 0.03-0.192 0.053-0.289 0.075 -0.185 0.037-0.385 0.06-0.592 0.06 -0.496 0-0.963-0.119-1.371-0.344 -0.089-0.044-0.17-0.097-0.252-0.149 -0.082-0.052-0.163-0.112-0.245-0.179 -0.082-0.06-0.155-0.127-0.222-0.202L36.619 32.198c-1.156-1.165-1.156-3.061 0-4.225 1.163-1.165 3.037-1.165 4.192 0l7.519 7.585V4.097c0-1.65 1.333-2.986 2.963-2.986 1.637 0 2.963 1.336 2.963 2.986v31.459l7.525-7.585c1.156-1.165 3.029-1.165 4.193 0C67.13 29.136 67.13 31.033 65.975 32.197z"/>\n' +
    '				<path id="box" d="M77.392 67.777H25.201c-1.636 0-2.963-1.336-2.963-2.985V47.708c0-1.649 1.327-2.986 2.963-2.986s2.963 1.337 2.963 2.986v14.097h46.264V47.708c0-1.649 1.327-2.986 2.963-2.986 1.637 0 2.963 1.337 2.963 2.986v17.083C80.355 66.441 79.028 67.777 77.392 67.777z"/>\n' +
    '			</svg>\n' +
    '\n' +
    '			<div ng-show="dragState === \'waiting\'" class="inline">\n' +
    '				<h2>{{ "HOME.DRAG_AND_DROP" | translate}}</h2>\n' +
    '				<span>{{ "HOME.OR" | translate}}</span>\n' +
    '			</div>\n' +
    '\n' +
    '			<file ng-show="dragState === \'waiting\'" text="{{ \'HOME.FILES\' | translate}}" multiple="multiple"></file>\n' +
    '\n' +
    '			<div ng-show="dragState === \'dragOver\'">\n' +
    '				<h2>{{ "HOME.WANT_TO_PLAY_IT" | translate}}</h2>\n' +
    '				{{ "HOME.PRESS_BTN" | translate }}\n' +
    '			</div>\n' +
    '		</centered>\n' +
    '	</div>\n' +
    '\n' +
    '	<!-- LIST MOVIES/SERIES -->\n' +
    '	<ul id="list" class="fadeIn" droppable ng-show="view === \'list\'">\n' +
    '		<div class="dropZone"></div>\n' +
    '		<li class="item item-stag-anim" ng-repeat="item in list">\n' +
    '			<div class="itemOver">\n' +
    '				<ul>\n' +
    '					<li title="IMDB Info" ng-show="item.imdbId" ng-click="goToImdb(item.imdbId)">\n' +
    '						<span class="icon-movie"></span>\n' +
    '					</li>\n' +
    '					<li title="Play the video" ng-click="play(item.path)">\n' +
    '						<span class="icon-controller-play"></span>\n' +
    '					</li>\n' +
    '					<li title="Remove from list" ng-click="removeItem(list, $index)">\n' +
    '						<span class="icon-cross2"></span>\n' +
    '					</li>\n' +
    '				</ul>\n' +
    '			</div>\n' +
    '			<div class="poster">\n' +
    '				<img ng-src="{{::item.poster}}" alt="{{::item.imdbId}}"/>\n' +
    '			</div>\n' +
    '			<p ng-if="item.type === \'series\'">{{item.name | cut: limit}} (S{{::item.season}}E{{::item.episode}})</p>\n' +
    '			<p ng-if="item.type === \'movie\'">{{item.name | cut: limit}}</p>\n' +
    '			<span class="status">\n' +
    '				<!-- Status : Loading -->\n' +
    '				<img src="public/img/loading.png" class="loading" ng-class="{\'rotating\': item.status === \'loading\' }" ng-show="item.status === \'loading\'" alt="loading icon"/>\n' +
    '\n' +
    '				<!-- Status : Fail -->\n' +
    '				<span ng-show ="item.status === \'fail\'" class="fail icon-fail"></span>\n' +
    '\n' +
    '				<!-- Status : Done -->\n' +
    '				<span ng-show ="item.status === \'done\'" class="success icon-success"></span>\n' +
    '\n' +
    '			</span>\n' +
    '		</li>\n' +
    '	</ul>\n' +
    '\n' +
    '</div>');
}]);
})();
