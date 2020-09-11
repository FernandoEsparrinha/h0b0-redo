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

        this.trackPlaying = 0
        fft = new p5.FFT()
        peakDetect = new p5.PeakDetect()
        amplitude = new p5.Amplitude()
        amplitude.setInput()
        loadTracklist()

        this.amp = 0, this.minAmp = 1.1, this.maxAmp = 0
        this.bass = 0, this.minBass = 256, this.maxBass = 0
        this.lowMid, this.minLowMid = 256, this.maxLowMid = 0
        this.mid, this.minMid = 256, this.maxMid = 0
        this.highMid, this.minHighMid = 256, this.maxHighMid = 0
        this.treble, this.minTreble = 256, this.maxTreble = 0
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
                    tracks[this.trackPlaying].stop()
                    tracks[tracknumber].play()

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
            let time = tracks[this.trackPlaying].currentTime()
            let minutes = Math.floor(time / 60)
            let seconds = Math.floor(time % 60)
            let duration = tracks[this.trackPlaying].duration()
            let minutesMusic = Math.floor(duration / 60)
            let secondsMusic = Math.floor(duration % 60)
            let strTime = minutes + ":" + (seconds < 10 ? "0" : "") + seconds + " / " + minutesMusic + ":" + (secondsMusic < 10 ? "0" : "") + secondsMusic
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

    getCurrentTrackName() {
        return trackList[this.trackPlaying]
    }

    logValues() {
        if (open) {
            fft.analyze();

            this.amp        = amplitude.getLevel().toFixed(2)
            this.bass       = fft.getEnergy("bass").toFixed(2)
            this.lowMid     = fft.getEnergy("lowMid").toFixed(2)
            this.mid        = fft.getEnergy("mid").toFixed(2)
            this.highMid    = fft.getEnergy("highMid").toFixed(2)
            this.treble     = fft.getEnergy("treble").toFixed(2)

            // amp
            if (this.amp < this.minAmp && this.amp > 0) {
                this.minAmp = this.amp
            }
            if (this.amp > this.maxAmp) {
                this.maxAmp = this.amp
            }

            // bass
            if (this.bass < this.minBass && this.bass > 0) {
                this.minBass = this.bass
            }
            if (this.bass > this.maxBass) {
                this.maxBass = this.bass
            }

            // lowMid
            if (this.lowMid < this.minLowMid && this.lowMid > 0) {
                this.minLowMid = this.lowMid
            }
            if (this.lowMid > this.maxLowMid) {
                this.maxLowMid = this.lowMid
            }

            // mid
            if (this.mid < this.minMid && this.mid > 0) {
                this.minMid = this.mid
            }
            if (this.mid > this.maxMid) {
                this.maxMid = this.mid
            }

            // highMid
            if (this.highMid < this.minHighMid && this.highMid > 0) {
                this.minHighMid = this.highMid
            }
            if (this.highMid > this.maxHighMid) {
                this.maxHighMid = this.highMid
            }

            // treble
            if (this.treble < this.minTreble && this.treble > 0) {
                this.minTreble = this.treble
            }
            if (this.treble > this.maxTreble) {
                this.maxTreble = this.treble
            }

            fill('pink')
            textAlign(LEFT)
            text("Amplitude: " + this.amp + ' / ' + this.minAmp + ' / ' + this.maxAmp, 20, 20)
            text("Energy (bass): " + this.bass + ' / ' + this.minBass + ' / ' + this.maxBass, 20, 60)
            text("Energy (lowMid): " + this.lowMid + ' / ' + this.minLowMid + ' / ' + this.maxLowMid, 20, 100)
            text("Energy (mid): " + this.mid + ' / ' + this.minMid + ' / ' + this.maxMid, 20, 140)
            text("Energy (highMid): " + this.highMid + ' / ' + this.minHighMid + ' / ' + this.maxHighMid, 20, 180)
            text("Energy (treble): " + this.treble + ' / ' + this.minTreble + ' / ' + this.maxTreble, 20, 220)
        }
    }
}
