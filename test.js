const pvpControl = require('./');

pvpControl.open();

let index = 0;
setInterval(function(){
    pvpControl.triggerCue((index ++ % 12) + 1);
}, 3000);
