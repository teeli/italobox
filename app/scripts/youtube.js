var app = app || {}

var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

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
            'onReady':       onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {
    event.target.loadPlaylist({
        listType:         'playlist',
        list:             'PLZkC7dLwSHbOTPEfjs09LtvKcnIX9LX-P',
        index:            1,
        startSeconds:     0,
        suggestedQuality: 'hd720'
    });
    event.target.setShuffle(true);
    event.target.playVideo();
    $(document).trigger('player:ready');
}

function onPlayerStateChange(event) {
    console.log('state change', event);
    if (event.data == YT.PlayerState.ENDED) {
        $(app).trigger('player:finished');
    }
    if (event.data == YT.PlayerState.PLAYING) {
        $(app).trigger('player:playing');
    }
}