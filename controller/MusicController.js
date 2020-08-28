let tracksLoaded = false
let tracksAmount = 18
let tracks = []
let loadIndex = 0

let loopMode = false

let rateMin = 0.11, rateMax = 1.91, rateIncrement = 0.1

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
        this.trackList = [
            "every_end",
            "simply_live",
            "retrogade_in_bloom",
            "If I could try and just show you",
            "mt. parador",
            "oh I should just try",
            "what_do_you_say_?",
            "be_until_you_are",
            "dissatisfaction",
            "another_missed_call",
            "sea_in_me",
            "egyptian_night",
            "OH YES",
            "take off all your clothes",
            "what_do_you_say_",
            "once_again",
            "another_chance",
            "if_sorry_misbehave",
        ]

        this.trackPlaying = 0
        fft = new p5.FFT()
        peakDetect = new p5.PeakDetect()
        amplitude = new p5.Amplitude()
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

    getCurrentPlaybackPosition() {
        if (open) {
            return tracks[this.trackPlaying].currentTime()
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

    getCurrentTrackName() {
        return this.trackList[this.trackPlaying]
    }
}
