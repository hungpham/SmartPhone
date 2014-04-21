angular.module('my-l10n-en', ['l10n']).config(['l10nProvider', function(l10n){
    l10n.add('vi-vn', {
        myPage: {
            myString: 'Chuỗi trong tiếng Việt'
        }
    });
}])