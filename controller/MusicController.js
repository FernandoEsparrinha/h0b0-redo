let tracksLoaded = false
let trackAmount = 18
let tracks = []
let loadIndex = 0

function loadTracklist() {
    loadSound('assets/redo/' + loadIndex + '.mp3', trackLoaded);

    function trackLoaded(track) {
        // console.log(loadIndex);
        // console.log(track);
        tracks.push(track);
        if (loadIndex == 0) {
            tracks[0].loop()
        }
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
        this.trackPlaying = 0;
        loadTracklist()
    }

    playTrack(n) {
        tracks[this.trackPlaying].stop()
        tracks[n].loop()
        this.trackPlaying = n
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

    getTrackNumberPlaying() {
        print(this.trackPlaying)
        return this.trackPlaying
    }
}
