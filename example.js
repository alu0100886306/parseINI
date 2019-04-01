var parseINI = require('./parseINI.js');

console.log(parseINI(`
    name=Torres Quevedo
    [address]
    invention=The chess player
    [Maps]
    place=ess
    hola=        mundo`));

//{"name":"Torres Quevedo","address":{"invention":"The chess player"},"Maps":{"place":"ess","hola":"mundo"}}
