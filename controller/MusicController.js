let tracksLoaded = false
let trackAmount = 18
let tracks = []
let loadIndex = 0

/**
 * Carrega todas as musicas do album, atualizando o loadIndex conforme vai carregando
 */
function loadTracklist() {
    loadSound('assets/redo/' + loadIndex + '.mp3', trackLoaded);

    function trackLoaded(track) {
        tracks.push(track);
        loadIndex++;
        if (loadIndex == trackAmount) {
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
        tracks[this.trackPlaying].stop()
        tracks[tracknumber].loop()
        this.trackPlaying = tracknumber
        polygon.refreshPositions()
    }

    next() {
        if (this.trackPlaying == 17) {
            this.playTrack(0)
        } else {
            this.playTrack(this.trackPlaying + 1)
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
