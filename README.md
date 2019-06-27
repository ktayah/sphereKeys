# Earth Piano

This project was created by Kevin Tayah using Webpack and a [Three.js starter project](https://github.com/edwinwebb/three-seed).
Earth Piano is a project that displays the instruments of the world with different chord progressions.
Select a chord progression and then select an area on the 3D model of the Earth to play the chord progression in that specific instrument.

## Adding or Changing Areas or Chord Progressions

Visit the config.json file and modify either the countries array or the chord progressions array to add or change any of the countries or progressions. For countries, make sure to enter the longitude and latitude of a country with the instrument of choice to play (instrument must be within MIDI capable instruments, unfortunally a limiation of the MIDI.js library). To add a chord progression add an array of notes as seen in the config.json file, use previous progressions as examples. (See MIDI.js for more examples)

## Install

Before you begin, make sure you are comfortable with terminal commands and have [Node and NPM installed](https://www.npmjs.com/get-npm).

### Install via Download

First download the [zip of the project](https://github.com/ktayah/earthPiano/archive/master.zip) and extract it. Then in terminal at that folder type `npm install` to set things up. To get going run: `npm start`.

### Install with Git

In terminal clone the project into a directory of your choice then delete the git folder to start fresh.

```bash
git clone https://github.com/ktayah/earthPiano.git
npm install
```

## Running the development server

```bash
npm start
```

This command will bundle the project code and start a development server at [http://localhost:8080/](http://localhost:8080/). Visit this in your web browser; every time you make changes to the code the page will refresh. Congratulations, you are good to go!
