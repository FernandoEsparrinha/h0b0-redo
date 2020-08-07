let tracksLoaded = false
let tracksAmount = 18
let tracks = []
let loadIndex = 0

let loopMode = false

function endCallback() {
    if (!loopMode) {
        if (this.isPlaying()) {
            musicController.next()
        } else {
            //print("Music is paused or stopped. Callback ignored.")
        }
    } else {
        //Loop mode was activated mid song so we must put the song on at the end callback
        if (!this.isLooping()) {
            this.loop()
        }
    }
}

/**
 * Carrega todas as musicas do album, atualizando o loadIndex conforme vai carregando
 */
function loadTracklist() {
    loadSound('assets/redo/' + loadIndex + '.mp3', trackLoaded);

    function trackLoaded(track) {
        track.onended(endCallback)
        tracks.push(track)
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
            tracks[this.trackPlaying].play()
        }
    }

    playTrack(tracknumber) {
        if (loopMode) {
            if (tracknumber == this.trackPlaying) {
                if (tracks[tracknumber].isPlaying()) {
                    tracks[tracknumber].pause()
                } else {
                    tracks[tracknumber].loop()
                }
            } else {
                tracks[this.trackPlaying].stop()
                tracks[tracknumber].loop()
                this.trackPlaying = tracknumber
                polygon.refreshPositions()
            }
        } else {
            if (tracknumber == this.trackPlaying) {
                if (tracks[tracknumber].isPlaying()) {
                    tracks[tracknumber].pause()
                } else {
                    tracks[tracknumber].play()
                }
            } else {
                tracks[this.trackPlaying].pause()
                tracks[tracknumber].play()
                this.trackPlaying = tracknumber
                polygon.refreshPositions()
            }
        }
    }

    next() {
        if (this.trackPlaying == 17) {
            this.playTrack(0)
        } else {
            this.playTrack(musicController.trackPlaying + 1)
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
