// Load required packages
var mongoose = require('mongoose');

//this is the game schema to save and load games
var gameSchema   = new mongoose.Schema({
    grid: Object, //grid of the game
    status: Number, // 0: Game Not started, 1: Game in Progress, 2: Game Won, 3: Game Lost
    seconds: Number, // time elapsed
    created: Number //miliseconds from 1970 that identifies the game to save & load
});

// Export the Mongoose model
module.exports = mongoose.model('Game', gameSchema);