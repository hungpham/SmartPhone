angular.module('my-l10n-en', ['l10n']).config(['l10nProvider', function(l10n){
    l10n.add('en-us', {
        myPage: {
            myString: 'This is my string in English'
        }
    });
}])