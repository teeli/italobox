'use strict';

var app = app || {};

/**
 * Init application
 */
app.init = function() {
    app.youtube.init();
    $(app.youtube).on('player:finished', function (e) {
        app.nextVideo();
    });
    $(app.youtube).on('player:playing', function (e) {
        app.onVideoPlaying();
    });
}

/**
 * Play next video
 */
app.nextVideo = function () {
    app.setVideoInfo('Loading...');
    if (typeof app.player != 'undefined') {
        app.player.nextVideo();
    }
}

/**
 * Update status & video info
 */
app.onVideoPlaying = function () {
    var videoUrl = app.player.getVideoUrl()
        , paramArr = videoUrl.split('?')[1].split('&')
        , params = [];
    // parse video params
    for (var i in paramArr) {
        var pair = paramArr[i].split('=');
        if (pair.length == 2) {
            params[pair[0]] = pair[1];
        }
    }
    // if video id defined, get video info
    if (typeof params.v != 'undefined') {
        $.getJSON('http://gdata.youtube.com/feeds/api/videos/' + params.v + '?v=2&alt=jsonc', function (data, status, xhr) {
            app.setVideoInfo(data.data.title);
        });
    }
    $('#ytcontainer').show();
}

/**
 * Set video info
 * @param title Title of the video
 */
app.setVideoInfo = function(title) {
    $('#videoinfo div.title').html(title);
    document.title = "\u2665 DISCO \u2665 " + title + " \u2665";
}


