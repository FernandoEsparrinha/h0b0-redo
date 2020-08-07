let tracksLoaded = false
let tracksAmount = 18
let tracks = []
let loadIndex = 0

let loopMode = false

function endCallback() {
    if (tracks[musicController.trackPlaying].isPlaying()) {
        musicController.next()
    }
}

/**
 * Carrega todas as musicas do album, atualizando o loadIndex conforme vai carregando
 */
function loadTracklist() {
    loadSound('assets/redo/' + loadIndex + '.mp3', trackLoaded);

    function trackLoaded(track) {
        tracks.push(track);
        loadIndex++;
        if (loadIndex == tracksAmount) {
            tracksLoaded = true;
        } else {
            loadSound('assets/redo/' + loadIndex + '.mp3', trackLoaded);
        }
    }
}

class MusicController {
    constructor() {
        this.trackPlaying = 0
        loadTracklist()
    }

    startPlaying() {
        if (loopMode) {
            tracks[this.trackPlaying].loop()
        } else {
            tracks[this.trackPlaying].onended(endCallback)
            tracks[this.trackPlaying].play()
        }
    }

    playTrack(tracknumber) {
        if (tracknumber == this.trackPlaying) {
            if (tracks[tracknumber].isPlaying()) {
                tracks[tracknumber].pause()
            } else {
                tracks[tracknumber].play()
            }
        } else {
            if (loopMode) {
                tracks[this.trackPlaying].stop()
                tracks[tracknumber].loop()
            } else {
                // tracks[this.trackPlaying].pause()
                tracks[tracknumber].onended(endCallback)
                tracks[tracknumber].play()
            }
            this.trackPlaying = tracknumber
            polygon.refreshPositions()
        }
    }

    next() {
        if (musicController.trackPlaying == 17) {
            musicController.playTrack(0)
        } else {
            musicController.playTrack(musicController.trackPlaying + 1)
        }
    }

    previous() {
        if (this.trackPlaying == 0) {
            this.playTrack(17)
        } else {
            this.playTrack(this.trackPlaying - 1)
        }
    }

    getTrackNumberPlaying() {
        return this.trackPlaying
    }
}
