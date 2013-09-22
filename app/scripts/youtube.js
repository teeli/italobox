'use strict';

var app = app || {}

app.youtube = app.youtube || {};

/**
 * Init Youtube iFrame API
 */
app.youtube.init = function () {
    var tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

/**
 * Load playlist & play after player is loaded
 * @param event
 */
app.youtube.onPlayerReady = function (event) {
    event.target.loadPlaylist({
        listType:         'playlist',
        list:             'PLZkC7dLwSHbOTPEfjs09LtvKcnIX9LX-P',
        index:            1,
        startSeconds:     0,
        suggestedQuality: 'hd720'
    });
    event.target.setShuffle(true);
    event.target.playVideo();
    $(app.youtube).trigger('player:ready');
}

/**
 * Handle state change & delegate events
 * @param event
 */
app.youtube.onPlayerStateChange = function (event) {
    console.log('state change', event);
    if (event.data == YT.PlayerState.ENDED) {
        $(app.youtube).trigger('player:finished');
    }
    if (event.data == YT.PlayerState.PLAYING) {
        $(app.youtube).trigger('player:playing');
    }
}

/**
 * Called when Youtube iFrame API has been loaded
 */
function onYouTubeIframeAPIReady() {
    app.player = new YT.Player('ytplayer', {
        height:     '100%',
        width:      '100%',
        playerVars: {
            controls:       0,
            enablejsapi:    1,
            disablekb:      1,
            modestbranding: 1,
            showinfo:       0,
            iv_load_policy: 3,
            autoplay:       1,
            origin:         'aciddose.org',
            rel:            0,
            loop:           1,
            wmode:          'transparent'
        },
        events:     {
            'onReady':       app.youtube.onPlayerReady,
            'onStateChange': app.youtube.onPlayerStateChange
        }
    });
}

