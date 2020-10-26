let tracksLoaded = false
let tracks = []
let loadIndex = 0

let loopMode = false

let rateMin = 0.11, rateMax = 1.91, rateIncrement = 0.1

function endCallback() {
    if (!loopMode) {
        if (this.isPlaying() && !this.isPaused()) {
            musicController.next()
            guiController.activateDisplay()
        }
    }
}

/**
 * Load all the songs and update loadIndex as loading happens.
 */
function loadTracklist() {
    loadSound('assets/redo/' + loadIndex + '.mp3', trackLoaded);

    function trackLoaded(track) {
        track.onended(endCallback)
        tracks.push(track)
        loadIndex++
        if (loadIndex == numCircles) {
            tracksLoaded = true;
        } else {
            loadSound('assets/redo/' + loadIndex + '.mp3', trackLoaded)
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

                    try {
                        tracks[this.trackPlaying].stop()
                    } catch (error) {
                        console.error(error);
                    }

                    tracks[tracknumber].play()

                    this.trackPlaying = tracknumber
                    polygon.refreshPositions()
                }
            }
        }
        console.groupEnd()
    }

    togglePlay() {
        if (tracks[this.trackPlaying].isPlaying()) {
            tracks[this.trackPlaying].pause()
        } else {
            tracks[this.trackPlaying].play()
        }
    }

    next() {
        if (this.trackPlaying == tracks.length - 1) {
            this.playTrack(0)
        } else {
            this.playTrack(musicController.trackPlaying + 1)
        }
    }

    previous() {
        if (this.trackPlaying == 0) {
            this.playTrack(tracks.length - 1)
        } else {
            this.playTrack(this.trackPlaying - 1)
        }
    }

    increaseSpeed() {
        tracks.forEach(track => {
            let rate = track.rate()
            if (rate < rateMax) {
                track.rate(rate + rateIncrement)
            }
        })
    }

    decreaseSpeed() {
        tracks.forEach(track => {
            let rate = track.rate()
            if (rate > rateMin) {
                track.rate(rate - rateIncrement)
            }
        })
    }

    resetSpeed() {
        tracks.forEach(track => {
            track.rate(1.0)
        })
    }

    getCurrentPlaybackPosition() {
        if (open) {
            let time
            if (tracks[this.trackPlaying].isPaused()) {
                time = tracks[this.trackPlaying].pauseTime
            } else {
                time = tracks[this.trackPlaying].currentTime()
            }

            let minutes = Math.floor(time / 60)
            let seconds = Math.floor(time % 60)
            let duration = tracks[this.trackPlaying].duration()
            let minutesMusic = Math.floor(duration / 60)
            let secondsMusic = Math.floor(duration % 60)
            let strTime = minutes + ":" + (seconds < 10 ? "0" : "") + seconds
                        + " / "
                        + minutesMusic + ":" + (secondsMusic < 10 ? "0" : "") + secondsMusic
            return strTime
        } else {
            return 0
        }
    }

    getCurrentPlaybackSpeed() {
        if (open) {
            return tracks[this.trackPlaying].rate()
        } else {
            return 0
        }
    }

    getTrackNumberPlaying() {
        return this.trackPlaying
    }
}