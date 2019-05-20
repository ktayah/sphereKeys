import midiPlayer from 'midi-player-js'

export default class Player {
    constructor(...args) {
        super(...args);

        this.Player = new midiPlayer.Player(function(event) {
            console.log(event);
        });
    }

    play(soundFile) {
        this.Player.loadFile(`./${soundFile}.midi`);
        this.Player.play();
    }
}