'use strict';

var app = app || {};

$(document).ready(function () {
    // init click handlers when document ready
    $('a.next').click(function (e) {
        e.preventDefault();
        app.nextVideo();
    });
    $('a.share.fb').click(function (e) {
        e.preventDefault();
        FB.ui({
            method:      'feed',
            link:        'http://aciddose.org/discorobot/',
            name:        '&hearts; DISCO &hearts;',
            picture:     'http://aciddose.org/discorobot/images/italo.png',
            caption:     'Discorobot',
            description: 'Discorobot: Non-stop italo/synth disco goodness'
        });
    });
    $('a.share.twitter').click(function (e) {
        e.preventDefault();
        e.preventDefault();
        var url = 'http://twitter.com/share?' +
            'url=' + escape('http://aciddose.org/discorobot/') +
            '&text=Discorobot: Non-stop disco';
        window.open(url, 'twitter', 'width=700,height=360,location=0,status=0');
    });
    $('a.share.gplus').click(function (e) {
        e.preventDefault();
        var url = 'https://plus.google.com/share?' +
            'url=' + escape('http://aciddose.org/discorobot/');
        window.open(url, 'gplus', 'width=500,height=460,location=0,status=0');
    });
    $('#authorinfo a.toggle').click(function (e) {
        e.preventDefault();
        app.toggleInfo();
    });

    // init app
    app.init();
});
