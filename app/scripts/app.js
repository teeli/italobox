'user strict';

var app = app || {};

app.nextVideo = function () {
    $('#videoinfo div.title').html('Loading...');
    if (typeof app.player != 'undefined') {
        app.player.nextVideo();
    }
}

app.onVideoPlaying = function() {
    var videoUrl = app.player.getVideoUrl()
        , paramArr = videoUrl.split('?')[1].split('&')
        , params = []
    // parse video params
    for (i in paramArr) {
        var pair = paramArr[i].split('=');
        if (pair.length == 2) {
            params[pair[0]] = pair[1];
        }
    }
    // if video id defined, get video info
    if (typeof params.v != 'undefined') {
        $.getJSON('http://gdata.youtube.com/feeds/api/videos/' + params.v + '?v=2&alt=jsonc', function (data, status, xhr) {
            $('#videoinfo div.title').html(data.data.title);
        });
    }
}

$(document).ready(function () {
    $('a.next').click(function (e) {
        app.nextVideo();
    });
    $(app).on('player:finished', function(e) {
        app.nextVideo();
    })
    $(app).on('player:playing', function(e) {
        app.onVideoPlaying();
    })
});
