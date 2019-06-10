import Soundfont from 'soundfont-player';

export default class Player {
    constructor(instrument = 'acoustic_grand_piano') {
        this.instrument = instrument;
        this.ac = new AudioContext();
    }

    setInstrument(instrument) {
        this.instrument = instrument;
    }

    /**
     * Plays a note
     * @param {String} note Takes in note in string form to play ex. A4, C5
     */
    play(note) {
        Soundfont.instrument(this.ac, this.instrument).then((instrument) => {
                instrument.start(note);
        });
    }
    /**
     * Plays a chord progression
     * @param {Array} notes 
     */
    playProgression(notes) {
        notes.forEach(note => {
            this.play(note);
        });
    }
}