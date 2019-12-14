const midi = require('midi');

// Set up a new output
const deviceName	= 'PVP Control';
const output = new midi.output();

/**
 * All commands and their offset to control ProVideoPlayer
 * @type {{ClearAll: number, SelectLook: number, Pause: number, DisableMask: number, PreviousCue: number, EnableMask: number, ClearLayer: number, PreviousPlaylist: number, TriggerCue: number, NextPlaylist: number, Rewind: number, PlayPause: number, GoToEnd: number, NextCue: number, GoToBeginning: number, Play: number, ClearTextStream: number, DisableEffect: number, FastForward: number, SelectLayer: number, EnableEffect: number, SelectPlaylist: number}}
 */
const Command = {
    ClearAll: 0,
    ClearLayer: 1,
    ClearTextStream: 2,
    GoToBeginning: 3,
    Rewind: 4,
    Play: 5,
    Pause: 6,
    PlayPause: 7,
    FastForward: 8,
    GoToEnd: 9,
    PreviousPlaylist: 10,
    NextPlaylist: 11,
    PreviousCue: 12,
    NextCue: 13,
    SelectPlaylist: 14,
    TriggerCue: 15,
    SelectLayer: 16,
    SelectLook: 17,
    EnableMask: 18,
    DisableMask: 19,
    EnableEffect: 20,
    DisableEffect: 21
};

/**
 * Offset set in ProVideoPlayer
 * @type {number}
 */
let commandOffset = 0;

/**
 *
 * @param {number} offset
 */
function setNoteOffset(offset)
{
    commandOffset = setNoteOffset;
}

/**
 * Execute a PVP Command
 * @param {number} command
 * @param {number} arg1
 */
function executeCommand(command, arg1)
{
    sendNote(true, 1, commandOffset + command, arg1);
}

/**
 * Send a MIDI note
 * @param {boolean} noteOn
 * @param {number} channel
 * @param {number} note
 * @param {number} velocity
 */
function sendNote(noteOn, channel, note, velocity)
{
    if(velocity === undefined)
        velocity = 1;

    let a = 127 + (noteOn ? 16 : 0) + channel;
    let b = note;
    let c = velocity;
    let message = [a, b, c];

    console.log(message);
    output.sendMessage(message);
}

/**
 * Clear all layers
 */
function clearAll()
{
    executeCommand(Command.ClearAll);
}

/**
 * Clear selected layers
 */
function clearLayer()
{
    executeCommand(Command.ClearLayer);
}

/**
 * Clear Text Stream (when available)
 */
function clearTextStream()
{
    executeCommand(Command.ClearTextStream);
}

/**
 *
 */
function videoGoToBeginning()
{
    executeCommand(Command.GoToBeginning);
}

/**
 * Rewind the current video
 */
function videoRewind()
{
    executeCommand(Command.Rewind);
}

/**
 * Play the current video
 */
function videoPlay()
{
    executeCommand(Command.Play);
}

/**
 * Pause the current video
 */
function videoPause()
{
    executeCommand(Command.Pause);
}

/**
 * Play/pause the current video
 */
function videoPlayPause()
{
    executeCommand(Command.PlayPause);
}

/**
 * Fast forward the current video
 */
function videoFastForward()
{
    executeCommand(Command.FastForward);
}

/**
 * Got to the end of the current video
 */
function videoGoToEnd()
{
    executeCommand(Command.GoToEnd);
}

/**
 * Open the previous playlist
 */
function previousPlaylist()
{
    executeCommand(Command.PreviousPlaylist);
}

/**
 * Open the next playlist
 */
function nextPlaylist()
{
    executeCommand(Command.NextPlaylist);
}

/**
 * Trigger the next cue
 */
function nextCue()
{
    executeCommand(Command.NextCue);
}

/**
 * Trigger the previous cue
 */
function previousCue()
{
    executeCommand(Command.PreviousCue);
}

/**
 * Select a specific playlist
 * @param {number} playlistIndex
 */
function selectPlaylist(playlistIndex)
{
    executeCommand(Command.SelectPlaylist, playlistIndex);
}

/**
 * Trigger a specific cue in the current playlist
 * @param {number} cueIndex
 */
function triggerCue(cueIndex)
{
    if(cueIndex <= 0)
        return;

    executeCommand(Command.TriggerCue, cueIndex);
}

/**
 * Select a specific layer
 * @param {number} layerIndex
 */
function selectLayer(layerIndex)
{
    executeCommand(Command.SelectLayer, layerIndex);
}

/**
 * Select a specific look
 * @param {number} lookIndex
 */
function selectLook(lookIndex)
{
    executeCommand(Command.SelectLook, lookIndex);
}

/**
 * Enable a specific mask
 * @param {number} maskIndex
 */
function enableMask(maskIndex)
{
    executeCommand(Command.EnableMask, maskIndex);
}

/**
 * Disable a specific mask
 * @param {number} maskIndex
 */
function disableMask(maskIndex)
{
    executeCommand(Command.DisableMask, maskIndex);
}

/**
 * Enable a specific effect
 * @param {number} effectIndex
 */
function enableEffect(effectIndex)
{
    executeCommand(Command.EnableEffect, effectIndex);
}

/**
 *
 * @param {number} effectIndex
 */
function disableEffect(effectIndex)
{
    executeCommand(Command.DisableEffect, effectIndex);
}

/**
 * Open connection for ProVideoPlayer to connect to
 */
function open()
{
    output.openVirtualPort(deviceName);
}

/**
 * Close connection to ProVideoPlayer
 */
function close()
{
    // Close the port when done.
    output.closePort();
}


// Configuration
exports.open = open;
exports.close = close;
exports.setNoteOffset = setNoteOffset;

// Clears
exports.clearAll = clearAll;
exports.clearLayer = clearLayer;
exports.clearTextStream = clearTextStream;

// Video control
exports.videoGoToBeginning = videoGoToBeginning;
exports.videoRewind = videoRewind;
exports.videoPlay = videoPlay;
exports.videoPause = videoPause;
exports.videoPlayPause = videoPlayPause;
exports.videoFastForward = videoFastForward;
exports.videoGoToEnd = videoGoToEnd;

// Playlist control
exports.nextPlaylist = nextPlaylist;
exports.previousPlaylist = previousPlaylist;

// Cue control
exports.nextCue = nextCue;
exports.previousCue = previousCue;

// Indexes
exports.selectPlaylist = selectPlaylist;
exports.triggerCue = triggerCue;
exports.selectLayer = selectLayer;
exports.selectLook = selectLook;
exports.enableMask = enableMask;
exports.disableMask = disableMask;
exports.enableEffect = enableEffect;
exports.disableEffect = disableEffect;