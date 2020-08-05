let tracksLoaded = false
let tracksAmount = 18
let tracks = []
let loadIndex = 0

let loopMode = true

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

    playTrack(tracknumber) {
        if (loopMode) {
            tracks[this.trackPlaying].stop()
            tracks[tracknumber].loop()
        } else {
            tracks[tracknumber].onended(musicController.next)
            tracks[tracknumber].play()
        }
        this.trackPlaying = tracknumber
        polygon.refreshPositions()
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

    play() {
        if (tracks[this.trackPlaying].isPlaying()) {
            tracks[this.trackPlaying].pause()
        } else {
            tracks[this.trackPlaying].play()
        }
    }

    getTrackNumberPlaying() {
        return this.trackPlaying
    }
}
