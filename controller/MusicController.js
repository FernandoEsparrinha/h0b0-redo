let tracksLoaded = false
let tracksAmount = 18
let tracks = []
let loadIndex = 0

let loopMode = false


function endCallback() {
    if (!loopMode) {
        if (this.isPlaying() && !this.isPaused()) {
            musicController.next()
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
        loadIndex++
        if (loadIndex == tracksAmount) {
            tracksLoaded = true;
        } else {
            loadSound('assets/redo/' + loadIndex + '.mp3', trackLoaded)
        }
    }
}

class MusicController {
    constructor() {
        this.trackPlaying = 0
        fft = new p5.FFT()
        peakDetect = new p5.PeakDetect()
        amplitude = new p5.Amplitude(.99)
        amplitude.setInput()
        loadTracklist()
    }

    startPlaying() {
        if (loopMode) {
            tracks[this.trackPlaying].loop()
        } else {
            tracks[this.trackPlaying].play()
        }
    }

    playTrack(tracknumber, changeLoopMode = false) {
        if (changeLoopMode) {
            if (loopMode) {
                tracks[tracknumber].setLoop(true)
            } else {
                tracks[tracknumber].setLoop(false)
            }
        } else {
            if (loopMode) {
                if (tracknumber == this.trackPlaying) {
                    if (tracks[tracknumber].isPlaying() && tracks[tracknumber].isLooping()) {
                        tracks[tracknumber].pause()
                    } else {
                        tracks[tracknumber].loop()
                        // amplitude.setInput(tracks[tracknumber])
                    }

                } else {
                    tracks[this.trackPlaying].stop()
                    tracks[tracknumber].loop()
                    // amplitude.setInput(tracks[tracknumber])
                    this.trackPlaying = tracknumber
                    polygon.refreshPositions()
                }
            } else {
                if (tracknumber == this.trackPlaying) {
                    if (tracks[tracknumber].isPlaying()) {
                        tracks[tracknumber].pause()
                    } else {
                        tracks[tracknumber].play()
                        // amplitude.setInput(tracks[tracknumber])
                    }
                } else {
                    tracks[this.trackPlaying].pause()
                    tracks[tracknumber].play()
                    // amplitude.setInput(tracks[tracknumber])
                    this.trackPlaying = tracknumber
                    polygon.refreshPositions()
                }
            }
        }
        console.groupEnd()
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
