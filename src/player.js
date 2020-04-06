
const BASE = '../audioplayer/';

const player = {
    isPlaying: false,
    media: null,
    handlerBtn: null,
    handlerBtnImg: null,
    track: null,
    trackHandler: null,
    frameID: null,
    getSkin: function (skinId) {
        const wrapper = document.getElementById(skinId),
        a = document.createElement('a'),
        img = document.createElement('img'),
        track = document.createElement('div'),
        trackHandler = document.createElement('div'),
        stylesUrl = document.createElement('link');

        img.src = BASE + (player.isPlaying ? 'skins/images/pause.png' : 'skins/images/play.png');
        player.handlerBtnImg = img;

        a.href = '#';
        a.classList.add('player-btn');
        a.onclick = function(e) {
            e.preventDefault();
            player.play();
        }
        a.appendChild(img);
        player.handlerBtn = a;
        wrapper.appendChild(a);


        trackHandler.classList.add('player-track-handler');
        player.trackHandler = trackHandler;

        track.classList.add('player-track');
        track.appendChild(trackHandler);
        player.track = track;

        wrapper.appendChild(track);
        wrapper.classList.add('player-skin');

        stylesUrl.rel = 'stylesheet';
        stylesUrl.href = BASE + 'skins/css/player.css';
        document.body.appendChild(stylesUrl);
    },
    play:  function() {
        if (!player.media) {
            player.media = new Audio(`${BASE}media/1.mp3`);
        }
        
        if (!player.isPlaying) { 
            player.media.play();
            player.isPlaying = true;
            player.frameID = requestAnimationFrame(player.updateSkin);
            player.media.onended = function() {
                cancelAnimationFrame(player.frameID);
                player.isPlaying = false;
            }
        } else {
            player.media.pause();
            player.isPlaying = false;
            cancelAnimationFrame(player.frameID);
        }
        player.updateSkin();
    },
    updateSkin: function() {
        player.handlerBtnImg.src = BASE + (player.isPlaying ? 'skins/images/pause.png' : 'skins/images/play.png');
        const trackWidth = player.track.offsetWidth;
        const duration = player.media.duration;
        const currentPos = (trackWidth / duration) * player.media.currentTime;
        player.trackHandler.style.left = currentPos + 'px';
        player.frameID = requestAnimationFrame(player.updateSkin);
    }
}


function init(skinId) {
    player.getSkin(skinId);
}


const canvas = init('player');
