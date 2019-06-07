import Soundfont from 'soundfont-player';

export default class Player {
    constructor(instrument = 'acoustic_grand_piano') {
        this.instrument = instrument;
    }

    /**
     * Plays a chord progression based on passed notes
     * @param {Array} note Takes in a note which to play
     */
    play(note) {
        Soundfont.instrument(new AudioContext(), this.instrument).then(function(piano) {
            piano.play(note);
        });
    }
}