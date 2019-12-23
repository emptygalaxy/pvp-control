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
    DisableEffect: 21,

    VignetteRadius: 22,
    ColorAdjustmentHue: 23,
    ColorAdjustmentSaturation: 24,
    ColorAdjustmentContrast: 25,
    ColorAdjustmentBrightness: 26,
    BlurType: 27,
    BlurArea: 28,
    BlurRadius: 29,
    ColorEffectsMode: 30,
    ColorEffectsRed: 31,
    ColorEffectsGreen: 32,
    ColorEffectsBlue: 33,
    RGBAdjustRed: 34,
    RGBAdjustGreen: 35,
    RGBAdjustBlue: 36,
    DepthOfFieldX: 37,
    DepthOfFieldY: 38,
    DepthOfFieldRadius: 39,
    OldFilmSepia: 40,
    OldFilmNoise: 41,
    OldFilmScratch: 42,
    OldFilmVignette: 43,
    KaleidoscopeType: 44,
    KaleidoscopeSpeed: 45,
    ColorPosterizeGamma: 46,
    ColorPosterizeNumberOfColors: 47,
    StarsSpeed: 48,
    HalftoneSharpness: 49,
    HalftoneGrayComponents: 50,
    HalftoneColorRemoval: 51,
    RippleSpeed: 52,
    RippleType: 53,
    DistortionType: 54,
    PicassoAnimate: 55,
    VariableFPS: 56,
    TileColumns: 57,
    TileRows: 58,
    TileGridSize: 59,
    PlayRate: 60,
    EdgeMode: 61,
    ToonMode: 62,
    ChromaticsMode: 63,
    ColorWaveSpeed: 64,
    ColorWaveType: 65,
};

const Effect = {
    VignetteRadius: 1,
    ColorAdjustment: 2,
    Blur: 3,
    ColorEffects: 4,
    RGBAdjust: 5,
    DepthOfField: 6,
    OldFilm: 7,
    Kaleidoscope: 8,
    ColorPosterize: 9,
    Stars: 10,
    Halftone: 11,
    Ripple: 12,
    Distortion: 13,
    Picasso: 14,
    VariableFPS: 15,
    Tile: 16,
    PlayRate: 17,
    Edge: 18,
    Toon: 19,
    Chromatics: 20,
    ColorWave: 21,
};

/**
 * Offset set in ProVideoPlayer
 * @type {number}
 */
let commandOffset = 0;

/**
 * Highest value that can be passed
 * @type {number}
 */
const maxValue = 127;

/**
 * Set the offset note number to be used in sending midi notes
 * @param {number} offset
 */
function setNoteOffset(offset)
{
    commandOffset = offset;
}

/**
 * Execute a PVP Command
 * @param {number} command
 * @param {number} arg1
 */
function executeCommand(command, arg1 = 1)
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
    if(Object.values(Effect).indexOf(effectIndex) === -1)
        throw new Error('effectIndex is invalid');

    executeCommand(Command.EnableEffect, effectIndex);
}

/**
 *
 * @param {number} effectIndex can be referenced from effects constant
 */
function disableEffect(effectIndex)
{
    if(Object.values(Effect).indexOf(effectIndex) === -1)
        throw new Error('effectIndex is invalid');

    executeCommand(Command.DisableEffect, effectIndex);
}


/**
 *
 * @param {number} vignetteRadius
 */
function setVignetteRadius(vignetteRadius)
{
    if(vignetteRadius < 0)
        vignetteRadius = 0;

    executeCommand(Command.VignetteRadius, (vignetteRadius * maxValue) + 1);
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

// Clear Commands
exports.clearAll = clearAll;
exports.clearLayer = clearLayer;
exports.clearTextStream = clearTextStream;

// Video Control
exports.videoGoToBeginning = videoGoToBeginning;
exports.videoRewind = videoRewind;
exports.videoPlay = videoPlay;
exports.videoPause = videoPause;
exports.videoPlayPause = videoPlayPause;
exports.videoFastForward = videoFastForward;
exports.videoGoToEnd = videoGoToEnd;

// Presentation Actions
exports.nextPlaylist = nextPlaylist;
exports.previousPlaylist = previousPlaylist;
exports.nextCue = nextCue;
exports.previousCue = previousCue;

// Select by Index
exports.selectPlaylist = selectPlaylist;
exports.triggerCue = triggerCue;
exports.selectLayer = selectLayer;
exports.selectLook = selectLook;
exports.enableMask = enableMask;
exports.disableMask = disableMask;
exports.enableEffect = enableEffect;
exports.disableEffect = disableEffect;

// Effects
exports.effect = Effect;
exports.executeCommand = executeCommand;
exports.setVignetteRadius = setVignetteRadius;