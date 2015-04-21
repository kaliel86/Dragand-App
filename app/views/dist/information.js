(function(module) {
try {
  module = angular.module('daw');
} catch (e) {
  module = angular.module('daw', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('views/information.html',
    '<div id="middle-container">\n' +
    '    <div id="information" class="fadeInUp">\n' +
    '        <!-- PROJECT -->\n' +
    '        <h1>{{ "INFORMATION.THE_PROJECT" | translate }}</h1>\n' +
    '        <p>{{ "INFORMATION.THE_PROJECT_CONTENT" | translate }}</p>\n' +
    '\n' +
    '        <!-- TEAM -->\n' +
    '        <h1>{{ "INFORMATION.TEAM" | translate }}</h1>\n' +
    '        <div class="team">\n' +
    '            <h1>Mathieu Le Tyrant</h1><span class="role">{{ "INFORMATION.DEVELOPER" | translate }}</span>\n' +
    '            <div class="links">\n' +
    '                <span class="website" open>mathieuletyrant.com</span>\n' +
    '                <span class="twitter" open>@MathLTY</span>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        <div class="team">\n' +
    '            <h1>Patrick Heng</h1><span class="role">{{ "INFORMATION.DEVELOPER" | translate }}</span>\n' +
    '            <div class="links">\n' +
    '                <span class="website" open>hengpatrick.fr</span>\n' +
    '                <span class="twitter" open>@Pat_Hg</span>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        <div class="team">\n' +
    '            <h1>Robin Mastromarino</h1><span class="role">{{ "INFORMATION.DESIGNER" | translate }}</span>\n' +
    '            <div class="links">\n' +
    '                <span class="website" open>robinmastromarino.com</span>\n' +
    '                <span class="twitter" open>@cherwoood</span>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '\n' +
    '        <!-- CREDITS --> \n' +
    '        <h1>{{ "INFORMATION.CREDITS" | translate }}</h1>\n' +
    '        <div class="credits">\n' +
    '            <span open>OpenSubtitles.org</span>\n' +
    '            <span open>YifySubtitles.com</span>\n' +
    '            <span open>Thesubdb.com</span>\n' +
    '            <span open>TheTvDb.com</span>\n' +
    '            <span open>Tv-Subs.com</span>\n' +
    '            <span open>Imdb.com</span>\n' +
    '            <span open>Guessit.readthedocs.org</span>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</div>');
}]);
})();
