import Soundfont from 'soundfont-player';

export default class Player {
    constructor(instrument = 'acoustic_grand_piano') {
        this.instrument = instrument;
    }

    setInstrument(instrument) {
        this.instrument = instrument;
    }

    /**
     * Plays a chord progression based on passed notes
     * @param {Array} note Takes in an array of notes in string form to play
     */
    play(notes) {
        Soundfont.instrument(new AudioContext(), this.instrument).then((piano) => {
            for (let note in notes) {
                piano.play(note);
            }
        });
    }
}